import { Address } from '@tpp/shared';
import bcrypt from 'bcryptjs';
import { Point } from 'geojson';

export class User {
  id: number;
  dateCreated: Date;
  email: string;
  password: string;
  lastLogin?: Date;
  lastLoginIP?: string;
  address?: Address;
  coordinates?: Point;
  preferences?: object;

  constructor(data: Partial<User>) {
    Object.assign(this, data);
  }

  static async hashPassword(password: string) {
    return bcrypt.hash(password, 10 || process.env.PASSWORD_SALT_ROUNDS);
  }

  static async verifyPassword(provided: string, actual: string) {
    return bcrypt.compare(provided, actual);
  }
}

export default User;
