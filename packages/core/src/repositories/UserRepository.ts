import { User } from '../entities';
import Repository from './Repository';

export interface UserRepository extends Repository<User> {
  findByEmail(
    email: string,
    opts?: { select: Array<keyof User> }
  ): Promise<User>;
}

export default UserRepository;
