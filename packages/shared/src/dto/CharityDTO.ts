export class CharityDTO {
  id: number;
  name: string;

  constructor(data: Partial<CharityDTO>) {
    this.id = data.id;
    this.name = data.name;
  }
}

export default CharityDTO;
