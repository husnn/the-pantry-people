import { Box, Button, Container } from '@mui/material';
import * as React from 'react';

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { neededItems } from '../utils/neededItems';

const NewList = () => {
  return (
    <Card sx={{ minWidth: 275, my: 5 }}>
      <CardContent>
        <Typography
          sx={{ fontSize: 14, mx: 10, mb: 2 }}
          color="text.secondary"
          gutterBottom
        >
          Pick your items
        </Typography>
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={neededItems}
          sx={{ width: 300, mx: 10 }}
          renderInput={(params) => <TextField {...params} label="Items" />}
        />
      </CardContent>
      <CardActions>
        <Button
          variant="contained"
          color="success"
          size="small"
          sx={{ minWidth: 275, mx: 10 }}
        >
          Submit List
        </Button>
      </CardActions>
    </Card>
  );
};

export default NewList;
