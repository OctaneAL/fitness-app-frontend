import React, { createContext, useState, useContext, useEffect } from 'react';
import { apiRequest } from './api';

export async function login(username, password, setAuthState) {
  try {
      const { token } = await apiRequest('/login', 'POST', { username, password });
      localStorage.setItem('token', token);
      localStorage.setItem('username', username);
      setAuthState({ isAuthenticated: true, username });
      return true;
  } catch (error) {
      console.error('Failed to login:', error);
      return false;
  }
}

export async function register(username, password) {
  try {
      await apiRequest('/register', 'POST', { username, password });
      return true;
  } catch (error) {
      console.error('Failed to register:', error);
      return false;
  }
}

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({ isAuthenticated: false, username: '' });

  useEffect(() => {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('username');
    if (token && username) {
      setAuthState({ isAuthenticated: true, username });
    }
  }, []);

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    setAuthState({ isAuthenticated: false, username: '' });
  };

  return (
    <AuthContext.Provider value={{ ...authState, setAuthState, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);