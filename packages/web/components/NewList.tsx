import { Button, Grid } from '@mui/material';

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { neededItems } from '../utils/neededItems';

import Checkbox from '@mui/material/Checkbox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { SetStateAction, useState } from 'react';
import { ListItemDTO } from '@tpp/shared';
import { createList } from '../modules/api/list';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const NewList = () => {
  const [list, setList] = useState<ListItemDTO[]>([]);
  const handleChange = (_event: any, value: SetStateAction<ListItemDTO[]>) =>
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
            options={neededItems}
            disableCloseOnSelect
            getOptionLabel={(option) => option}
            renderOption={(props, option, { selected }) => (
              <li {...props}>
                <Checkbox
                  icon={icon}
                  checkedIcon={checkedIcon}
                  style={{ marginRight: 8 }}
                  checked={selected}
                />
                {option}
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
