import {
  IConfig,
  IDataPart,
  IDeleted,
  IGenre,
  IGenreInputCreate,
  IGenreInputUpdate,
  IToken
} from '../../../interfaces';
import {
  getAllAlbums,
  getAlbumById,
  createNewAlbum,
  updateExistedAlbum,
  removeAlbum
} from '../services/albums.service';

export const AlbumsResolver = {
  Query: {
    albums: async (token: IToken, part: IDataPart): Promise<IGenre[]> => {
      const limit = part.limit || 5;
      const offset = part.offset || 0;
      return await getAllAlbums(limit, offset);
    },
    album: async (token: IToken, genre: Pick<IGenre, 'id'>): Promise<IGenre | null> => {
      return await getAlbumById(genre.id);
    }
  },
  Mutation: {
    createAlbum: async (token: IToken, {genre}: {genre:IGenreInputCreate}, context: IConfig): Promise<IGenre | null> => {
      console.log(token);
      const description = genre.description || '';
      const country = genre.country || '';
      const year = genre.year || '';
      return await createNewAlbum(genre.name, description, country, year, context);
    },
    updateAlbum: async (token: IToken, {genre}: {genre:IGenreInputUpdate}, context: IConfig): Promise<IGenre | null> => {
      const name = genre.name || '';
      const description = genre.description || '';
      const country = genre.country || '';
      const year = genre.year || '';
      return await updateExistedAlbum(genre.id, name, description, country, year, context);
    },
    deleteAlbum: async (token: IToken, genre: Pick<IGenre, 'id'>, context: IConfig): Promise<IDeleted | null> => {
      return await removeAlbum(genre.id, context);
    },
  }
};
