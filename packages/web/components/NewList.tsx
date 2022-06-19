import { Button, Grid } from '@mui/material';

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Checkbox from '@mui/material/Checkbox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { SetStateAction, useEffect, useState } from 'react';
import { Item } from '@tpp/shared';
import { createList } from '../modules/api/list';
import { getInventory } from '../modules/api/inventory';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const NewList = () => {
  const [list, setList] = useState<Item[]>([]);
  const [inventory, setInventory] = useState<Item[]>([]);

  useEffect(() => {
    getInventory().then(setInventory);
  }, []);

  const handleChange = (_event: any, value: SetStateAction<Item[]>) =>
    setList(value);
  const handleSubmit = () => {
    createList(list);
  };

  return (
    <Card variant="outlined" sx={{ minWidth: 275, my: 5 }}>
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
      >
        <CardContent>
          <Typography
            sx={{ fontSize: 20, mb: 2 }}
            color="text.secondary"
            gutterBottom
          >
            Make a new list request
          </Typography>

          <Autocomplete
            multiple
            id="checkboxes-tags-demo"
            options={inventory}
            disableCloseOnSelect
            getOptionLabel={(option) => option.label!!}
            renderOption={(props, option, { selected }) => (
              <li {...props} key={option.id}>
                <Checkbox
                  icon={icon}
                  checkedIcon={checkedIcon}
                  style={{ marginRight: 8 }}
                  checked={selected}
                />
                {option.label}
              </li>
            )}
            renderInput={(params) => <TextField {...params} label="Items" />}
            onChange={handleChange}
          />
        </CardContent>
        <CardActions>
          <Button
            onClick={handleSubmit}
            variant="contained"
            color="success"
            size="large"
            sx={{ minWidth: 275, mb: 2 }}
          >
            Submit List
          </Button>
        </CardActions>
      </Grid>
    </Card>
  );
};

export default NewList;
