import { Address } from '../types';

export class CharityDTO {
  id: number;
  name: string;
  address?: Address;

  constructor(data: Partial<CharityDTO>) {
    this.id = data.id;
    this.name = data.name;
    this.address = data.address;
  }
}

export default CharityDTO;
