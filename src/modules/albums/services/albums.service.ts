import { Entity, IConfig, IDeleted, IGenre, IToken, IUser, Method } from '../../../interfaces';
import { getEndpoint, sendRequest } from '../../../utils';
import path from 'path';

const albumsEndpoint = getEndpoint(Entity.ALBUMS);


export const getAllAlbums = async (limit: number, offset: number): Promise<IGenre[]> => {
  const body = { limit, offset };
  try {
    const data = await sendRequest(albumsEndpoint, Method.GET, body) as string;
    console.log('AlbumS', data);
    return JSON.parse(data).items.map((item:any) => ({...item, id: item._id}));
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const getAlbumById = async (id: string): Promise<IGenre | null> => {
  try {
    const data = await sendRequest(path.join(albumsEndpoint, id), Method.GET) as string;
    const Album = JSON.parse(data);
    return { ...Album, id: Album._id };
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const createNewAlbum = async (name:string, description:string, country:string, year:string, context:IConfig) => {
  const body = { name, description, country, year };
  try {
    const data = await sendRequest(albumsEndpoint, Method.POST, body, context) as string;
    const result = JSON.parse(data);
    return { ...result, id: result._id };
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const updateExistedAlbum = async (
  id: string,
  name:string,
  description:string,
  country:string,
  year: string,
  context: IConfig
) => {
  const body = { name, description, country, year };
  try {
    const data = await sendRequest(path.join(albumsEndpoint, id), Method.PUT, body, context) as string;
    const result = JSON.parse(data);
    return { ...result, id: result._id };
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const removeAlbum = async (id: string, context:IConfig): Promise<IDeleted | null> => {
  try {
    const data = await sendRequest(path.join(albumsEndpoint, `${id}`), Method.DELETE, null, context) as string;
    return JSON.parse(data);
  } catch (error) {
    console.error(error);
    return null;
  }
};
