export enum Entity {
  GENRES = 'GENRES',
  ARTISTS = 'ARTISTS',
  BANDS = 'BANDS',
  USERS = 'USERS',
  ALBUMS = 'ALBUMS',
  TRACKS = 'TRACKS',
  FAVORITES = 'FAVORITES'
}

export enum Method {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE'
}

export interface ITokenExist {
  token: string;
}

export interface IConfig {
  config: {
    headers: {
      Authorization: string
    }
  }
}

export type IToken = ITokenExist | null;

export interface IDataPart {
  limit?: number;
  offset?: number;
}

export interface IDeleted {
  acknowledged: boolean;
  deletedCount: number;
}


export interface IArtist {
  id: string;
  firstName: string;
  secondName: string;
  middleName: string;
  birthDate: string;
  birthPlace: string;
  country: string;
  bandsIds: string[];
  instruments: string[];
}

export interface IArtistInputCreate {
  firstName: string;
  secondName: string;
  middleName?: string;
  birthDate?: string;
  birthPlace?: string;
  country: string;
  bands?: string[];
  instruments?: string[]
}

export interface IArtistInputUpdate {
  id: string;
  firstName?: string;
  secondName?: string;
  middleName?: string;
  birthDate?: string;
  birthPlace?: string;
  country?: string;
  bands?: string[];
  instruments?: string[]
}

export interface IUser {
  id: string;
  firstName: string;
  lastName: string;
  password: string;
  email: string;
}

export interface IMember {
  artist: string,
  instrument: string;
  years: [string]
}

export interface IBand {
  id: string;
  name: string;
  origin: string;
  membersId: IMember[];
  website: string;
  genresIds: string[];
}

export interface IGenre {
  id: string;
  name: string;
  description: string;
  country: string;
  year: string;
}

export interface IGenreInputCreate {
  name: string;
  description?: string;
  country?: string;
  year?: string;
}

export interface IGenreInputUpdate{
  id: string;
  name?: string;
  description?: string;
  country?: string;
  year?: string;
}

export interface ITrack {
  id: string;
  title: string;
  albumId: string;
  artistsIds: string[];
  bandsIds: string[];
  duration: number;
  released: number;
  genresIds: string[];
}

export interface IAlbum {
  id: string;
  name: string;
  released: number;
  artistsIds: string[];
  bandsIds: string[];
  trackIds: string[];
  genresIds: string[];
  image: string;
}

export interface IFavorite {
  id: string;
  userId: string;
  bandsIds: string[];
  genresIds: string[];
  artistsIds: string[];
  tracksIds: string[];
}

export interface IDeleted {
  acknowledged: boolean;
  deletedCount: number;
}