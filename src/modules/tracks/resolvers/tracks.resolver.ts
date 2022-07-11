import {
  IConfig,
  IDataPart,
  IDeleted,
  ITrack,
  ITrackInputCreate,
  ITrackInputUpdate,
  IBand, IArtist, IGenre
} from '../../../interfaces';
import {
  getAllTracks,
  getTrackById,
  createNewTrack,
  updateExistedTrack,
  removeTrack
} from '../services/tracks.service';
import {getArtistsByIds} from "../../artists/services/artists.service";
import {getBandsByIds} from "../../bands/services/bands.service";
import {getGenresByIds} from "../../genres/services/genres.service";

export const resolver = {
  Query: {
    tracks: async (_: any, part: IDataPart): Promise<ITrack[]> => {
      const limit = part.limit || 5;
      const offset = part.offset || 0;
      return await getAllTracks(limit, offset);
    },
    track: async (_: any, track: Pick<ITrack, 'id'>): Promise<ITrack | null> => {
      return await getTrackById(track.id);
    }
  },
  Track: {
    artists: async (parent: ITrack): Promise<(IArtist | null)[]> => {
      if (parent.artistsIds) {
        return await getArtistsByIds(parent.artistsIds);
      } else return [];
    },
    bands: async (parent: ITrack): Promise<(IBand | null)[]> => {
      if (parent.bandsIds) {
        return await getBandsByIds(parent.bandsIds);
      } else return [];
    },
    genres: async (parent: ITrack): Promise<(IGenre | null)[]> => {
      if (parent.genresIds) {
        return await getGenresByIds(parent.genresIds);
      } else return [];
    },
  },
  Mutation: {
    createTrack: async (_: any, { track }: { track: ITrackInputCreate }, context: IConfig): Promise<ITrack | null> => {
      const title = track.title;
      const album = track.album || '';
      const artistsIds = track.artistsIds;
      const bandsIds = track.bandsIds;
      const genresIds = track.genresIds;
      const duration = track.duration || 0;
      const released = track.released || 0;
      return await createNewTrack(
        title,
        album,
        artistsIds,
        bandsIds,
        genresIds,
        duration,
        released,
        context
      );
    },
    updateTrack: async (_: any, { track }: { track: ITrackInputUpdate }, context: IConfig): Promise<ITrack | null> => {
      const id = track.id;
      const title = track.title;
      const album = track.album || '';
      const artistsIds = track.artistsIds;
      const bandsIds = track.bandsIds;
      const genresIds = track.genresIds;
      const duration = track.duration || 0;
      const released = track.released || 0;
      return await updateExistedTrack(
        id,
        title || '',
        album || '',
        artistsIds || [],
        bandsIds || [],
        genresIds || [],
        duration || 0,
        released || 0,
        context
      );
    },
    deleteTrack: async (_: any, track: Pick<ITrack, 'id'>, context: IConfig): Promise<IDeleted | null> => {
      return await removeTrack(track.id, context);
    },
  }
};
