import { ListState } from '@tpp/shared';
import { Polygon } from 'geojson';
import Charity from './Charity';
import { ListItem } from './ListItem';
import User from './User';

export class List {
  id: number;
  dateCreated: Date;

  beneficiaryId: number;
  beneficiary?: User;

  charityId?: number;
  charity?: Charity;

  status: ListState;
  dateFulfilled?: Date;

  items: ListItem[];

  name?: string;
  area: Polygon;

  constructor(data: Partial<List>) {
    Object.assign(this, data);
  }
}
