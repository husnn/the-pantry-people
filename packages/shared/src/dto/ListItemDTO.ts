export class ListItemDTO {
  id: number;
  name: string;
  quantity: number;

  constructor(data: Partial<ListItemDTO>) {
    this.id = data.id;
    this.name = data.name;
    this.quantity = data.quantity;
  }
}

export default ListItemDTO;
