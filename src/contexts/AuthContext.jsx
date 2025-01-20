import React, { createContext, useState, useContext, useEffect } from 'react';
import AuthService from '../Service/AuthService';  // Assuming AuthService handles your login API logic

// Create a Context for authentication
const AuthContext = createContext();

// Custom hook to access the authentication context
export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState(null); // Initialize userRole state

  // Check if user is logged in on mount
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
    if (token) {
      const userInfo = AuthService.getUserInfo();
      setUserRole(userInfo?.role); // Set the user's role from the token
    }
  }, []);

  // Function to set login state
  const login = async (credentials) => {
    const data = await AuthService.login(credentials);
    setIsLoggedIn(true);
    setUserRole(data.role); // Set the user's role after login
    return data;
  };

  // Function to set logout state
  const logout = () => {
    AuthService.logout(); // Assuming this clears the token from localStorage
    setIsLoggedIn(false);
    setUserRole(null);
    localStorage.removeItem("token"); // Ensure token is removed on logout
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, userRole, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
