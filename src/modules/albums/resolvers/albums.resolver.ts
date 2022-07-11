import {
  IAlbum, IAlbumInputCreate, IAlbumInputUpdate,
  IConfig,
  IDataPart,
  IDeleted,
  IGenre,
  IGenreInputCreate,
  IGenreInputUpdate,
  IToken
} from '../../../interfaces';
import {
  getAllAlbums,
  getAlbumById,
  createNewAlbum,
  updateExistedAlbum,
  removeAlbum
} from '../services/albums.service';

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
  Mutation: {
    createAlbum: async (_: any, {album}: {album:IAlbumInputCreate}, context: IConfig): Promise<IAlbum | null> => {
      const name = album.name;
      const tracks = album.tracks;
      const artists = album.artists;
      const bands = album.bands;
      const genres = album.genres;
      const image = album.image || '';
      const released = album.released || 0;
      return await createNewAlbum(
      name,
      tracks,
      artists,
      bands,
      genres,
      image,
      released,
      context
      );
    },
    updateAlbum: async (_: any, {album}: {album:IAlbumInputUpdate}, context: IConfig): Promise<IAlbum | null> => {
      const id = album.id;
      const name = album.name || '';
      const tracks = album.tracks || [];
      const artists = album.artists || [];
      const bands = album.bands || [];
      const genres = album.genres || [];
      const image = album.image || '';
      const released = album.released || 0;
      return await updateExistedAlbum(
        id,
        name,
        tracks,
        artists,
        bands,
        genres,
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
