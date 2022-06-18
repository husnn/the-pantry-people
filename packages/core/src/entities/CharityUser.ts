import { CharityUserRole } from '@tpp/shared';
import Charity from './Charity';
import User from './User';

export class CharityUser {
  id: number;

  userId: number;
  user?: User;

  charityId: number;
  charity?: Charity;

  role: CharityUserRole;

  constructor(data: Partial<CharityUser>) {
    Object.assign(this, data);
  }
}

export default CharityUser;
