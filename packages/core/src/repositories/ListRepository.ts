import { Point } from 'geojson';
import { List } from '../entities';
import Repository from './Repository';

export interface ListRepository extends Repository<List> {
  listWithinArea(coords: Point): Promise<List[]>;
  listByCharity(charityId: number): Promise<List[]>;
}

export default ListRepository;
