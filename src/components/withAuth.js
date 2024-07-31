import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const withAuth = (WrappedComponent) => {
  return (props) => {
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }

      axios
        .get('http://127.0.0.1:8000/protected', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setMessage(response.data);
        })
        .catch((error) => {
          if (error.response && error.response.status === 401) {
            navigate('/login');
          }
        });
    }, [navigate]);

    return <WrappedComponent {...props} message={message} />;
  };
};

export default withAuth;

// Використання

// import React from 'react';
// import withAuth from './withAuth';

// const Dashboard = ({ message }) => {
//   return (
//     <div>
//       <h2>Dashboard</h2>
//       <p>{message}</p>
//     </div>
//   );
// };

// export default withAuth(Dashboard);
