import React from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import '../styles/ExerciseComponent.css'; // Import the custom CSS

const ExerciseBriefComponent = ({ title, numberOfWorkouts }) => {
  return (
    // <Container className="mt-4">
      // <Row>
        <Card className="mb-3 shadow exercise-brief-container" style = {{ borderRadius: "15px" }}>
          <Card.Body>
            <Row>
              <Col className="d-flex align-items-center">
                <Card.Title as="h4" style={{ marginBottom: "0px" }}>{title}</Card.Title>
              </Col>
              <Col className="text-end" style = {{ paddingRight: "0 px" }}>
                <Card.Title as="h4" style={{ marginBottom: "0px" }}>{numberOfWorkouts} Workouts</Card.Title>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      // </Row>
      
    // </Container>
  );
};

export default ExerciseBriefComponent;
