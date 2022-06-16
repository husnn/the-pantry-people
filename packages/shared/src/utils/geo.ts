import GeoJSON, { Feature, Point } from 'geojson';
import { Coordinates } from '../types';

export const coordinatesToPoint = (coords: Coordinates): Point =>
  (
    (GeoJSON as any).parse(coords, {
      Point: ['lat', 'long']
    }) as Feature<Point>
  ).geometry;
