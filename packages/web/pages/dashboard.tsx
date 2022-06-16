import { Button } from '@mui/material';
import { signout } from '../modules/api/auth';
import useAuthentication from '../modules/auth/useAuthentication';

const Dashboard = () => {
  useAuthentication(true);
  return (
    <div>
      <Button onClick={signout}>Signout</Button>
    </div>
  );
};

export default Dashboard;
