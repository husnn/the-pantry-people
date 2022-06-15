import useAuthentication from '../modules/auth/useAuthentication';

const Dashboard = () => {
  useAuthentication(true);
};

export default Dashboard;
