import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login, useAuth } from '../services/auth';
import { Container, Form, Button, Card, Row, Col } from 'react-bootstrap';
import toast, { Toaster } from 'react-hot-toast';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { setAuthState } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    const toastId = toast.loading('Waiting...');
    
    e.preventDefault();

    const success = await login(username, password, setAuthState);

    if (success) {
      localStorage.setItem('toastMessage', 'Authorized!');
      navigate('/');
    } else {
      toast.error("Invalid credentials");
    }

    toast.dismiss(toastId);
  };

  return (
    <Container className="mt-5">
      <Card className="overflow-hidden" style={{ borderRadius: "2rem" }}>
        <Row>
          <Col xs={0} md={6} lg={6} className="d-none d-md-block">
            <Card.Img className="w-100" src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/img1.webp" />
          </Col>
          <Col xs={12} md={6} lg={6} className="d-flex align-items-center justify-content-center">
            <Card.Body>
              <Card.Title as="h1" className="text-center w-100">Sign into your account</Card.Title>
              <Form onSubmit={handleSubmit} className="mx-1">
                <Form.Group controlId="formUsername">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter username"
                  />
                </Form.Group>

                <Form.Group controlId="formPassword" className="my-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter password"
                  />
                </Form.Group>

                <Button variant="outline-dark" size="lg" type="submit" className="my-3 w-100">
                  Login
                </Button>
                <p className="mb-5 pb-lg-2 text-center" style={{color: '#393f81'}}>Don't have an account? <a href="/register" style={{color: '#007bff'}}>Register here</a></p>
              </Form>
            </Card.Body>
          </Col>
        </Row>
      </Card>      
      <Toaster />
    </Container>
  );
}

export default Login;
