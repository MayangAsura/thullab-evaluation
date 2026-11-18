// src/components/auth/PrivateRoute.jsx
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from './AuthProvider';

const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  if (isAuthenticated) {
    // Redirect to login but save the attempted URL
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default PrivateRoute;

// src/components/auth/PrivateRoute.jsx
// import React from 'react';
// import { Navigate } from 'react-router-dom';
// import { useIsAuthenticated } from 'react-auth-kit';

// export default function PrivateRoute ({ children }) {
//   const isAuthenticated = useIsAuthenticated();

//   if (!isAuthenticated()) {
//     return <Navigate to="/login" replace />;
//   }

//   return children;
// };

// export default PrivateRoute;