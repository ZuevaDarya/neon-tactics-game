import { BASE_URL } from "../constants/api-constants";
import { TApiPaths } from "../types/services-types";

const checkRequest = async (res: Response) => {
  if (res.ok) {
    return await res.json();
  }

  return await res.json().then((error) => Promise.reject(`Ошибка: ${error.message}`));
};

const request = async (path: TApiPaths | string, options?: RequestInit) => {
  return await fetch(`${BASE_URL}${path}`, options).then(checkRequest);
};

export default request;
