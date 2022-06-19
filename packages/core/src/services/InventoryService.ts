import { Item } from '@tpp/shared';
import items from './inventory.json';

export class InventoryService {
  items: {
    [id: number]: string;
  };
  itemList: Item[] = [];

  constructor() {
    this.items = items;

    for (const [k, v] of Object.entries(this.items)) {
      this.itemList.push({
        id: parseInt(k),
        label: v
      });
    }
  }

  getLabel(id: number): string {
    return this.items[id];
  }

  list(): Item[] {
    return this.itemList;
  }

  getForIds(ids: number[]): Item[] {
    return ids.map((i) => {
      return {
        id: i,
        label: this.getLabel(i)
      } as Item;
    });
  }

  validate(ids: number[]): boolean {
    for (const id of ids) {
      if (!this.items[id]) return false;
    }

    return true;
  }
}

export default InventoryService;
