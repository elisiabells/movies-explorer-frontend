import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ component: Component, loggedIn, isCheckingToken, ...props }) => {
  if (isCheckingToken) return null;  // или отображение компонента загрузки
  return loggedIn ? <Component {...props} /> : <Navigate to='/sign-in' replace />;
};
export default ProtectedRoute;