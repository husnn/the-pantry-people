export class UserDTO {
  id: number;

  constructor(data: Partial<UserDTO>) {
    this.id = data.id;
  }
}

export default UserDTO;
