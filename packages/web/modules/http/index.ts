import AxiosClient from './AxiosClient';
import HttpClient from './HttpClient';

let instance: HttpClient | undefined;

export const ApiClient = () => {
  if (!instance) {
    instance = new AxiosClient();
    return instance;
  }

  return instance;
};
