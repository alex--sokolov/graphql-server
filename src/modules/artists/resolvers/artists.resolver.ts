import {
  IArtist,
  IArtistInputCreate,
  IArtistInputUpdate,
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

export const resolver = {

  Query: {
    artists: async (_: any, part: IDataPart): Promise<IArtist[]> => {
      const limit = part.limit || 5;
      const offset = part.offset || 0;
      return await getAllArtists(limit, offset);
    },
    artist: async (_: any, genre: Pick<IGenre, 'id'>): Promise<IArtist | null> => {
      return await getArtistById(genre.id);
    },
  },
  Artist: {
    bands: async (parent: any, args: { limit: any, offset: any }, context: IConfig, info: any) => {
      // console.log('NESTED');
      // console.log('parent', parent);
      // console.log('args', args);
      // console.log('context', context);
      // console.log('info', info);
      if (parent.bandsIds) {
        return await getBandsByIds(parent.bandsIds);
      }

    //
    //   return await getBandsForArtists();
      // return [
      //   {
      //     id: "78687684573",
      //     name: "jhjhgkjfhdf",
      //     origin: "fdjgjfdgjkf"
      //   },
      //   {
      //     id: "7868764554544",
      //     name: "zzzzzzzzzz",
      //     origin: "66666"
      //   },
      // ];
    }
    // bands: async (parent: any, args: any, context: IConfig, info: any):Promise<(IBand[])> => {
    //   console.log('Inside!!!');
    //   console.log('NESTED');
    //   console.log('parent', parent);
    //   console.log('args', args);
    //   console.log('context', context);
    //   console.log('info', info);
    //   // const res = await getBandsByIds(parent.bandsIds, Entity.ARTISTS);
    //   // console.log(res);
    //
    //
    //   const sleep = ():Promise<(IArtist[])> => {
    //     return new Promise(resolve => setTimeout(() => {
    //       parent.bands = [
    //         {
    //           id: "78687684573",
    //           name: "jhjhgkjfhdf",
    //           origin: "fdjgjfdgjkf"
    //         }
    //       ];
    //       resolve(parent.bands);
    //     }, 5000))
    //   }
    //
    //   // const result = await sleep();
    //   return await sleep();
    //
    //
    //   //
    //   // const result = { ...parent };
    //   // if (parent.bandsIds) {
    //   //   result.bands = await getBandsByIds(parent.bandsIds, Entity.ARTISTS);
    //   // }
    //   // return result.bands;
    // }
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
