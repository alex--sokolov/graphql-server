import { Entity, IBand, IConfig, IDeleted, IGenre, IMember, IToken, IUser, Method } from '../../../interfaces';
import { getEndpoint, sendRequest } from '../../../utils';
import path from 'path';

const bandsEndpoint = getEndpoint(Entity.BANDS);

export const getAllBands = async (limit: number, offset: number): Promise<IBand[]> => {
  const body = { limit, offset };
  try {
    const data = await sendRequest(bandsEndpoint, Method.GET, body) as string;
    return JSON.parse(data).items.map((item:any) => {
      const members = item.members.map((member:IMember) => Array.isArray(member.years) && {...member, years: member.years.join('')});
      return {...item, members: members, id: item._id}
    });
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const getBandById = async (id: string): Promise<IBand | null> => {
  try {
    const data = await sendRequest(path.join(bandsEndpoint, id), Method.GET) as string;
    const band = JSON.parse(data);
    const members = band.members.map((member:IMember) => Array.isArray(member.years) && {...member, years: member.years.join('')});
    return { ...band, members: members, id: band._id };
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const createNewBand = async (
  name: string,
  origin: string,
  members: IMember[],
  website: string,
  genresIds: string[],
  context: IConfig
): Promise<IBand | null> => {
  const body = {
    name,
    origin,
    members,
    website,
    genresIds,
  };
  try {
    const data = await sendRequest(bandsEndpoint, Method.POST, body, context) as string;
    const band = JSON.parse(data);
    const members = band.members.map((member:IMember) => Array.isArray(member.years) && {...member, years: member.years.join('')});
    return { ...band, members: members, id: band._id };
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const updateExistedBand = async (
  id: string,
  name: string,
  origin: string,
  membersIds: IMember[],
  website: string,
  genresIds: string[],
  context: IConfig
): Promise<IBand | null> => {
  const body = {
    name,
    origin,
    membersIds,
    website,
    genresIds,
  };
  try {
    const data = await sendRequest(path.join(bandsEndpoint, id), Method.PUT, body, context) as string;
    const band = JSON.parse(data);
    const members = band.members.map((member:IMember) => Array.isArray(member.years) && {...member, years: member.years.join('')});
    return { ...band, members: members, id: band._id };
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const removeBand = async (id: string, context:IConfig): Promise<IDeleted | null> => {
  try {
    const data = await sendRequest(path.join(bandsEndpoint, `${id}`), Method.DELETE, null, context) as string;
    return JSON.parse(data);
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getBandsByIds = async (ids: string[]):Promise<(IBand | null)[] | []> => {
  const responses = await Promise.all(
    ids.map((id: string) => getBandById(id))
  );
  console.log(responses);
  if (!responses) return [];
  return responses;
}
