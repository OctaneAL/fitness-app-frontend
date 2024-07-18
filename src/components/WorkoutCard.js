// WorkoutCard.js
import React from 'react';
import { Card } from 'react-bootstrap';
import ExerciseCard from './ExerciseCard';

const WorkoutCard = ({ workout }) => (
  <Card className="mb-4">
    <Card.Header as="h4">{workout.name}</Card.Header>
    {workout.exercises.map((exercise, index) => (
      <ExerciseCard key={index} exercise={exercise} />
    ))}
  </Card>
);

export default WorkoutCard;
