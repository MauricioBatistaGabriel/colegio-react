import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

const PrivateRoute = ({ children }) => {
  const { authState } = useContext(AuthContext);

  return authState.isAuthenticated ? children : <Navigate to="/auth" />;
};

export default PrivateRoute;
