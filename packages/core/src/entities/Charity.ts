import { Address } from '@tpp/shared';
import { Point } from 'geojson';
import User from './User';

export class Charity {
  id: number;
  dateCreated: Date;
  owner: User;
  ownerId: number;
  name: string;
  address?: Address;
  coordinates?: Point;

  constructor(data: Partial<Charity>) {
    Object.assign(this, data);
  }
}

export default Charity;
