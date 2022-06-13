export class UserDTO {
  id: string;

  constructor(data: Partial<UserDTO>) {
    this.id = data.id;
  }
}

export default UserDTO;
