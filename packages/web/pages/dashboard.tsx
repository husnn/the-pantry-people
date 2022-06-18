import { Button, Container, Grid, Box } from '@mui/material';
import { signout } from '../modules/api/auth';
import useAuthentication from '../modules/auth/useAuthentication';
import { Add } from '@mui/icons-material';
import NewList from '../components/NewList';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary
}));

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
            <Button
              // onClick={showNewList}
              variant="contained"
              color="success"
              startIcon={<Add />}
            >
              Make a new list request
            </Button>

            <NewList></NewList>
          </Grid>

          <Grid item xs>
            <Item>xs</Item>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default Dashboard;
