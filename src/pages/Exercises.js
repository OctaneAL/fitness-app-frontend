import React from 'react'
import { Container } from 'react-bootstrap';
import ExerciseCatalog from '../components/ExercisesCatalog';

function Exercises() {
    return (
        <Container className="exercises-page d-flex flex-column">
            <ExerciseCatalog />
        </Container>
    );
};

export default Exercises;