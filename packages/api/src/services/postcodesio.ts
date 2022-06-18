import { Coordinates } from '@tpp/shared';

export const parsePostcodesCoordinates = (entry: any): Coordinates => {
  return {
    lat: entry.result['latitude'],
    lon: entry.result['longitude']
  } as Coordinates;
};
