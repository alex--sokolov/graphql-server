import { getEndpoint } from '../../../utils';
import { Entity, IToken, IUser} from '../../../interfaces';
import { login, getUserById, auth } from '../services/user.service';

export const userEndpoint = getEndpoint(Entity.USERS);

export const UsersResolver = {
  Query: {
    jwt: async (token: IToken, info: Pick<IUser, 'email' | 'password'>): Promise<IToken> => {
      return await login(info.email, info.password);
    },
    user: async (token: IToken, info: Pick<IUser, 'id'>): Promise<IUser | null> => {
      return await getUserById(info.id);
    }
  },
  Mutation: {
    register: async (token: IToken, user: Omit<IUser, 'id'>): Promise<IUser | null> => {
      return await auth(user.firstName, user.lastName, user.email, user.password);
    },
  }
};
