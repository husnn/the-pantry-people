import { Address } from '../types';

export class CurrentUserDTO {
  id: number;
  email: string;
  address: Address;

  constructor(data: Partial<CurrentUserDTO>) {
    this.id = data.id;
    this.email = data.email;
    this.address = data.address;
  }
}

export default CurrentUserDTO;
