import React, { useState } from 'react';
import { Card, Row, Col, Dropdown } from 'react-bootstrap';
import '../styles/ExerciseComponent.css'; // Import the custom CSS

const ExerciseComponent = ({ workout, onEditEvent, onDeleteEvent }) => {
  const [view, setView] = useState('month');

  const handleViewChange = (val) => setView(val);

  function getPlannedVolume(workout) { // no need for this func, it will be written in DB field
    let res = 0;
    for (let exercise of workout.exercises){
      for (let detail of exercise.details){
        res += parseInt(detail.weight) * parseInt(detail.repeats);
      }
    }
    return res;
  }

  return (
    // <Container className="mt-4">
      // <Row>
        <Card className="mb-3 shadow" style = {{ borderRadius: "15px" }}>
          <Card.Body style={{ paddingTop: "0.5rem", paddingBottom: "0.5rem" }}>
            <Row>
              <Col style = {{ paddingTop: "0.75rem" }}>
                <Card.Title as="h4">{workout.name}</Card.Title>
              </Col>
              <Col className="text-end" style = {{ paddingRight: "0 px" }}>
                <Dropdown className="custom-dropdown">
                  <Dropdown.Toggle as="a" className="three-dots">
                    <strong>⋮</strong>
                  </Dropdown.Toggle>

                  <Dropdown.Menu align="end">
                    <Dropdown.Item onClick={() => onEditEvent(workout.id)}>View/Edit</Dropdown.Item>
                    <Dropdown.Item onClick={() => onDeleteEvent(workout.id)}>Delete</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </Col>
            </Row>
            <Card.Text>
              Chest Fly, Chest Press Machine
            </Card.Text>
            <Row>
              <Col style={{ textAlign: "center" }}>
                <p><strong>Planned Volume:</strong> {workout.planned_volume} kg</p>
              </Col>
              <Col style={{ textAlign: "center" }}>
                <p><strong>Est Duration:</strong> {workout.duration} minutes</p>
              </Col>
              <Col style={{ textAlign: "center" }}>
                <p><strong>Total Exercises:</strong> {workout.exercises.length}</p>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      // </Row>
      
    // </Container>
  );
};

export default ExerciseComponent;
