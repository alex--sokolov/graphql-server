import {Entity, IArtist, IBand, IConfig, IDeleted, Method} from '../../../interfaces';
import { getEndpoint, sendRequest } from '../../../utils';
import path from 'path';
import {getBandById} from "../../bands/services/bands.service";

const artistsEndpoint = getEndpoint(Entity.ARTISTS);

export const getAllArtists = async (limit: number, offset: number): Promise<IArtist[]> => {
  const body = { limit, offset };
  try {
    const data = await sendRequest(artistsEndpoint, Method.GET, body) as string;
    const artists =  JSON.parse(data).items.map((item:any) => ({...item, id: item._id}));
    console.log(artists);
    return artists;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const getArtistById = async (id: string): Promise<IArtist | null> => {
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
  bandsIds:string[],
  instruments:string[],
  context:IConfig
): Promise<IArtist | null> => {
  const body = {
    firstName,
    secondName,
    middleName,
    birthDate,
    birthPlace,
    country,
    bandsIds,
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
  bandsIds:string[],
  instruments:string[],
  context:IConfig
): Promise<IArtist | null> => {
  const body = {
    firstName,
    secondName,
    middleName,
    birthDate,
    birthPlace,
    country,
    bandsIds,
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

export const getArtistsByIds = async (ids: string[]):Promise<(IArtist | null)[] | []> => {
  const responses = await Promise.all(
      ids.map((id: string) => getArtistById(id))
  );
  console.log(responses);
  if (!responses) return [];
  return responses;
}
