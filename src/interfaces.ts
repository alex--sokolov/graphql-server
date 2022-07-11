export enum Entity {
  GENRES = 'GENRES',
  ARTISTS = 'ARTISTS',
  BANDS = 'BANDS',
  USERS = 'USERS',
  ALBUMS = 'ALBUMS',
  TRACKS = 'TRACKS',
  FAVOURITES = 'FAVOURITES',
}

export enum Method {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

export interface ITokenExist {
  token: string;
}

export interface IConfig {
  config: {
    headers: {
      Authorization: string;
    }
  }
}

export type IToken = ITokenExist | null;

export interface IDataPart {
  limit: number;
  offset: number;
}

export interface IDeleted {
  acknowledged: boolean;
  deletedCount: number;
}


export interface IArtist {
  id: string;
  firstName?: string;
  secondName?: string;
  middleName?: string;
  birthDate?: string;
  birthPlace?: string;
  country?: string;
  bands: IBand[];
  bandsIds?: string[];
  instruments?: string[];
}

export interface IArtistInputCreate {
  firstName: string;
  secondName: string;
  middleName?: string;
  birthDate?: string;
  birthPlace?: string;
  country: string;
  bandsIds?: string[];
  instruments?: string[];
}

export interface IArtistInputUpdate {
  id: string;
  firstName?: string;
  secondName?: string;
  middleName?: string;
  birthDate?: string;
  birthPlace?: string;
  country?: string;
  bandsIds?: string[];
  instruments?: string[];
}

export interface IUser {
  id: string;
  firstName: string;
  lastName: string;
  password: string;
  email: string;
}

export interface IMember {
  artist?: string,
  instrument?: string;
  years?: string[];
}

export interface IBand {
  id: string;
  name?: string;
  origin?: string;
  members: IMember[];
  website?: string;
  genresIds?: string[];
  genres?: IGenre[];
}

export interface IBandInputCreate {
  name: string;
  origin?: string;
  members?: IMember[];
  website?: string;
  genresIds?: string[];
}

export interface IBandInputUpdate {
  id: string;
  name?: string;
  origin?: string;
  members?: IMember[];
  website?: string;
  genresIds?: string[];
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
  artists: IArtist[];
  bands: IBand[];
  genres: IGenre[];
  artistsIds: string[];
  bandsIds: string[];
  genresIds: string[];
  duration: number;
  released: number;
}

export interface ITrackInputCreate {
  title: string;
  album?: string;
  artistsIds: string[];
  bandsIds: string[];
  genresIds: string[];
  duration?: number;
  released?: number;
}

export interface ITrackInputUpdate {
  id:string;
  title?: string;
  album?: string;
  artistsIds?: string[];
  bandsIds?: string[];
  genresIds?: string[];
  duration?: number;
  released?: number;
}

export interface IAlbum {
  id: string;
  name?: string;
  released?: number;
  artists?: IArtist[];
  bands?: IBand[];
  tracks?: ITrack[];
  genres?: IGenre[];
  artistsIds?: string[];
  image?: string;
  bandsIds?: string[];
  trackIds?: string[];
  genresIds?: string[];
}

export interface IAlbumInputCreate {
  name: string;
  trackIds: string[];
  artistsIds: string[];
  bandsIds: string[];
  genresIds: string[];
  image?: string;
  released?: number;
}

export interface IAlbumInputUpdate {
  id: string;
  name?: string;
  trackIds?: string[];
  artistsIds?: string[];
  bandsIds?: string[];
  genresIds?: string[];
  image?: string;
  released?: number;
}

export interface IFavorites {
  userId: string;
  bandsIds: string[];
  genresIds: string[];
  artistsIds: string[];
  trackIds: string[];
}

export interface IDeleted {
  acknowledged: boolean;
  deletedCount: number;
}