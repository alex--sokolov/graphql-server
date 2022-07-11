import {IArtist, IBand, IConfig, IFavorites, IGenre, ITrack} from '../../../interfaces';
import {addToFavourites, getAllFavorites} from "../services/favourites.service";
import {getArtistsByIds} from "../../artists/services/artists.service";
import {getBandsByIds} from "../../bands/services/bands.service";
import {getGenresByIds} from "../../genres/services/genres.service";
import {getTracksByIds} from "../../tracks/services/tracks.service";

export const resolver = {
  Query: {
    favourites: async (_: any, args: any, context: IConfig): Promise<IFavorites[]> => {
      return await getAllFavorites(context);
    },
  },
  Favourites: {
    artists: async (parent: IFavorites): Promise<(IArtist | null)[]> => {
      if (parent.artistsIds) {
        return await getArtistsByIds(parent.artistsIds);
      } else return [];
    },
    bands: async (parent: IFavorites): Promise<(IBand | null)[]> => {
      if (parent.bandsIds) {
        return await getBandsByIds(parent.bandsIds);
      } else return [];
    },
    genres: async (parent: IFavorites): Promise<(IGenre | null)[]> => {
      if (parent.genresIds) {
        return await getGenresByIds(parent.genresIds);
      } else return [];
    },
    tracks: async (parent: IFavorites): Promise<(ITrack | null)[]> => {
      if (parent.trackIds) {
        return await getTracksByIds(parent.trackIds);
      } else return [];
    },
  },
  Mutation: {
    addTrackToFavourites: async (_: any, {id}:{id:string}, context: IConfig): Promise<IFavorites[]> => {
      const type = 'tracks';
      return await addToFavourites(id, type, context);
    },
    addBandToFavourites: async (_: any, id:string, context: IConfig): Promise<IFavorites[]> => {
      const type = 'bands';
      return await addToFavourites(id, type, context);
    },
    addArtistToFavourites: async (_: any, id:string, context: IConfig): Promise<IFavorites[]> => {
      const type = 'artists';
      return await addToFavourites(id, type, context);
    },
    addGenreToFavourites: async (_: any, id:string, context: IConfig): Promise<IFavorites[]> => {
      const type = 'genres';
      return await addToFavourites(id, type, context);
    },
    removeTrackFromFavourites: async (_: any, id:string, context: IConfig): Promise<IFavorites[]> => {
      const type = 'tracks';
      return await addToFavourites(id, type, context);
    },
    removeBandFromFavourites: async (_: any, id:string, context: IConfig): Promise<IFavorites[]> => {
      const type = 'bands';
      return await addToFavourites(id, type, context);
    },
    removeArtistFromFavourites: async (_: any, id:string, context: IConfig): Promise<IFavorites[]> => {
      const type = 'artists';
      return await addToFavourites(id, type, context);
    },
    removeGenreFromFavourites: async (_: any, id:string, context: IConfig): Promise<IFavorites[]> => {
      const type = 'genres';
      return await addToFavourites(id, type, context);
    },
  },
}