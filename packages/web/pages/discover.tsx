import {
  Button,
  Container,
  Grid,
  Box,
  CardContent,
  Card,
  Typography,
  Modal,
  styled,
  ListItem,
  List
} from '@mui/material';
import { useCallback, useState } from 'react';
import { signout } from '../modules/api/auth';
import useAuthentication from '../modules/auth/useAuthentication';

import ListItemCard from '../components/ListItemCard';

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

const Discover = () => {
  useAuthentication(true);
  const [open, setOpen] = useState(false);

  return (
    <Container disableGutters maxWidth="lg">
      <div>
        <Button onClick={signout}>Signout</Button>
      </div>

      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={3} columns={3}>
          <Grid item xs={1}>
            <Card
              variant="outlined"
              sx={{ minWidth: 250, my: 5, minHeight: 300 }}
            >
              <Grid
                container
                spacing={0}
                direction="column"
                alignItems="center"
              >
                <CardContent>
                  <Typography
                    sx={{ fontSize: 20, mx: 10, mb: 2 }}
                    color="text.secondary"
                    gutterBottom
                  >
                    LISTS IN THE AREA
                  </Typography>
                  {/* <ListItemCard
                    firstName={'Bob'}
                    lastName={'Hope'}
                    items={'thing'}
                  /> */}
                  <Button onClick={(e) => setOpen(true)}>
                    <Card variant="outlined" sx={{ minWidth: 275, my: 5 }}>
                      <CardContent>
                        <p>Bob Hope</p>
                        <p>5 items</p>
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
                        List #21
                      </Typography>
                      <List>
                        <ListItem>Bread</ListItem>
                        <ListItem>Milk</ListItem>
                        <ListItem>Sugar</ListItem>
                        <ListItem>Eggs</ListItem>
                        <ListItem>Nappies</ListItem>
                      </List>
                    </Box>
                  </Modal>
                </CardContent>
              </Grid>
            </Card>
          </Grid>
          <Grid item xs={1}>
            <Card
              variant="outlined"
              sx={{ minWidth: 250, my: 5, minHeight: 300 }}
            >
              <Grid
                container
                spacing={0}
                direction="column"
                alignItems="center"
              >
                <CardContent>
                  <Typography
                    sx={{ fontSize: 20, mx: 10, mb: 2 }}
                    color="text.secondary"
                    gutterBottom
                  >
                    IN PROGRESS
                  </Typography>
                </CardContent>
              </Grid>
            </Card>
          </Grid>
          <Grid item xs={1}>
            <Card
              variant="outlined"
              sx={{ minWidth: 250, my: 5, minHeight: 300 }}
            >
              <Grid
                container
                spacing={0}
                direction="column"
                alignItems="center"
              >
                <CardContent>
                  <Typography
                    sx={{ fontSize: 20, mx: 10, mb: 2 }}
                    color="text.secondary"
                    gutterBottom
                  >
                    AWAITING COLLECTION
                  </Typography>
                </CardContent>
              </Grid>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default Discover;
