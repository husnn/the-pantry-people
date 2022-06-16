import { Repository as IRepository } from '@tpp/core';
import { ID } from '@tpp/shared';
import { EntitySchema, In, Repository as PostgresRepository } from 'typeorm';
import { dataSource } from '..';

export abstract class Repository<T extends { id: ID }>
  implements IRepository<T>
{
  db: PostgresRepository<any>;

  constructor(schema: EntitySchema) {
    this.db = dataSource.getRepository(schema);
  }

  get(id: ID): Promise<T | undefined> {
    return this.db.findOneBy({ id });
  }

  getBatch(ids: ID[]): Promise<T[]> {
    return this.db.findBy({ id: In(ids) });
  }

  create(item: Partial<T>): Promise<T> {
    return this.db.save(item);
  }

  update(item: Partial<T> & { id: ID }): Promise<T> {
    return this.db.save(item);
  }

  remove(item: Partial<T>): Promise<T> {
    return this.db.remove(item);
  }
}

export default Repository;
