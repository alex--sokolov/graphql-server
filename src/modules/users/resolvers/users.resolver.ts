import { IToken, IUser} from '../../../interfaces';
import { auth, getUserById, login } from '../services/users.service';

export const resolver = {
  Query: {
    jwt: async (token: IToken, info: Pick<IUser, 'email' | 'password'>): Promise<IToken> => {
      console.log('JWT Resolver');
      const res =  await login(info.email, info.password);
      return res;
    },
    user: async (token: IToken, info: Pick<IUser, 'id'>): Promise<IUser | null> => {
      return await getUserById(info.id);
    }
  },
  Mutation: {
    register: async (token: IToken, {user}: {user:Omit<IUser, 'id'>}): Promise<IUser | null> => {
      console.log('Register');
      return await auth(user.firstName, user.lastName, user.email, user.password);
    },
  }
};
