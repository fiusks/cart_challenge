import { HttpClient } from '../domain';

const baseURL = 'http://localhost:3333/';

export const fetchHttpClient: HttpClient = async (url, init) => {
  const _url = url instanceof URL ? url : new URL(url, baseURL);
  const headers = new Headers(init?.headers);

  if (!headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json');
  }

  const response = await fetch(_url, { ...init, headers });

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return response;
};
