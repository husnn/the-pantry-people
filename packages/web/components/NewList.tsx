import { Button, Grid } from '@mui/material';

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { neededItems } from '../utils/neededItems';

import * as React from 'react';
import Checkbox from '@mui/material/Checkbox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { useState } from 'react';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const NewList = () => {
  const [list, setList] = useState<string[]>([]);
  const handleChange = (_event: any, value: React.SetStateAction<any[]>) =>
    setList(value);
  const handleSubmit = () => console.log(list);

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
