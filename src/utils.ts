import { Entity, Method, IConfig } from './interfaces';
import path from 'path';
import { request } from 'http';
import { ENTITY } from './endpoints';

export const getEndpoint = ( entityName: Entity ): string => {
  const host = process.env.HOST || 'http://localhost';
  for (const [key, value] of Object.entries(ENTITY)) {
    if (key === entityName) {
      return path.join(host + ':' + value.port, value.endpoint);
    }
  }
  return '';
};

export const sendRequest = ( path: string, method: Method, body?: any, context?: IConfig ): Promise<string | void> => {
  return new Promise((resolve, reject) => {
    const info = body ? JSON.stringify(body) : '';
    console.log("BODY", info);
    const options = {
      method: method,
      headers: {},
      json: info,
    };

    if (context) {
      options.headers = context.config.headers;
    }

    if (method === Method.POST || Method.PUT) {
      options.headers = {
        ...options.headers,
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(info),
      };
    }
    console.log('options', options);
    console.log('HEADERS', options.headers);

    if (method === Method.GET && body) {
      const limit = body.limit ? `limit=${body.limit}` : '';
      const offset = body.offset ? `offset=${body.offset}` : '';
      path += limit
        ? offset ? `?${limit}&${offset}` : `?${limit}`
        : offset ? `?${offset}` : '';
    }
    console.log('path', path);

    const req = request(path, options, (res) => {
      let data = '';
      console.log('Status', res.statusCode);
      console.log('Headers', JSON.stringify(res.headers, null, 2));
      res.setEncoding('utf8');

      res.on('data', (chunk: string) => {
        console.log('chunk', chunk);
        data += chunk;
      });
      res.on('end', (chunk: string | undefined) => {
        console.log('No more data in response');
        if (chunk) data += chunk;
        console.log('data', data);
        setTimeout(() => {
          resolve(data);
        }, 0);
      });

    });
    req.on('error', (err) => {
      console.error('request fail with error: ', err.message);
      reject(err);
    });
    console.log('info', info);
    req.end(info);
  });

};
