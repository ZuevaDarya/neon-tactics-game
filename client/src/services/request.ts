import { BASE_URL } from "../constants/api-constants";
import { TApiPaths } from "../types/services-types";

const checkRequest = async (res: Response) => {
    if (res.ok) {

    if (res.status === 204) {
      return undefined;
    }

    try {
      return await res.json();
    } catch {
      return undefined;
    }
  }

  try {
    const error = await res.json();
    return Promise.reject(error.message || `Ошибка: ${res.statusText}`);
  } catch {
    return Promise.reject(`Ошибка: ${res.statusText}`);
  }
};

const request = async (path: TApiPaths | string, options?: RequestInit) => {
  return await fetch(`${BASE_URL}${path}`, options).then(checkRequest);
};

export default request;
