import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

import Chip from '@mui/material/Chip';
import { ListDTO } from '@tpp/shared';
import { useEffect, useState } from 'react';
import { getOwnLists } from '../modules/api/list';

const ListHistory = ({ lists }: { lists: ListDTO[] }) => {
  return (
    <div>
      {lists.map(({ id, items, status, charity }) => (
        <Card key={id} sx={{ minWidth: 275, my: 2 }}>
          <CardContent>
            <p>List #{id}</p>
            {charity && <p>Food bank: {charity.name}</p>}
            <p>{items.length} items</p>
            <Chip label={status} />
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ListHistory;
