import { User } from '@tpp/core';
import { EntitySchema } from 'typeorm';

const UserSchema = new EntitySchema<User>({
  name: 'users',
  columns: {
    id: {
      type: 'integer',
      primary: true
    },
    dateCreated: {
      type: 'timestamp',
      name: 'date_created',
      createDate: true
    },
    email: {
      type: 'text',
      name: 'email',
      unique: true
    },
    password: {
      type: 'text',
      name: 'password',
      select: false
    },
    lastLogin: {
      type: 'timestamp',
      name: 'last_login',
      nullable: true
    },
    lastLoginIP: {
      type: 'text',
      name: 'last_login_ip',
      nullable: true
    },
    address: {
      type: 'jsonb',
      nullable: true
    },
    coordinates: {
      type: 'geography',
      spatialFeatureType: 'Point',
      srid: 4326,
      nullable: true
    },
    preferences: {
      type: 'simple-json',
      nullable: true
    }
  }
});

export default UserSchema;
