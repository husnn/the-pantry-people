import { List } from './List';

export class ListItem {
  id: number;

  listId: number;
  list: List;

  label: string;
  quantity: number;

  unavailable?: boolean;

  constructor(data: Partial<ListItem>) {
    Object.assign(this, data);
  }
}
