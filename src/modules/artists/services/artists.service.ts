import { Entity, IConfig, IDeleted, IGenre, Method } from '../../../interfaces';
import { getEndpoint, sendRequest } from '../../../utils';
import path from 'path';

const artistsEndpoint = getEndpoint(Entity.ARTISTS);

export const getAllArtists = async (limit: number, offset: number): Promise<IGenre[]> => {
  const body = { limit, offset };
  try {
    const data = await sendRequest(artistsEndpoint, Method.GET, body) as string;
    console.log('ArtistS', data);
    return JSON.parse(data).items.map((item:any) => ({...item, id: item._id}));
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const getArtistById = async (id: string): Promise<IGenre | null> => {
  try {
    const data = await sendRequest(path.join(artistsEndpoint, id), Method.GET) as string;
    const Artist = JSON.parse(data);
    return { ...Artist, id: Artist._id };
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const createNewArtist = async (
  firstName:string,
  secondName:string,
  middleName:string,
  birthDate:string,
  birthPlace:string,
  country:string,
  bands:string[],
  instruments:string[],
  context:IConfig
) => {
  const body = {
    firstName,
    secondName,
    middleName,
    birthDate,
    birthPlace,
    country,
    bands,
    instruments
  };
  try {
    const data = await sendRequest(artistsEndpoint, Method.POST, body, context) as string;
    const result = JSON.parse(data);
    return { ...result, id: result._id };
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const updateExistedArtist = async (
  id:string,
  firstName:string,
  secondName:string,
  middleName:string,
  birthDate:string,
  birthPlace:string,
  country:string,
  bands:string[],
  instruments:string[],
  context:IConfig
) => {
  const body = {
    firstName,
    secondName,
    middleName,
    birthDate,
    birthPlace,
    country,
    bands,
    instruments
  };
  try {
    const data = await sendRequest(path.join(artistsEndpoint, id), Method.PUT, body, context) as string;
    const result = JSON.parse(data);
    return { ...result, id: result._id };
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const removeArtist = async (id: string, context:IConfig): Promise<IDeleted | null> => {
  try {
    const data = await sendRequest(path.join(artistsEndpoint, `${id}`), Method.DELETE, null, context) as string;
    return JSON.parse(data);
  } catch (error) {
    console.error(error);
    return null;
  }
};
