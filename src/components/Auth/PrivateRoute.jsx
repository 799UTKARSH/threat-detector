import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const PrivateRoute = ({ children }) => {
  const { currentUser } = useAuth();
  const token = localStorage.getItem('token');
  // return token ? children : <Navigate to="/login" replace />;
  return currentUser ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;