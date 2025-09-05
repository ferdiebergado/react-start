const BASEURL = 'http://localhost:8888';

export interface APIResponse<T, E> {
  message: string;
  data?: T;
  error?: E;
}

const httpMethod = {
  get: 'GET',
  post: 'POST',
  put: 'PUT',
  patch: 'PATCH',
  delete: 'DELETE',
} as const;

type RequestData = object | unknown[];

interface RequestOpts {
  method: string;
  path: string;
  body?: RequestData;
  opts?: RequestInit;
}

interface HTTPClient {
  doRequest: (opts: RequestOpts) => Promise<Response>;
  get: (path: string, opts?: RequestInit) => Promise<Response>;
  post: (
    path: string,
    body: RequestData,
    opts?: RequestInit
  ) => Promise<Response>;
  put: (
    path: string,
    body: RequestData,
    opts?: RequestInit
  ) => Promise<Response>;
  patch: (
    path: string,
    body: RequestData,
    opts?: RequestInit
  ) => Promise<Response>;
  delete: (path: string, opts?: RequestInit) => Promise<Response>;
}

class APIClient implements HTTPClient {
  baseURL: string;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  async doRequest({
    method,
    path,
    body,
    opts,
  }: RequestOpts): Promise<Response> {
    if (!path.startsWith('/'))
      throw new Error('path should start with a slash');

    const url = this.baseURL + path;
    const req = new Request(url, opts);
    const newOpts: RequestInit = { method };
    const headers = new Headers(req.headers);

    const methodsWithBody = ['POST', 'PUT', 'PATCH'];
    if (methodsWithBody.includes(method)) {
      headers.set('Content-Type', 'application/json');
      newOpts.body = JSON.stringify(body);
    }

    newOpts.headers = headers;

    return fetch(req, newOpts);
  }

  async get(path: string, opts?: RequestInit) {
    return this.doRequest({ method: httpMethod.get, path, opts });
  }

  async post(path: string, body: RequestData, opts?: RequestInit) {
    return this.doRequest({ method: httpMethod.post, path, body, opts });
  }

  async put(path: string, body: RequestData, opts?: RequestInit) {
    return this.doRequest({ method: httpMethod.put, path, body, opts });
  }

  async patch(path: string, body: RequestData, opts?: RequestInit) {
    return this.doRequest({ method: httpMethod.patch, path, body, opts });
  }

  async delete(path: string, opts?: RequestInit) {
    return this.doRequest({ method: httpMethod.delete, path, opts });
  }
}

export const api = new APIClient(BASEURL);
