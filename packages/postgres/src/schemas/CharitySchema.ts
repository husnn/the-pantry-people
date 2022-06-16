import { Charity } from '@tpp/core';
import { EntitySchema } from 'typeorm';

const CharitySchema = new EntitySchema<Charity>({
  name: 'charities',
  columns: {
    id: {
      type: 'integer',
      primary: true,
      generated: 'increment'
    },
    dateCreated: {
      type: 'timestamp',
      name: 'date_created',
      createDate: true
    },
    ownerId: {
      type: 'integer',
      name: 'owner_id'
    },
    name: {
      type: 'text'
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
    }
  },
  relations: {
    owner: {
      type: 'many-to-one',
      target: 'users',
      joinColumn: {
        name: 'owner_id',
        referencedColumnName: 'id'
      }
    }
  },
  indices: [
    {
      columns: ['coordinates'],
      spatial: true
    },
    {
      columns: ['ownerId']
    }
  ]
});

export default CharitySchema;
