import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

function Footer() {
  return (
      <footer className="footer bg-dark text-light py-4 mt-auto fixed-bottom">
        <Container>
          <Row>
            <Col md={4}>
              <h5>MyApp</h5>
              <p>Your application description here.</p>
            </Col>
            <Col md={4}>
              <h5>Links</h5>
              <ul className="list-unstyled">
                <li><a href="/" className="text-light">Home</a></li>
                <li><a href="/login" className="text-light">Login</a></li>
                <li><a href="/register" className="text-light">Register</a></li>
                <li><a href="/protected" className="text-light">Protected</a></li>
              </ul>
            </Col>
            <Col md={4}>
              <h5>Contact</h5>
              <p>Address: Your address here</p>
              <p>Email: <a href="mailto:info@myapp.com" className="text-light">info@myapp.com</a></p>
              <p>Phone: +123 456 789</p>
            </Col>
          </Row>
          <Row className="mt-3">
            <Col className="text-center">
              <p>&copy; {new Date().getFullYear()} MyApp. All rights reserved.</p>
            </Col>
          </Row>
        </Container>
      </footer>
  );
}

export default Footer;
