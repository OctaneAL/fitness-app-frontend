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
            <Row>
                {muscleGroups.map((muscle_group, index) => (
                    <Col xs={6} md={3} lg={3} className="mb-3" key={index}>
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
