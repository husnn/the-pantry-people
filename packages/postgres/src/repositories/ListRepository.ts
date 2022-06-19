import { List, ListRepository as IListRepository } from '@tpp/core';
import { ID, ListState } from '@tpp/shared';
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
  async update(item: Partial<List> & { id: ID }): Promise<List> {
    return this.db.save(item).then(() => {
      return this.db.findOne({
        where: { id: item.id },
        relations: ['beneficiary', 'items']
      });
    });
  }

  listWithinArea(point: Point): Promise<List[]> {
    return this.db
      .createQueryBuilder('list')
      .leftJoinAndSelect('list.items', 'items')
      .where(`ST_Covers(list.area, ST_GeomFromGeoJSON(:point))`)
      .andWhere('list.status = :state', { state: ListState.CREATED })
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

  listByBeneficiary(userId: number): Promise<List[]> {
    return this.db
      .createQueryBuilder('list')
      .leftJoinAndSelect('list.items', 'items')
      .leftJoinAndSelect('list.charity', 'charity')
      .where('list.beneficiary_id = :userId', { userId })
      .orderBy('list.id', 'DESC')
      .getMany();
  }
}

export default ListRepository;
