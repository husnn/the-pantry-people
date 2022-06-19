import { Box, Button, Grid } from '@mui/material';

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Checkbox from '@mui/material/Checkbox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { SetStateAction, useCallback, useEffect, useState } from 'react';
import { Item, ListDTO } from '@tpp/shared';
import { createList } from '../modules/api/list';
import { getInventory } from '../modules/api/inventory';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const NewList = ({ onCreate }: { onCreate: (list: ListDTO) => void }) => {
  const [items, setItems] = useState<Item[]>([]);
  const [inventory, setInventory] = useState<Item[]>([]);

  useEffect(() => {
    getInventory().then(setInventory);
  }, []);

  const handleChange = (_event: object, value: SetStateAction<Item[]>) =>
    setItems(value);

  const handleSubmit = useCallback(() => {
    createList(items).then((res) => {
      onCreate(res.list);
      setItems([]);
    });
  }, [items, setItems, onCreate]);

  return (
    <Box
      sx={{ minWidth: 275, my: 5, display: 'flex', flexDirection: 'column' }}
    >
      <Typography
        sx={{ fontSize: 20, mb: 2 }}
        color="text.secondary"
        gutterBottom
      >
        Make a new list request
      </Typography>

      <Autocomplete
        multiple
        value={items}
        id="items-list"
        options={inventory}
        disableCloseOnSelect
        loading={inventory.length < 1}
        getOptionLabel={(option) => option.label}
        renderOption={(props, option, { selected }) => (
          <li {...props}>
            <Checkbox
              icon={icon}
              checkedIcon={checkedIcon}
              style={{ marginRight: 8 }}
              checked={selected}
            />
            {option.label}
          </li>
        )}
        renderInput={(params) => (
          <TextField {...params} label="Select which items you need" />
        )}
        onChange={handleChange}
      />
      <Button
        onClick={handleSubmit}
        variant="contained"
        color="success"
        size="large"
        sx={{ minWidth: 275, my: 2 }}
      >
        Submit List
      </Button>
    </Box>
  );
};

export default NewList;
