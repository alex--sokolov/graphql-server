import {
  IArtist,
  IArtistInputCreate, IArtistInputUpdate,
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
    artists: async (_: any, part: IDataPart): Promise<IGenre[]> => {
      const limit = part.limit || 5;
      const offset = part.offset || 0;
      return await getAllArtists(limit, offset);
    },
    artist: async (_: any, genre: Pick<IGenre, 'id'>): Promise<IGenre | null> => {
      return await getArtistById(genre.id);
    }
  },
  // Artist: {
  //   bands: async (parent: any) => {
  //     const result = { ...parent };
  //     if (parent.bandsIds) {
  //       result.bands = await getBandsByIds(parent.bandsIds, bandsUrl);
  //     }
  //     return result.bands;
  //   },
  // },
  Mutation: {
    createArtist: async (_: any, {artist}: {artist:IArtistInputCreate}, context: IConfig): Promise<IArtist | null> => {
      const firstName = artist.firstName;
      const secondName = artist.secondName;
      const middleName = artist.middleName || '';
      const birthDate = artist.birthDate || '';
      const birthPlace = artist.birthPlace || '';
      const country = artist.country;
      const bands = artist.bands || [];
      const instruments = artist.instruments || [];

      return await createNewArtist(
        firstName,
        secondName,
        middleName,
        birthDate,
        birthPlace,
        country,
        bands,
        instruments,
        context);
    },
    updateArtist: async (_: any, {artist}: {artist:IArtistInputUpdate}, context: IConfig): Promise<IGenre | null> => {
      const id = artist.id;
      const firstName = artist.firstName || '';
      const secondName = artist.secondName || '';
      const middleName = artist.middleName || '';
      const birthDate = artist.birthDate || '';
      const birthPlace = artist.birthPlace || '';
      const country = artist.country || '';
      const bands = artist.bands || [];
      const instruments = artist.instruments || [];
      return await updateExistedArtist(
        id,
        firstName,
        secondName,
        middleName,
        birthDate,
        birthPlace,
        country,
        bands,
        instruments,
        context);
    },
    deleteArtist: async (_: any, artist: Pick<IArtist, 'id'>, context: IConfig): Promise<IDeleted | null> => {
      return await removeArtist(artist.id, context);
    },
  }
};
