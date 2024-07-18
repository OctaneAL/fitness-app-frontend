// ExerciseCard.js
import React from 'react';
import { Card, ListGroup } from 'react-bootstrap';
import SetCard from './SetCard';

const ExerciseCard = ({ exercise }) => (
  <Card className="mb-3" style={{ marginLeft: "5px", marginRight: "5px" }}>
    <Card.Header as="h6">{exercise.name}</Card.Header>
    <ListGroup variant="flush">
      {exercise.details.map((set, index) => (
        <SetCard key={index} set={{ number: index + 1, ...set }} />
      ))}
    </ListGroup>
  </Card>
);

export default ExerciseCard;
