export class ListItemDTO {
  id: number;
  label: string;
  quantity: number;

  constructor(data: Partial<ListItemDTO>) {
    this.id = data.id;
    this.label = data.label;
    this.quantity = data.quantity;
  }
}

export default ListItemDTO;
