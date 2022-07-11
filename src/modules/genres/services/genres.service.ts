import {Entity, IBand, IConfig, IDeleted, IGenre, Method} from '../../../interfaces';
import { getEndpoint, sendRequest } from '../../../utils';
import path from 'path';
import {getBandById} from "../../bands/services/bands.service";

const genresEndpoint = getEndpoint(Entity.GENRES);

export const getAllGenres = async (limit: number, offset: number): Promise<IGenre[]> => {
  const body = { limit, offset };
  console.log('genresEndpoint', genresEndpoint);
  try {
    const data = await sendRequest(genresEndpoint, Method.GET, body) as string;
    console.log('GENRES', data);
    return JSON.parse(data).items.map((item:any) => ({...item, id: item._id}));
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const getGenreById = async (id: string): Promise<IGenre | null> => {
  try {
    const data = await sendRequest(path.join(genresEndpoint, id), Method.GET) as string;
    const genre = JSON.parse(data);
    return { ...genre, id: genre._id };
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const createNewGenre = async (name:string, description:string, country:string, year:string, context:IConfig) => {
  const body = { name, description, country, year };
  try {
    const data = await sendRequest(genresEndpoint, Method.POST, body, context) as string;
    const result = JSON.parse(data);
    return { ...result, id: result._id };
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const updateExistedGenre = async (
  id: string,
  name:string,
  description:string,
  country:string,
  year: string,
  context: IConfig
) => {
  const body = { name, description, country, year };
  try {
    const data = await sendRequest(path.join(genresEndpoint, id), Method.PUT, body, context) as string;
    const result = JSON.parse(data);
    return { ...result, id: result._id };
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const removeGenre = async (id: string, context:IConfig): Promise<IDeleted | null> => {
  try {
    const data = await sendRequest(path.join(genresEndpoint, `${id}`), Method.DELETE, null, context) as string;
    return JSON.parse(data);
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getGenresByIds = async (ids: string[]):Promise<(IGenre | null)[] | []> => {
  const responses = await Promise.all(
      ids.map((id: string) => getGenreById(id))
  );
  console.log(responses);
  if (!responses) return [];
  return responses;
}