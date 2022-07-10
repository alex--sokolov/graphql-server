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

export const TracksResolver = {
  Query: {
    tracks: async (token: IToken, part: IDataPart): Promise<IGenre[]> => {
      const limit = part.limit || 5;
      const offset = part.offset || 0;
      return await getAllTracks(limit, offset);
    },
    track: async (token: IToken, genre: Pick<IGenre, 'id'>): Promise<IGenre | null> => {
      return await getTrackById(genre.id);
    }
  },
  Mutation: {
    createTrack: async (token: IToken, {genre}: {genre:IGenreInputCreate}, context: IConfig): Promise<IGenre | null> => {
      console.log(token);
      const description = genre.description || '';
      const country = genre.country || '';
      const year = genre.year || '';
      return await createNewTrack(genre.name, description, country, year, context);
    },
    updateTrack: async (token: IToken, {genre}: {genre:IGenreInputUpdate}, context: IConfig): Promise<IGenre | null> => {
      const name = genre.name || '';
      const description = genre.description || '';
      const country = genre.country || '';
      const year = genre.year || '';
      return await updateExistedTrack(genre.id, name, description, country, year, context);
    },
    deleteTrack: async (token: IToken, genre: Pick<IGenre, 'id'>, context: IConfig): Promise<IDeleted | null> => {
      return await removeTrack(genre.id, context);
    },
  }
};
