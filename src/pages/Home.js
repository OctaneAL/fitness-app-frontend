import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import '../styles/Home.css';

function Home() {
  return (
    <Container className="home-page d-flex flex-column">
      <Row className="my-5 flex-grow-1">
        <Col className="text-center">
          <h1>Welcome to MyApp</h1>
          <p className="lead">Your application description here.</p>
          <Button variant="primary" href="/register">Get Started</Button>
        </Col>
      </Row>
      <Row className="my-5 flex-grow-1">
        <Col md={4} className="text-center">
          <h3>Feature 1</h3>
          <p>Detail about feature 1.</p>
        </Col>
        <Col md={4} className="text-center">
          <h3>Feature 2</h3>
          <p>Detail about feature 2.</p>
        </Col>
        <Col md={4} className="text-center">
          <h3>Feature 3</h3>
          <p>Detail about feature 3.</p>
        </Col>
      </Row>
      <Row className="my-5 flex-grow-1">
        <Col className="text-center">
          <h2>Why Choose Us?</h2>
          <p>Additional details about why users should choose your app.</p>
        </Col>
      </Row>
      <Row className="my-5 flex-grow-1">
        <Col className="text-center">
          <h2>Testimonials</h2>
          <p>Quotes from satisfied users.</p>
        </Col>
      </Row>
      {/* <div style={{ border: "1px solid #ccc", padding: "15px", paddingTop: "10px", paddingBottom: "10px", marginTop: "10px", borderRadius: "5px", backgroundColor: "#e9ecef" }}>
        <Row>
          <Col>
            <ExerciseBriefComponent />
          </Col>
          <Col>
            <ExerciseBriefComponent />
          </Col>
        </Row>
        <Row>
          <Col>
            <ExerciseBriefComponent />
          </Col>
          <Col>
            <ExerciseBriefComponent />
          </Col>
        </Row>
        <Row>
          <Col>
            <ExerciseBriefComponent />
          </Col>
        </Row>
      </div> */}

    </Container>
  );
}

export default Home;
