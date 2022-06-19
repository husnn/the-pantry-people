import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  List,
  ListItem,
  Modal,
  Typography
} from '@mui/material';
import { AssignedListDTO, Item, ListDTO, ListState } from '@tpp/shared';
import { useCallback, useState } from 'react';
import { closeList, fulfillList, pickupList } from '../modules/api/list';

type ListItemCardProps = {
  list: ListDTO | AssignedListDTO;
  update: (list: AssignedListDTO) => void;
};

export const ListItemCard = ({ list, update }: ListItemCardProps) => {
  const [open, setOpen] = useState(false);

  const name =
    list.name || (list as AssignedListDTO).beneficiary?.firstName
      ? `${(list as AssignedListDTO).beneficiary.firstName}'s List`
      : `List #${list.id}`;

  const pickup = useCallback(
    () => pickupList(list.id).then((res) => update(res.list)),
    [list, update]
  );

  const complete = useCallback(
    () => fulfillList(list.id).then((res) => update(res.list)),
    [list, update]
  );

  const close = useCallback(
    () => closeList(list.id).then((res) => update(res.list)),
    [list, update]
  );

  return (
    <div>
      <Card sx={{ my: 1 }} onClick={() => setOpen(true)}>
        <CardActionArea sx={{ p: 1 }}>
          <CardContent>
            <h3>{name}</h3>
            <p>{list.items?.length} items</p>
          </CardContent>
        </CardActionArea>
      </Card>
      <Modal open={open} onClose={() => setOpen(false)}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            p: 4,
            borderRadius: 4
          }}
        >
          <h2 style={{ marginBottom: 2 }}>{name}</h2>
          <Typography fontSize={14}>
            Requested on{' '}
            {new Date(list.dateCreated).toLocaleDateString('en-GB')}
          </Typography>
          <List sx={{ mt: 1 }}>
            {list.items?.map((item: Item) => (
              <ListItem key={item.id}>{item.label}</ListItem>
            ))}
          </List>
          <Box sx={{ width: 1, mt: 2 }}>
            {list.status == ListState.CREATED && (
              <Button
                sx={{ width: 1, mt: 1 }}
                variant="contained"
                onClick={pickup}
              >
                Pick up
              </Button>
            )}
            {list.status == ListState.PROCESSING && (
              <Button
                sx={{ width: 1, mt: 1 }}
                variant="contained"
                onClick={complete}
              >
                Ready for collection
              </Button>
            )}
            {(list.status == ListState.FULFILLED ||
              list.status == ListState.PARTLY_FULFILLED) && (
              <Button
                sx={{ width: 1, mt: 1 }}
                variant="contained"
                onClick={close}
              >
                Mark complete
              </Button>
            )}
          </Box>
        </Box>
      </Modal>
    </div>
  );
};

export default ListItemCard;
