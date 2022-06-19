import { ListItem } from '@tpp/core';
import { EntitySchema } from 'typeorm';

const ListItemSchema = new EntitySchema<ListItem>({
  name: 'list_items',
  columns: {
    id: {
      type: 'integer',
      primary: true,
      generated: 'increment'
    },
    listId: {
      type: 'integer',
      name: 'list_id'
    },
    name: {
      type: 'text'
    },
    quantity: {
      type: 'integer',
      default: 1
    },
    unavailable: {
      type: 'boolean',
      default: false
    }
  },
  relations: {
    list: {
      type: 'many-to-one',
      target: 'lists',
      joinColumn: {
        name: 'list_id',
        referencedColumnName: 'id'
      }
    }
  },
  indices: [
    {
      columns: ['listId']
    }
  ]
});

export default ListItemSchema;
