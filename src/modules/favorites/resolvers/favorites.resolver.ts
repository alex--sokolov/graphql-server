import { IDataPart, ITrack } from '../../../interfaces';
import { getAllTracks, getTrackById } from '../../tracks/services/tracks.service';

export const FavoritesResolver = {
  Query: {
    favourites: async (_: any, part: IDataPart): Promise<ITrack[]> => {
      const limit = part.limit || 5;
      const offset = part.offset || 0;
      return await getAllTracks(limit, offset);
    },
  },
  Mutation: {}
}