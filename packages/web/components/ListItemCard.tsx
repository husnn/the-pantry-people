import {
  Box,
  Button,
  Card,
  CardContent,
  List,
  ListItem,
  Modal,
  Typography
} from '@mui/material';
import { ID, Item } from '@tpp/shared';
import { useState } from 'react';
import { getSummaryForCharity } from '../modules/api/charity';

type ListItemCardProps = {
  items: Item[];
  id: Number;
};
const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4
};

export const ListItemCard = ({ items, id }: ListItemCardProps) => {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <Button onClick={(e) => setOpen(true)}>
        <Card variant="outlined" sx={{ minWidth: 275, my: 5 }}>
          <CardContent>
            <p>List #{id}</p>
            <p>{items.length} items</p>
            <Button>Select</Button>
          </CardContent>
        </Card>
      </Button>
      <Modal
        open={open}
        onClose={(e) => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Requested Items
          </Typography>
          <List>
            {items?.map((item: Item) => (
              <ListItem>{item.label}</ListItem>
            ))}
          </List>
        </Box>
      </Modal>
    </div>
  );
};

export default ListItemCard;
