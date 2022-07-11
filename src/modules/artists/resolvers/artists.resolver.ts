import {
  Entity,
  IArtist,
  IArtistInputCreate,
  IArtistInputUpdate, IBand,
  IConfig,
  IDataPart,
  IDeleted,
  IGenre,
} from '../../../interfaces';
import {
  getAllArtists,
  getArtistById,
  createNewArtist,
  updateExistedArtist,
  removeArtist
} from '../services/artists.service';
import { getBandsByIds } from '../../bands/services/bands.service';

export const ArtistsResolver = {

  Query: {
    artists: async (_: any, part: IDataPart, parents:any): Promise<IArtist[]> => {
      console.log('-----------');
      console.log('parents', parents);
      console.log('-----------');
      const limit = part.limit || 5;
      const offset = part.offset || 0;
      return await getAllArtists(limit, offset);
    },
    artist: async (_: any, genre: Pick<IGenre, 'id'>): Promise<IArtist | null> => {
      return await getArtistById(genre.id);
    },
  },
  Artist: {
    bands: async (parent: any):Promise<(IBand | null)[] | []> => {
      console.log('Inside!!!');
      const result = { ...parent };
      if (parent.bandsIds) {
        result.bands = await getBandsByIds(parent.bandsIds, Entity.ARTISTS);
      }
      return result.bands;
    }
  },
  Mutation: {
    createArtist: async (_: any, {artist}: {artist:IArtistInputCreate}, context: IConfig): Promise<IArtist | null> => {
      const firstName = artist.firstName;
      const secondName = artist.secondName;
      const middleName = artist.middleName || '';
      const birthDate = artist.birthDate || '';
      const birthPlace = artist.birthPlace || '';
      const country = artist.country;
      const bandsIds = artist.bandsIds || [];
      const instruments = artist.instruments || [];

      return await createNewArtist(
        firstName,
        secondName,
        middleName,
        birthDate,
        birthPlace,
        country,
        bandsIds,
        instruments,
        context);
    },
    updateArtist: async (_: any, {artist}: {artist:IArtistInputUpdate}, context: IConfig): Promise<IArtist | null> => {
      const id = artist.id;
      const firstName = artist.firstName || '';
      const secondName = artist.secondName || '';
      const middleName = artist.middleName || '';
      const birthDate = artist.birthDate || '';
      const birthPlace = artist.birthPlace || '';
      const country = artist.country || '';
      const bandsIds = artist.bandsIds || [];
      const instruments = artist.instruments || [];
      return await updateExistedArtist(
        id,
        firstName,
        secondName,
        middleName,
        birthDate,
        birthPlace,
        country,
        bandsIds,
        instruments,
        context);
    },
    deleteArtist: async (_: any, artist: Pick<IArtist, 'id'>, context: IConfig): Promise<IDeleted | null> => {
      return await removeArtist(artist.id, context);
    },
  }
};
