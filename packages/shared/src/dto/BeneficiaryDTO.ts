import { Address } from '../types';
import UserDTO from './UserDTO';
import { assignIfNotNull } from './utils';

export class BeneficiaryDTO extends UserDTO {
  firstName?: string;
  lastName?: string;
  address?: Address;

  constructor(data: Partial<BeneficiaryDTO>) {
    super(data);
    assignIfNotNull<BeneficiaryDTO>(this, data, 'firstName');
    assignIfNotNull<BeneficiaryDTO>(this, data, 'lastName');
    assignIfNotNull<BeneficiaryDTO>(this, data, 'address');
  }
}

export default BeneficiaryDTO;
