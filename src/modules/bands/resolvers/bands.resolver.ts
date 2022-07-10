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
  getAllBands,
  getBandById,
  createNewBand,
  updateExistedBand,
  removeBand
} from '../services/bands.service';

export const BandsResolver = {
  Query: {
    bands: async (token: IToken, part: IDataPart): Promise<IGenre[]> => {
      const limit = part.limit || 5;
      const offset = part.offset || 0;
      return await getAllBands(limit, offset);
    },
    band: async (token: IToken, genre: Pick<IGenre, 'id'>): Promise<IGenre | null> => {
      return await getBandById(genre.id);
    }
  },
  Mutation: {
    createBand: async (token: IToken, {genre}: {genre:IGenreInputCreate}, context: IConfig): Promise<IGenre | null> => {
      console.log(token);
      const description = genre.description || '';
      const country = genre.country || '';
      const year = genre.year || '';
      return await createNewBand(genre.name, description, country, year, context);
    },
    updateBand: async (token: IToken, {genre}: {genre:IGenreInputUpdate}, context: IConfig): Promise<IGenre | null> => {
      const name = genre.name || '';
      const description = genre.description || '';
      const country = genre.country || '';
      const year = genre.year || '';
      return await updateExistedBand(genre.id, name, description, country, year, context);
    },
    deleteBand: async (token: IToken, genre: Pick<IGenre, 'id'>, context: IConfig): Promise<IDeleted | null> => {
      return await removeBand(genre.id, context);
    },
  }
};
