import AxiosClient from './AxiosClient';
import HttpClient from './HttpClient';

let instance: HttpClient | undefined;

export const ApiClient = (
  url = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/v1'
) => {
  if (!instance) {
    instance = new AxiosClient(url);
    return instance;
  }

  return instance;
};
