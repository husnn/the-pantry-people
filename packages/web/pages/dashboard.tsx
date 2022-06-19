import { UserRole } from '@tpp/shared';
import BeneficiaryDashboard from '../components/BeneficiaryDashboard';
import CharityDashboard from '../components/CharityDashboard';
import useAuthentication from '../modules/auth/useAuthentication';

const Dashboard = () => {
  const { currentUser } = useAuthentication(true);

  return currentUser?.role == UserRole.ADMIN ? (
    <CharityDashboard />
  ) : (
    <BeneficiaryDashboard />
  );
};

export default Dashboard;
