import { withAuthenticationRequired } from '@auth0/auth0-react';

import ProfileScreen from '@/modules/settings/screens/profile';

function Profile() {
  return <ProfileScreen />;
}

export default withAuthenticationRequired(Profile);
