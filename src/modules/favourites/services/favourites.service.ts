import {Entity, IConfig, IFavorites, Method} from '../../../interfaces';
import { getEndpoint, sendRequest } from '../../../utils';

const favouritesEndpoint = getEndpoint(Entity.FAVOURITES);

export const getAllFavorites = async (context: IConfig): Promise<IFavorites[]> => {
  try {
    const data = await sendRequest(favouritesEndpoint, Method.GET, null, context) as string;
    const res = JSON.parse(data);
    return {...res, id: res._id};
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const addToFavourites = async (id: string, type: string, context: IConfig): Promise<IFavorites[]> => {
  const body = { id, type };
  try {
    const data = await sendRequest(`${favouritesEndpoint}/add`, Method.PUT, body, context) as string;
    const res = JSON.parse(data);
    return (res && res._id) ? {...res, id: res._id} : res;
  } catch (error) {
    console.error(error);
    return [];
  }
}

export const removeFromFavourites = async (_:any, id: string, type: string, context: IConfig): Promise<IFavorites[]> => {
  const body = { id, type };
  try {
    const data = await sendRequest(`${favouritesEndpoint}/remove`, Method.PUT, body, context) as string;
    const res = JSON.parse(data);
    return {...res, id: res._id};
  } catch (error) {
    console.error(error);
    return [];
  }
}
