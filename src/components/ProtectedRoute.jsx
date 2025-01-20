import React from "react";
import { Navigate } from "react-router-dom";
import AuthService from "../Service/AuthService";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const token = AuthService.getToken();
  const userRole = AuthService.getRole();
  const userInfo = AuthService.getUserInfo();

  // Redirect to login if no token or user role is invalid
  if (!token || !allowedRoles.includes(userRole)) {
    return <Navigate to="/login" />;
  }

  // Check for token expiration
  const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
  if (userInfo && userInfo.exp && userInfo.exp < currentTime) {
    AuthService.logout(); // Clear expired session
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;
