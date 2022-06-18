import { Result, User, UserRepository as IUserRepository } from '@tpp/core';
import { Address, coordinatesToPoint } from '@tpp/shared';
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

  async setAddress(userId: number, address: Address): Promise<Result<User>> {
    try {
      await this.db
        .createQueryBuilder('user')
        .update({
          address,
          coordinates: address.coordinates
            ? coordinatesToPoint(address.coordinates)
            : undefined
        } as any)
        .where({ id: userId })
        .execute();

      const user = await this.get(userId);

      return Result.ok(user);
    } catch (err) {
      return Result.fail(err);
    }
  }
}

export default UserRepository;
