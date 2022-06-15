import { ID } from '@tpp/shared';

export interface Repository<T> {
  get(id: ID): Promise<T>;
  getBatch(ids: Array<ID>): Promise<T[]>;
  create(item: Partial<T>): Promise<T>;
  update(item: Partial<T> & { id: ID }): Promise<T>;
  remove(item: T): Promise<T>;
}

export default Repository;
