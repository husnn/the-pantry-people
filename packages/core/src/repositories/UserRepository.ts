import { Address } from '@tpp/shared';
import { Result } from '../base';
import { User } from '../entities';
import Repository from './Repository';

export interface UserRepository extends Repository<User> {
  findByEmail(
    email: string,
    opts?: { select: Array<keyof User> }
  ): Promise<User>;

  setAddress(userId: number, address: Partial<Address>): Promise<Result<User>>;
}

export default UserRepository;
