import { Entity, IConfig, IDeleted, IGenre, IToken, IUser, Method } from '../../../interfaces';
import { getEndpoint, sendRequest } from '../../../utils';
import path from 'path';

const bandsEndpoint = getEndpoint(Entity.BANDS);

export const getAllBands = async (limit: number, offset: number): Promise<IGenre[]> => {
  const body = { limit, offset };
  try {
    const data = await sendRequest(bandsEndpoint, Method.GET, body) as string;
    console.log('BANDS', data);
    return JSON.parse(data).items.map((item:any) => ({...item, id: item._id}));
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const getBandById = async (id: string): Promise<IGenre | null> => {
  try {
    const data = await sendRequest(path.join(bandsEndpoint, id), Method.GET) as string;
    const band = JSON.parse(data);
    return { ...band, id: band._id };
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const createNewBand = async (name:string, description:string, country:string, year:string, context:IConfig) => {
  const body = { name, description, country, year };
  try {
    const data = await sendRequest(bandsEndpoint, Method.POST, body, context) as string;
    const result = JSON.parse(data);
    return { ...result, id: result._id };
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const updateExistedBand = async (
  id: string,
  name:string,
  description:string,
  country:string,
  year: string,
  context: IConfig
) => {
  const body = { name, description, country, year };
  try {
    const data = await sendRequest(path.join(bandsEndpoint, id), Method.PUT, body, context) as string;
    const result = JSON.parse(data);
    return { ...result, id: result._id };
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const removeBand = async (id: string, context:IConfig): Promise<IDeleted | null> => {
  try {
    const data = await sendRequest(path.join(bandsEndpoint, `${id}`), Method.DELETE, null, context) as string;
    return JSON.parse(data);
  } catch (error) {
    console.error(error);
    return null;
  }
};
