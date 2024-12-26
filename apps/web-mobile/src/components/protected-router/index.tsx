import { useAuth0 } from '@auth0/auth0-react';

import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoutes = () => {
  const { isAuthenticated } = useAuth0();

  return isAuthenticated ? <Outlet /> : <Navigate to="/" replace />;
};

export default ProtectedRoutes;
