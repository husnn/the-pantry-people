import {
  Charity,
  CharityRepository as ICharityRepository,
  CharityUser
} from '@tpp/core';
import { CharityUserRole } from '@tpp/shared';
import CharitySchema from '../schemas/CharitySchema';
import CharityUserSchema from '../schemas/CharityUserSchema';
import Repository from './Repository';

export class CharityRepository
  extends Repository<Charity>
  implements ICharityRepository
{
  constructor() {
    super(CharitySchema);
  }

  async create(item: Charity): Promise<Charity> {
    return this.db.manager.transaction(async (manager) => {
      const charity = await manager.getRepository(CharitySchema).save(item);
      await manager.getRepository(CharityUserSchema).save({
        userId: item.ownerId,
        charityId: charity.id,
        role: CharityUserRole.ADMIN
      });

      return charity;
    });
  }

  async listForUser(userId: number): Promise<Charity[]> {
    const rows: CharityUser[] = await this.db.manager
      .getRepository(CharityUserSchema)
      .find({ where: { userId }, relations: ['charity'] });

    return rows.map((r) => r.charity);
  }
}

export default CharityRepository;
