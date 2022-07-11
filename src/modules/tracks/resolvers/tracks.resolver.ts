import {
  IConfig,
  IDataPart,
  IDeleted,
  ITrack,
  ITrackInputCreate,
  ITrackInputUpdate,
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
    tracks: async (_: any, part: IDataPart): Promise<ITrack[]> => {
      const limit = part.limit || 5;
      const offset = part.offset || 0;
      return await getAllTracks(limit, offset);
    },
    track: async (_: any, track: Pick<ITrack, 'id'>): Promise<ITrack | null> => {
      return await getTrackById(track.id);
    }
  },
  Mutation: {
    createTrack: async (_: any, { track }: { track: ITrackInputCreate }, context: IConfig): Promise<ITrack | null> => {
      const title = track.title;
      const album = track.album || '';
      const artists = track.artists;
      const bands = track.bands;
      const genres = track.genres;
      const duration = track.duration || 0;
      const released = track.released || 0;
      return await createNewTrack(
        title,
        album,
        artists,
        bands,
        genres,
        duration,
        released,
        context
      );
    },
    updateTrack: async (_: any, { track }: { track: ITrackInputUpdate }, context: IConfig): Promise<ITrack | null> => {
      const id = track.id;
      const title = track.title;
      const album = track.album || '';
      const artists = track.artists;
      const bands = track.bands;
      const genres = track.genres;
      const duration = track.duration || 0;
      const released = track.released || 0;
      return await updateExistedTrack(
        id,
        title || '',
        album || '',
        artists || [],
        bands || [],
        genres || [],
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
