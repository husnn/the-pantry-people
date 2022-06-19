import { Button, Card, CardContent } from '@mui/material';

type ListItemCardProps = {
  firstName: string;
  lastName: string;
  items: string;
};

export const ListItemCard = ({
  firstName,
  lastName,
  items
}: ListItemCardProps) => {
  return (
    <div>
      <Card variant="outlined" sx={{ minWidth: 275, my: 5 }}>
        <CardContent>
          <p>
            {firstName} {lastName}
          </p>
          <p>{items.length} items</p>
          <Button>Select</Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default ListItemCard;

{
  /* <Button onClick={(e) => setOpen(true)}>
                    <Card variant="outlined" sx={{ minWidth: 275, my: 5 }}>
                      <CardContent>
                        <p> {firstName} {lastName}</p>
                        <p>{items.length} items</p>
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
                      <Typography
                        id="modal-modal-title"
                        variant="h6"
                        component="h2"
                      >
                        List #{id}
                      </Typography>
                      <List>
                        <ListItem>Bread</ListItem>
                        <ListItem>Milk</ListItem>
                        <ListItem>Sugar</ListItem>
                        <ListItem>Eggs</ListItem>
                        <ListItem>Nappies</ListItem>
                      </List>
                    </Box>
                  </Modal> */
}
