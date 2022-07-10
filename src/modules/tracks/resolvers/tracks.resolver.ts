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
  getAllTracks,
  getTrackById,
  createNewTrack,
  updateExistedTrack,
  removeTrack
} from '../services/tracks.service';

export const GenresResolver = {
  Query: {
    genres: async (token: IToken, part: IDataPart): Promise<IGenre[]> => {
      const limit = part.limit || 5;
      const offset = part.offset || 0;
      return await getAllGenres(limit, offset);
    },
    genre: async (token: IToken, genre: Pick<IGenre, 'id'>): Promise<IGenre | null> => {
      return await getGenreById(genre.id);
    }
  },
  Mutation: {
    createGenre: async (token: IToken, {genre}: {genre:IGenreInputCreate}, context: IConfig): Promise<IGenre | null> => {
      console.log(token);
      const description = genre.description || '';
      const country = genre.country || '';
      const year = genre.year || '';
      return await createNewGenre(genre.name, description, country, year, context);
    },
    updateGenre: async (token: IToken, {genre}: {genre:IGenreInputUpdate}, context: IConfig): Promise<IGenre | null> => {
      const name = genre.name || '';
      const description = genre.description || '';
      const country = genre.country || '';
      const year = genre.year || '';
      return await updateExistedGenre(genre.id, name, description, country, year, context);
    },
    deleteGenre: async (token: IToken, genre: Pick<IGenre, 'id'>, context: IConfig): Promise<IDeleted | null> => {
      return await removeGenre(genre.id, context);
    },
  }
};
