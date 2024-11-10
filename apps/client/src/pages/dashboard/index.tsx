import { withAuthenticationRequired } from '@auth0/auth0-react';

import DashboardScreen from '@/modules/dashboard/screens/main';

function Dashboard() {
  return <DashboardScreen />;
}

export default withAuthenticationRequired(Dashboard);
