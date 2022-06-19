import { ListState } from '../enums';
import ListItemDTO from './ListItemDTO';
import { assignIfNotNull } from './utils';

export class ListDTO {
  id: number;
  name: string;
  status: ListState;
  items: ListItemDTO[];

  constructor(data: Partial<ListDTO>) {
    this.id = data.id;
    this.status = data.status;
    assignIfNotNull<ListDTO>(this, data, 'name');
    this.items = data.items?.map((i) => new ListItemDTO(i));
  }
}

export default ListDTO;
