import { User, UserRepository as IUserRepository } from '@feedelity/core';
import UserSchema from '../schemas/UserSchema';
import Repository from './Repository';

export class UserRepository
  extends Repository<User>
  implements IUserRepository
{
  constructor() {
    super(UserSchema);
  }

  findByEmail(
    email: string,
    opts: {
      select?: Array<keyof User>;
    }
  ): Promise<User> {
    const query = this.db
      .createQueryBuilder('user')
      .where('user.email = :email', { email });

    if (opts?.select) {
      query.addSelect(opts.select.map((property) => `user.${property}`));
    }

    return query.getOne();
  }
}

export default UserRepository;
