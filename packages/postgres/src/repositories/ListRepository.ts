import { List, ListRepository as IListRepository } from '@tpp/core';
import { Point } from 'geojson';
import ListSchema from '../schemas/ListSchema';
import Repository from './Repository';

export class ListRepository
  extends Repository<List>
  implements IListRepository
{
  constructor() {
    super(ListSchema);
  }

  listWithinArea(point: Point): Promise<List[]> {
    return this.db
      .createQueryBuilder('list')
      .leftJoinAndSelect('list.items', 'items')
      .where(`ST_Covers(list.area, ST_GeomFromGeoJSON(:point))`)
      .setParameter('point', JSON.stringify(point))
      .getMany();
  }

  listByCharity(charityId: number): Promise<List[]> {
    return this.db
      .createQueryBuilder('list')
      .leftJoinAndSelect('list.items', 'items')
      .leftJoinAndSelect('list.beneficiary', 'beneficiary')
      .where('list.charity_id = :charityId', { charityId })
      .getMany();
  }
}

export default ListRepository;
