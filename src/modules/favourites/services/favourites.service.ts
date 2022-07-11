import {Entity, IConfig, IFavorites, Method} from '../../../interfaces';
import { getEndpoint, sendRequest } from '../../../utils';

const favouritesEndpoint = getEndpoint(Entity.FAVOURITES);

console.log('favouritesEndpoint', favouritesEndpoint);

export const getAllFavorites = async (id: string, context: IConfig): Promise<IFavorites[]> => {
  const body = {
    userId: id
  }
  try {
    const data = await sendRequest(favouritesEndpoint, Method.GET, body, context) as string;
    console.log('Favorites', data);
    const res = JSON.parse(data);
    return {...res, id: res._id};
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const addToFavourites = async (id: string, type: string, context: IConfig): Promise<IFavorites[]> => {
  const body = {
    userId: id
  }
  try {
    const data = await sendRequest(favouritesEndpoint, Method.GET, body, context) as string;
    console.log('Favorites', data);
    const res = JSON.parse(data);
    return {...res, id: res._id};
  } catch (error) {
    console.error(error);
    return [];
  }
}
