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
  getAllArtists,
  getArtistById,
  createNewArtist,
  updateExistedArtist,
  removeArtist
} from '../services/artists.service';

export const ArtistsResolver = {
  Query: {
    artists: async (token: IToken, part: IDataPart): Promise<IGenre[]> => {
      const limit = part.limit || 5;
      const offset = part.offset || 0;
      return await getAllArtists(limit, offset);
    },
    artist: async (token: IToken, genre: Pick<IGenre, 'id'>): Promise<IGenre | null> => {
      return await getArtistById(genre.id);
    }
  },
  Mutation: {
    createArtist: async (token: IToken, {genre}: {genre:IGenreInputCreate}, context: IConfig): Promise<IGenre | null> => {
      console.log(token);
      const description = genre.description || '';
      const country = genre.country || '';
      const year = genre.year || '';
      return await createNewArtist(genre.name, description, country, year, context);
    },
    updateArtist: async (token: IToken, {genre}: {genre:IGenreInputUpdate}, context: IConfig): Promise<IGenre | null> => {
      const name = genre.name || '';
      const description = genre.description || '';
      const country = genre.country || '';
      const year = genre.year || '';
      return await updateExistedArtist(genre.id, name, description, country, year, context);
    },
    deleteArtist: async (token: IToken, genre: Pick<IGenre, 'id'>, context: IConfig): Promise<IDeleted | null> => {
      return await removeArtist(genre.id, context);
    },
  }
};
