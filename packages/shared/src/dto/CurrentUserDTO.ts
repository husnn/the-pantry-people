import { UserRole } from '../enums';
import { Address } from '../types';
import { assignIfNotNull } from './utils';

export class CurrentUserDTO {
  id: number;
  role: UserRole;
  firstName?: string;
  lastName?: string;
  email: string;
  address: Address;

  constructor(data: Partial<CurrentUserDTO>) {
    this.id = data.id;
    this.role = data.role || UserRole.BENEFICIARY;
    assignIfNotNull<CurrentUserDTO>(this, data, 'firstName');
    assignIfNotNull<CurrentUserDTO>(this, data, 'lastName');
    this.email = data.email;
    assignIfNotNull<CurrentUserDTO>(this, data, 'address');
  }
}

export default CurrentUserDTO;
