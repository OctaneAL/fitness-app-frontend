import React, { createContext, useState, useContext, useEffect } from 'react';

export async function login(username, password, setAuthState) {
  const response = await fetch('http://localhost:8000/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password }),
  });

  if (response.ok) {
    const { token } = await response.json();
    localStorage.setItem('token', token);
    localStorage.setItem('username', username);
    setAuthState({ isAuthenticated: true, username });
    return true;
  } else {
    return false;
  }
}

export async function register(username, password) {
  const response = await fetch('http://localhost:8000/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password }),
  });

  return response.ok;
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