import { Entity, IToken, IUser, Method } from '../../../interfaces';
import { getEndpoint, sendRequest } from '../../../utils';
import path from 'path';

const tracksEndpoint = getEndpoint(Entity.TRACKS);

export const login = async (email: string, password: string): Promise<IToken> => {
  const body = { email, password };
  try {
    const data = await sendRequest(path.join(tracksEndpoint, 'login'), Method.POST, body) as string;
    return JSON.parse(data);
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getUserById = async (id: string): Promise<IUser | null> => {
  try {
    const data = await sendRequest(path.join(tracksEndpoint, id), Method.GET) as string;
    const result = JSON.parse(data);
    return { ...result, id: result._id };
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const auth = async (firstName:string, lastName:string, email:string, password:string) => {
  const body = { firstName, lastName, email, password };
  try {
    const data = await sendRequest(path.join(tracksEndpoint, 'register'), Method.POST, body) as string;
    const result = JSON.parse(data);
    return { ...result, id: result._id };
  } catch (error) {
    console.error(error);
    return null;
  }
};
