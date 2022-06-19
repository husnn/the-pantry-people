import {
  Button,
  Container,
  Grid,
  Box,
  CardContent,
  Card,
  Typography
} from '@mui/material';
import { signout } from '../modules/api/auth';
import useAuthentication from '../modules/auth/useAuthentication';
import NewList from '../components/NewList';
import ListHistory from '../components/ListHistory';

const Dashboard = () => {
  useAuthentication(true);

  return (
    <Container disableGutters maxWidth="md">
      <div>
        <Button onClick={signout}>Signout</Button>
      </div>

      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={3}>
          <Grid item xs>
            <NewList></NewList>
          </Grid>

          <Grid item xs>
            <Card variant="outlined" sx={{ minWidth: 275, my: 5 }}>
              <Grid
                container
                spacing={0}
                direction="column"
                alignItems="center"
                justifyContent="center"
                // style={{ minHeight: '10vh' }}
              >
                <CardContent>
                  <Typography
                    sx={{ fontSize: 20, mx: 10, mb: 2 }}
                    color="text.secondary"
                    gutterBottom
                  >
                    Your List History
                  </Typography>
                  <ListHistory />
                </CardContent>
              </Grid>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default Dashboard;
