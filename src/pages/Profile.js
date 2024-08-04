import React from 'react';
import { Container } from 'react-bootstrap';
import ProfileComponent from '../components/ProfileComponent'

import { useAuth } from '../services/auth';

function Profile() {
  const { user_id } = useAuth();

  return (
    <Container className="user-profile d-flex flex-column">
      <ProfileComponent
        user_id={user_id}
      />
    </Container>
  );
};


export default Profile;