import { List } from '@tpp/core';
import { ListState } from '@tpp/shared';
import { EntitySchema } from 'typeorm';

const ListSchema = new EntitySchema<List>({
  name: 'lists',
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
    beneficiaryId: {
      type: 'integer',
      name: 'beneficiary_id'
    },
    charityId: {
      type: 'integer',
      name: 'charity_id',
      nullable: true
    },
    status: {
      type: 'enum',
      enum: ListState,
      default: ListState.CREATED
    },
    dateFulfilled: {
      type: 'timestamp',
      name: 'date_fulfilled',
      nullable: true
    },
    name: {
      type: 'text',
      nullable: true
    },
    area: {
      type: 'geography',
      spatialFeatureType: 'Polygon',
      srid: 4326
    }
  },
  relations: {
    beneficiary: {
      type: 'many-to-one',
      target: 'users',
      joinColumn: {
        name: 'beneficiary_id',
        referencedColumnName: 'id'
      }
    },
    charity: {
      type: 'many-to-one',
      target: 'charities',
      joinColumn: {
        name: 'charity_id',
        referencedColumnName: 'id'
      },
      nullable: true
    },
    items: {
      type: 'one-to-many',
      target: 'list_items',
      inverseSide: 'list',
      cascade: true
    }
  },
  indices: [
    {
      columns: ['area'],
      spatial: true
    }
  ]
});

export default ListSchema;
