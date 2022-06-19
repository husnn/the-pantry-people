import { ListState } from '../enums';
import CharityDTO from './CharityDTO';
import ListItemDTO from './ListItemDTO';
import { assignIfNotNull } from './utils';

export class ListDTO {
  id: number;
  dateCreated: Date;
  name: string;
  status: ListState;
  items: ListItemDTO[];
  charity?: CharityDTO;

  constructor(data: Partial<ListDTO>) {
    this.id = data.id;
    this.dateCreated = data.dateCreated;
    this.status = data.status;
    assignIfNotNull<ListDTO>(this, data, 'name');
    this.items = data.items?.map((i) => new ListItemDTO(i));
    if (data.charity) this.charity = new CharityDTO(data.charity);
  }
}

export default ListDTO;
