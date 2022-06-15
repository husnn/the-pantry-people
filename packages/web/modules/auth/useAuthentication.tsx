import React, { useEffect } from 'react';
import { dashboardUrl, loginUrl } from '../../utils/links';
import { AuthContext } from './AuthProvider';
import { shouldUnauthenticate } from './utils';

const useAuthentication = (protectedRoute = false, redirect = false) => {
  const context = React.useContext(AuthContext);

  useEffect(() => {
    if (!context.isAuthenticated && shouldUnauthenticate()) {
      if (protectedRoute) context.redirect(loginUrl);
    } else {
      if (redirect) context.redirect(dashboardUrl);
    }
  }, [context, protectedRoute, redirect]);

  return context;
};

export default useAuthentication;
