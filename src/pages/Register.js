import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { register, login, useAuth } from '../services/auth';
import toast, { Toaster } from 'react-hot-toast';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { Container, Form, Button, Card, Row, Col } from 'react-bootstrap';
import signUpImage from '../assets/images/bung-karno.jpg';

function Register() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    repeatPassword: '',
  });
  const { username, password, repeatPassword} = formData;

  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);

  const { setAuthState } = useAuth();


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const navigate = useNavigate();

  const validateUsername = (username) => {
    if (username.length < 3 || username.length > 20) return [false, "Username must be 3-20 characters long."];

    let isOther = false;

    for (const char of username) {
      if (!(("a" <= char && char <= "z") || ("A" <= char && char <= "Z") || ("0" <= char && char <= "9") || char === "." || char === "_" || char === "-")) {
        isOther = true;
        break;
      }
    }

    if (isOther) return [false, "Username can only contain letters, numbers, dots, underscores, and hyphens."]

    return [true, ""]
  };

  const validatePassword = (password) => {
    if (password.length < 8) return [false, "Password must be at least 8 characters long."];

    let isUpperCase = false;
    let isLowerCase = false;
    let isNumber = false;
    let isSpecial = false;

    for (const char of password){
      if ("0" <= char && char <= "9") isNumber = true;
      else if ("a" <= char && char <= "z") isLowerCase = true;
      else if("A" <= char && char <= "Z") isUpperCase = true;
      else isSpecial = true;
    };

    if (!isUpperCase) return [false, "Password must contain at least one UpperCase latter."];
    if (!isLowerCase) return [false, "Password must contain at least one LowerCase latter."];
    if (!isNumber) return [false, "Password must contain at least one digit."];
    if (!isSpecial) return [false, "Password must contain at least one special character."];

    return [true, ""]
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let [isValid, errorMessage] = validateForm();

    if (!isValid) {
      toast.error(errorMessage);
      return;
    }

    const toastId = toast.loading('Waiting...');

    const success = await register(username, password);

    if (success) {
      await login(username, password, setAuthState);
      localStorage.setItem('toastMessage', 'Authorized!');
      navigate('/');
    } else {
      toast.error("Invalid credentials");
    }

    toast.dismiss(toastId);
  };

  const validateForm = () => {
    let [isValid, errorMessage] = validateUsername(username);
    if (!isValid) return [false, errorMessage];
    
    [isValid, errorMessage] = validatePassword(password);
    if (!isValid) return [false, errorMessage];

    if (password !== repeatPassword) return [false, "Passwords do not match."];

    return [true, ""];
  };

  return (
    <Container className="mt-5">
      <Card className="overflow-hidden" style={{ borderRadius: '2rem' }}>
        <Row>
          <Col xs={12} md={6} lg={6} className="d-flex align-items-center justify-content-center">
            <Card.Body>
              <Card.Title as="h1" className="text-center w-100">
                Sign up now
              </Card.Title>
              <Form onSubmit={handleSubmit} className="mx-1">
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

                <Form.Group controlId="formPassword">
                  <Form.Label>Password</Form.Label>
                  <div className="input-group">
                    <Form.Control
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Password"
                      name="password"
                      value={password}
                      onChange={handleChange}
                      required
                    />
                    <Button
                      variant="outline-secondary"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
                    </Button>
                  </div>
                </Form.Group>

                <Form.Group controlId="formRepeatPassword">
                  <Form.Label>Repeat Password</Form.Label>
                  <div className="input-group">
                    <Form.Control
                      type={showRepeatPassword ? 'text' : 'password'}
                      placeholder="Repeat Password"
                      name="repeatPassword"
                      value={repeatPassword}
                      onChange={handleChange}
                      required
                    />
                    <Button
                      variant="outline-secondary"
                      onClick={() => setShowRepeatPassword(!showRepeatPassword)}
                    >
                      <FontAwesomeIcon icon={showRepeatPassword ? faEye : faEyeSlash} />
                    </Button>
                  </div>
                </Form.Group>

                <Button variant="outline-dark" size="lg" type="submit" className="my-3 w-100">
                  Sign up
                </Button>
                <p
                  className="mb-5 pb-lg-2 text-center"
                  style={{ color: '#393f81' }}
                >
                  Already have an account?{' '}
                  <a href="/login" style={{ color: '#007bff' }}>
                    Sign in
                  </a>
                </p>
              </Form>
            </Card.Body>
          </Col>
          
          <Col xs={0} md={6} lg={6} className="d-none d-md-block">
            <Card.Img
              className="w-100"
              src={signUpImage}
            />
          </Col>
        </Row>
      </Card>
      <Toaster />
    </Container>
  );
}

export default Register;
