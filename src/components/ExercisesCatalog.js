import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, CardBody } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { getMuscleGroups } from '../services/api';

function ExerciseCatalog() {
    const [muscleGroups, setMuscleGroups] = useState([]);

    useEffect(() => {
        getMuscleGroups()
            .then(data => {
                setMuscleGroups(data);
            })
    }, []);

    const toUrlFormat = (name) => {
        return name.toLowerCase().replace(/\s+/g, '-');
    };

    return (
        <Container className="my-4">
            <h1 className="text-center mb-4">Exercise Catalog</h1>
            <p className="text-center mb-4">
                Choose a category to find new exercises based on their characteristics, such as difficulty, target muscle group, equipment, and body region.
            </p>
            <Row>
                {muscleGroups.map((muscle_group, index) => (
                    <Col
                        xs={index === muscleGroups.length - 1 ? 12 : 6}
                        md={4} 
                        lg={4}
                        className="mb-3"
                        key={index}
                    >
                        <Link to={`/exercises/${toUrlFormat(muscle_group)}`}>
                            <Card className="text-center h-100">
                                <CardBody className="d-flex flex-column align-items-center">
                                    <Card.Title className="text-center" style={{ marginBottom: "0px"}}>{muscle_group}</Card.Title>
                                </CardBody>
                            </Card>
                        </Link>
                    </Col>
                ))}
            </Row>
        </Container>
    );
}

export default ExerciseCatalog;
