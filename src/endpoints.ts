export const ENTITY = {
  GENRES: {
    port: process.env.GENRES_PORT || 3001,
    endpoint: 'v1/genres',
  },
  ARTISTS: {
    port: process.env.GENRES_ARTISTS || 3002,
    endpoint: 'v1/artists',
  },
  BANDS: {
    port: process.env.BANDS || 3003,
    endpoint: 'v1/bands',
  },
  USERS: {
    port: process.env.BANDS || 3004,
    endpoint: 'v1/users',
  },
  ALBUMS: {
    port: process.env.ALBUMS || 3005,
    endpoint: 'v1/albums',
  },
  TRACKS: {
    port: process.env.TRACKS || 3006,
    endpoint: 'v1/tracks',
  },
  FAVOURITES: {
    port: process.env.FAVOURITES || 3007,
    endpoint: 'v1/favourites',
  }
};