import { Button, Box } from '@mui/material';
import Bar from '../components/Header';
import { signout } from '../modules/api/auth';
import useAuthentication from '../modules/auth/useAuthentication';

const Dashboard = () => {
  useAuthentication(true);
  return (
    <Box>
      <Bar></Bar>
      <div>
        <Button onClick={signout}>Signout</Button>
      </div>
    </Box>
  );
};

export default Dashboard;
