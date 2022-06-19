import {
  Button,
  Container,
  Grid,
  Box,
  CardContent,
  Card,
  Typography
} from '@mui/material';
import { useEffect, useState } from 'react';
import { signout } from '../modules/api/auth';
import useAuthentication from '../modules/auth/useAuthentication';

import ListItemCard from '../components/ListItemCard';
import { getSummaryForCharity } from '../modules/api/charity';
import { ListDTO } from '@tpp/shared';

const Discover = () => {
  useAuthentication(true);

  const [summary, setSummary] = useState<any>({
    available: [],
    processing: [],
    completed: []
  });

  useEffect(() => {
    getSummaryForCharity().then(setSummary);
  }, []);

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
                  {summary?.available.map((list: ListDTO) => (
                    <ListItemCard items={list.items} id={list.id} />
                  ))}
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
                  {summary?.processing.map((list: ListDTO) => (
                    <ListItemCard items={list.items} id={list.id} />
                  ))}
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
                  {summary?.completed.map((list: ListDTO) => (
                    <ListItemCard items={list.items} id={list.id} />
                  ))}
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
