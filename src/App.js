import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, Outlet } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
// import Protected from './pages/Protected';
// import Calendar from './pages/Calendar';
import Header from './components/Header'; 
import Profile from './pages/Profile'
import Workout from './pages/Workout'

// import Footer from './components/Footer';
import { AuthProvider, useAuth } from './services/auth'; 

import './styles/App.css';

import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Header />
        <div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route element={<AnonymousRoute />}>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Route>
            {/* <Route path="/calendar" element={<Calendar />} /> */}
            
            {/* <Route path="/protected" element={<Protected />} /> */}
            <Route element={<ProtectedRoute />}>
              <Route path="/workout" element={<Workout />} />
              <Route path="/profile" element={<Profile />} />
            </Route>
          </Routes>
        </div>
        {/* <Footer /> */}
      </Router>
    </AuthProvider>
  );
}

export const AnonymousRoute = () => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return null;
  }
  
  return isAuthenticated ? <Navigate to="/" /> : <Outlet />
}

export const ProtectedRoute = () => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return null;
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/" />;
};

export default App;
