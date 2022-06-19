import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

import Chip from '@mui/material/Chip';
import * as React from 'react';
import { useState } from 'react';

const ListHistory = () => {
  const dummyData = [
    {
      listNum: '20',
      length: '3',
      location: 'Islington',
      items: ['Bread', 'Milk', 'Cheese'],
      status: 'Pick Up'
    },
    {
      listNum: '21',
      length: '4',
      location: 'London',
      items: ['Nappies', 'Milk', 'Eggs', 'Wipes'],
      status: 'Pending'
    }
  ];

  return (
    <div>
      {dummyData.map(({ listNum, length, location, items, status }) => (
        <Card variant="outlined" sx={{ minWidth: 275, my: 5 }}>
          <CardContent>
            <p>List #{listNum}</p>
            <p>{length} items</p>
            <p>Location: {location}</p>

            <Chip label={status} />
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ListHistory;
