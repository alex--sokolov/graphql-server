import { Entity, IConfig, IDeleted, ITrack, Method } from '../../../interfaces';
import { getEndpoint, sendRequest } from '../../../utils';
import path from 'path';

const tracksEndpoint = getEndpoint(Entity.TRACKS);

export const getAllTracks = async (limit: number, offset: number): Promise<ITrack[]> => {
  const body = { limit, offset };
  try {
    const data = await sendRequest(tracksEndpoint, Method.GET, body) as string;
    return JSON.parse(data).items.map((item: any) => ({ ...item, id: item._id }));
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const getTrackById = async (id: string): Promise<ITrack | null> => {
  try {
    const data = await sendRequest(path.join(tracksEndpoint, id), Method.GET) as string;
    const Track = JSON.parse(data);
    return { ...Track, id: Track._id };
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const createNewTrack = async (
  title: string,
  album: string,
  artistsIds: string[],
  bandsIds: string[],
  genresIds: string[],
  duration: number,
  released: number,
  context: IConfig
): Promise<ITrack | null> => {
  const body = {
    title,
    album,
    artistsIds,
    bandsIds,
    genresIds,
    duration,
    released,
  };
  try {
    const data = await sendRequest(tracksEndpoint, Method.POST, body, context) as string;
    const result = JSON.parse(data);
    return { ...result, id: result._id };
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const updateExistedTrack = async (
  id: string,
  title: string,
  album: string,
  artistsIds: string[],
  bandsIds: string[],
  genresIds: string[],
  duration: number,
  released: number,
  context: IConfig
): Promise<ITrack | null> => {
  const body = {
    title,
    album,
    artistsIds,
    bandsIds,
    genresIds,
    duration,
    released,
  };
  try {
    const data = await sendRequest(path.join(tracksEndpoint, id), Method.PUT, body, context) as string;
    const result = JSON.parse(data);
    return { ...result, id: result._id };
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const removeTrack = async (id: string, context: IConfig): Promise<IDeleted | null> => {
  try {
    const data = await sendRequest(path.join(tracksEndpoint, `${id}`), Method.DELETE, null, context) as string;
    return JSON.parse(data);
  } catch (error) {
    console.error(error);
    return null;
  }
};
