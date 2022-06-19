import ListItemDTO from './ListItemDTO';
import { assignIfNotNull } from './utils';

export class ListDTO {
  id: number;
  name: string;
  items: ListItemDTO[];

  constructor(data: Partial<ListDTO>) {
    this.id = data.id;
    assignIfNotNull<ListItemDTO>(this, data.items, 'name');
    this.items = data.items?.map((i) => new ListItemDTO(i));
  }
}

export default ListDTO;
