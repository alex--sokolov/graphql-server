import {IConfig, IFavorites} from '../../../interfaces';
import {addToFavourites, getAllFavorites} from "../services/favourites.service";

export const resolver = {
  Query: {
    favourites: async (_: any, {userId}:{userId:string}, context: IConfig): Promise<IFavorites[]> => {
      return await getAllFavorites(userId, context);
    },
  },
  Favourites: {
    bands: async (parent: any) => {
      console.log('--------')

      // const result = { ...parent };
      // if (parent.bandsIds) {
      //   result.bands = await moreRequestsById(parent.bandsIds, bandsUrl);
      // }
      // return result.bands;
    }
  },
  Mutation: {
    addTrackToFavourites: async (_: any, {id}:{id:string}, context: IConfig): Promise<IFavorites[]> => {
      const type = 'track';
      return await addToFavourites(id, type, context);
    },
  },
}