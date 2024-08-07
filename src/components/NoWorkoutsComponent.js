import React from 'react';
import { Container, Row, Col, Alert } from 'react-bootstrap';

function NoWorkouts() {
    return (
        <Container className="mt-5 mb-2">
            <Row className="d-flex align-items-center justify-content-center">
                <Col md={8} lg={6}>
                    <Alert variant="info" className="text-center">
                        <h4>No Workouts Found</h4>
                        <p>
                            You have no workouts logged for this period. Click the button below to add a new workout and start tracking your progress.
                        </p>
                    </Alert>
                </Col>
            </Row>
        </Container>
    );
}

export default NoWorkouts;
