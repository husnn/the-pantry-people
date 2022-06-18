import { Button, Container } from '@mui/material';
import { signout } from '../modules/api/auth';
import useAuthentication from '../modules/auth/useAuthentication';

const Dashboard = () => {
  useAuthentication(true);
  return (
    <Container disableGutters>
      <div>
        <Button onClick={signout}>Signout</Button>
      </div>
    </Container>
  );
};

export default Dashboard;
