import {
  IAlbum, IAlbumInputCreate, IAlbumInputUpdate, IArtist, IBand,
  IConfig,
  IDataPart,
  IDeleted,
  IGenre, ITrack
} from '../../../interfaces';
import {
  getAllAlbums,
  getAlbumById,
  createNewAlbum,
  updateExistedAlbum,
  removeAlbum
} from '../services/albums.service';
import {getArtistsByIds} from "../../artists/services/artists.service";
import {getBandsByIds} from "../../bands/services/bands.service";
import {getGenresByIds} from "../../genres/services/genres.service";
import {getTracksByIds} from "../../tracks/services/tracks.service";

export const resolver = {
  Query: {
    albums: async (_: any, part: IDataPart): Promise<IAlbum[]> => {
      const limit = part.limit || 5;
      const offset = part.offset || 0;
      return await getAllAlbums(limit, offset);
    },
    album: async (_: any, genre: Pick<IGenre, 'id'>): Promise<IAlbum | null> => {
      return await getAlbumById(genre.id);
    }
  },
  Album: {
    artists: async (parent: IAlbum): Promise<(IArtist | null)[]> => {
      if (parent.artistsIds) {
        return await getArtistsByIds(parent.artistsIds);
      } else return [];
    },
    bands: async (parent: IAlbum): Promise<(IBand | null)[]> => {
      if (parent.bandsIds) {
        return await getBandsByIds(parent.bandsIds);
      } else return [];
    },
    genres: async (parent: IAlbum): Promise<(IGenre | null)[]> => {
      if (parent.genresIds) {
        return await getGenresByIds(parent.genresIds);
      } else return [];
    },
    tracks: async (parent: IAlbum): Promise<(ITrack | null)[]> => {
      if (parent.trackIds) {
        return await getTracksByIds(parent.trackIds);
      } else return [];
    },
  },
  Mutation: {
    createAlbum: async (_: any, {album}: {album:IAlbumInputCreate}, context: IConfig): Promise<IAlbum | null> => {
      const name = album.name;
      const trackIds = album.trackIds;
      const artistsIds = album.artistsIds;
      const bandsIds = album.bandsIds;
      const genresIds = album.genresIds;
      const image = album.image || '';
      const released = album.released || 0;
      return await createNewAlbum(
      name,
      trackIds,
      artistsIds,
      bandsIds,
      genresIds,
      image,
      released,
      context
      );
    },
    updateAlbum: async (_: any, {album}: {album:IAlbumInputUpdate}, context: IConfig): Promise<IAlbum | null> => {
      const id = album.id;
      const name = album.name || '';
      const trackIds = album.trackIds || [];
      const artistsIds = album.artistsIds || [];
      const bandsIds = album.bandsIds || [];
      const genresIds = album.genresIds || [];
      const image = album.image || '';
      const released = album.released || 0;
      return await updateExistedAlbum(
        id,
        name,
        trackIds,
        artistsIds,
        bandsIds,
        genresIds,
        image,
        released,
        context
      );
    },
    deleteAlbum: async (_: any, album: Pick<IAlbum, 'id'>, context: IConfig): Promise<IDeleted | null> => {
      return await removeAlbum(album.id, context);
    },
  }
};
