import {
  IBand,
  IBandInputCreate, IBandInputUpdate,
  IConfig,
  IDataPart,
  IDeleted,
  IGenre,
  IToken
} from '../../../interfaces';
import {
  getAllBands,
  getBandById,
  createNewBand,
  updateExistedBand,
  removeBand
} from '../services/bands.service';

export const resolver = {
  Query: {
    bands: async (_: any, part: IDataPart): Promise<IBand[]> => {
      const limit = part.limit || 5;
      const offset = part.offset || 0;
      return await getAllBands(limit, offset);
    },
    band: async (token: IToken, genre: Pick<IGenre, 'id'>): Promise<IBand | null> => {
      return await getBandById(genre.id);
    }
  },
  Mutation: {
    createBand: async (_: any, {band}: {band:IBandInputCreate}, context: IConfig): Promise<IBand | null> => {
      const name = band.name;
      const origin = band.origin || '';
      const membersIds = band.membersIds || [];
      const website = band.website || '';
      const genresIds = band.genresIds || [];
      return await createNewBand(
        name,
        origin,
        membersIds,
        website,
        genresIds,
        context
      );
    },
    updateBand: async (_: any, {band}: {band:IBandInputUpdate}, context: IConfig): Promise<IBand | null> => {
      const id = band.id;
      const name = band.name || '';
      const origin = band.origin || '';
      const membersIds = band.membersIds || [];
      const website = band.website || '';
      const genresIds = band.genresIds || [];
      return await updateExistedBand(
        id,
        name,
        origin,
        membersIds,
        website,
        genresIds,
        context
      );
    },
    deleteBand: async (_: any, band: Pick<IBand, 'id'>, context: IConfig): Promise<IDeleted | null> => {
      return await removeBand(band.id, context);
    },
  }
};
