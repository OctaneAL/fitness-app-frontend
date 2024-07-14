import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { register } from '../services/auth';

import { Container, Form, Button } from 'react-bootstrap';

function Register() {
  const [formData, setFormData] = useState({
    username: '',
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  });
  const { username, firstName, lastName, email, password } = formData;


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const history = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await register(username, password);
    if (success) {
      history.push('/');
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <div className="container mt-4">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h2 className="text-center mb-4">Register</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter username"
                name="username"
                value={username}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="formFirstName">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter first name"
                name="firstName"
                value={firstName}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="formLastName">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter last name"
                name="lastName"
                value={lastName}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="formEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                name="email"
                value={email}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="formPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                name="password"
                value={password}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100">
              Register
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default Register;
