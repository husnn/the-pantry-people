import { CharityUser } from '@tpp/core';
import { CharityUserRole } from '@tpp/shared';
import { EntitySchema } from 'typeorm';

const CharityUserSchema = new EntitySchema<CharityUser>({
  name: 'charity_users',
  columns: {
    id: {
      type: 'integer',
      generated: 'increment',
      primary: true
    },
    charityId: {
      type: 'integer',
      name: 'charity_id'
    },
    userId: {
      type: 'integer',
      name: 'user_id'
    },
    role: {
      type: 'enum',
      enum: CharityUserRole
    }
  },
  relations: {
    charity: {
      type: 'many-to-one',
      target: 'charities',
      joinColumn: {
        name: 'charity_id',
        referencedColumnName: 'id'
      }
    },
    user: {
      type: 'many-to-one',
      target: 'users',
      joinColumn: {
        name: 'user_id',
        referencedColumnName: 'id'
      }
    }
  },
  indices: [
    {
      columns: ['userId', 'charityId'],
      unique: true
    }
  ]
});

export default CharityUserSchema;
