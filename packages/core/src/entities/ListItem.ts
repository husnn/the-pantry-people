import { List } from './List';

export class ListItem {
  id: number;

  listId: number;
  list: List;

  name: string;
  quantity: number;

  unavailable?: boolean;

  constructor(data: Partial<ListItem>) {
    Object.assign(this, data);
  }
}
