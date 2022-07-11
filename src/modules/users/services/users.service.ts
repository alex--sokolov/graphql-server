import { Entity, IToken, IUser, Method } from '../../../interfaces';
import { getEndpoint, sendRequest } from '../../../utils';
import path from 'path';

export const usersEndpoint = getEndpoint(Entity.USERS);

export const login = async (email: string, password: string): Promise<IToken> => {
  const body = { email, password };
  try {
    const data = await sendRequest(path.join(usersEndpoint, 'login'), Method.POST, body) as string;
    const res = JSON.parse(data);
    console.log(res);
    return res;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getUserById = async (id: string): Promise<IUser | null> => {
  try {
    const data = await sendRequest(path.join(usersEndpoint, id), Method.GET) as string;
    const result = JSON.parse(data);
    return { ...result, id: result._id };
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const auth = async (firstName:string, lastName:string, email:string, password:string) => {
  console.log('usersEndpoint', usersEndpoint);
  const body = { firstName, lastName, email, password };
  try {
    const data = await sendRequest(path.join(usersEndpoint, 'register'), Method.POST, body) as string;
    const result = JSON.parse(data);
    return { ...result, id: result._id };
  } catch (error) {
    console.error(error);
    return null;
  }
};
