export class CurrentUserDTO {
  id: number;
  email: string;

  constructor(data: Partial<CurrentUserDTO>) {
    this.id = data.id;
    this.email = data.email;
  }
}

export default CurrentUserDTO;
