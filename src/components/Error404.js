import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Error404() {
    return (
        <Container fluid className="h-100 d-flex flex-column justify-content-center overflow-hidden">
                <Row>
                    <Col className="w-100 text-center">
                        <h1>404</h1>
                    </Col>
                </Row>
                <Row>
                    <Col className="w-100 text-center">
                        <h2>Oops! page not found</h2>
                    </Col>
                </Row>
                <Row className="my-4">
                    <Col className="w-10 text-center">
                        <Button variant="outline-dark" size="lg" as={Link} to="/">Back to Home</Button>
                    </Col>
                </Row>
        </Container>
    );
}

export default Error404;
