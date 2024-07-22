import React, { useState } from 'react';
import { Button, Card, Container, Row, Col, Dropdown, ToggleButton, ToggleButtonGroup } from 'react-bootstrap';
import './temp.css'; // Import the custom CSS

const ExerciseComponent = () => {
  const [view, setView] = useState('month');

  const handleViewChange = (val) => setView(val);

  const handleEdit = () => {
    // Add your edit logic here
    alert('Edit workout');
  };

  const handleDelete = () => {
    // Add your delete logic here
    alert('Delete workout');
  };

  return (
    <Container className="mt-4">
      <Row className="mb-4">
        <ToggleButtonGroup type="radio" name="viewOptions" defaultValue="month" onChange={handleViewChange}>
          <ToggleButton id="week" value="week">
            Week
          </ToggleButton>
          <ToggleButton id="month" value="month">
            Month
          </ToggleButton>
        </ToggleButtonGroup>
      </Row>
      <Row>
        <Card className="mb-3">
          <Card.Body>
            <Row>
              <Col>
                <Card.Title>Unnamed Routine</Card.Title>
              </Col>
              <Col className="text-end" style = {{ paddingRight: "0 px" }}>
                <Dropdown className="custom-dropdown">
                  <Dropdown.Toggle as="a" className="three-dots">
                    <strong>⋮</strong>
                  </Dropdown.Toggle>

                  <Dropdown.Menu align="end">
                    <Dropdown.Item onClick={handleEdit}>Edit</Dropdown.Item>
                    <Dropdown.Item onClick={handleDelete}>Delete</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </Col>
            </Row>
            <Card.Text>
              Chest Fly, Chest Press Machine
            </Card.Text>
            <Row>
              <Col>
                <p><strong>Planned Volume:</strong> 1,997,800 kg</p>
              </Col>
              <Col>
                <p><strong>Est Duration:</strong> 47:30</p>
              </Col>
              <Col>
                <p><strong>Est Calories:</strong> 354</p>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </Row>
      <Row>
        <Button variant="primary">Build Routine</Button>
      </Row>
    </Container>
  );
};

export default ExerciseComponent;
