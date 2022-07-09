export enum Entity {
  GENRES = 3001,
  ARTISTS = 3002,
  BANDS = 3003,
  USERS = 3004,
  ALBUMS = 3005,
  TRACKS = 3006,
  FAVOURITES = 3007
}

export enum Method {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE'
}


export interface ITokenExist {
  token: string
}

export type IToken = ITokenExist | null;

export interface IUser {
  id: string;
  firstName: string;
  lastName: string;
  password: string;
  email: string;
}