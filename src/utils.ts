import { Entity, Method } from './interfaces';
import path from 'path';
import { request } from 'http';

export const getEndpoint = (entity: Entity):string => {
  const endpoints = {
    genres: 'v1/genres',
    artists: 'v1/artists',
    bands: 'v1/bands',
    users: 'v1/users',
    albums: 'v1/albums',
    tracks: 'v1/tracks',
    favourites: 'v1/favourites',
  }

  const host = process.env.HOST || 'http://localhost';
  const port = process.env.USERS_PORT || `${entity}`;
  return path.join(host+':'+port, endpoints.users);
}

export const sendRequest = (path:string, method: Method, body?:any): Promise<string | void> => {
  return new Promise((resolve, reject) => {

    const info = body ? JSON.stringify(body) : '';
    const options = {
      method: method,
      headers: {}
    };

    if (method === Method.POST || Method.PUT) {
      options.headers = {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(info)
      }
    }
    console.log('path', path);
    const req = request(path, options, (res) => {
      let data = '';
      console.log('Status', res.statusCode);
      console.log('Headers', JSON.stringify(res.headers, null, 2));
      res.setEncoding('utf8');
      res.on('data', (chunk:string) => {
        data += chunk;
      });
      res.on('end', (chunk:string | undefined) => {
        console.log('No more data in response');
        if (chunk) data += chunk;
        console.log('data', data);
        resolve(data);
      });

    });
    req.on('error', (err) => {
      console.error('request fail with error: ', err.message);
      reject(err);
    });
    console.log('info', info);
    req.end(info);
  })
}
