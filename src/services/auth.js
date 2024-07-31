import React, { createContext, useState, useContext, useEffect } from 'react';
import { apiRequest } from './api';

export async function login(username, password, setAuthState) {
  try {
      let { token, user_id } = await apiRequest('/login', 'POST', { username, password });
      user_id = parseInt(user_id);
      localStorage.setItem('token', token);
      localStorage.setItem('username', username);
      localStorage.setItem('user_id', user_id);
      setAuthState({ isAuthenticated: true, username: username, user_id: user_id });
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
  const [authState, setAuthState] = useState({ isAuthenticated: false, username: '', user_id: '' });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('username');
    let user_id = localStorage.getItem('user_id');
    user_id = parseInt(user_id);

    if (token && username) {
      setAuthState({ isAuthenticated: true, username: username, user_id: user_id });
    }
    setLoading(false);
  }, []);

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('user_id');
    setAuthState({ isAuthenticated: false, username: '', user_id: '' });
  };

  return (
    <AuthContext.Provider value={{ ...authState, setAuthState, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);