import React, { useState, useEffect } from 'react';
import { Button, Form, Row } from 'react-bootstrap';

const ModalExerciseDetails = ({ setIndex, exerciseIndex, detail, handleInputChange, handleRemoveSet }) => {
    return (
        <Row style={{ padding: ".25rem" }}>
            <div className="col-2 col-md-2 align-self-center">
                <h5 style={{textAlign: "center", marginBottom: "0px", paddingRight: "0px" }}>{setIndex + 1}</h5>
            </div>

            <div className="col-4 col-md-4 align-self-center" style={{ textAlign: "center", paddingLeft: "0px" }}>
                <Form.Group controlId={`exerciseWeight-${exerciseIndex}-${setIndex}`}>
                    <div className="d-flex align-items-center">
                        <Form.Control
                            type="number"
                            placeholder=""
                            value={detail.weight}
                            onChange={(e) => handleInputChange(e, exerciseIndex, 'weight', setIndex)}
                            min="0"
                            required
                        />
                        <em style={{paddingLeft: "8px"}}>kg</em>
                    </div>
                    <Form.Control.Feedback type="invalid">Please enter the weight.</Form.Control.Feedback>
                </Form.Group>
            </div>

            <div className="col-4 col-md-4 align-self-center" style={{ textAlign: "center", paddingLeft: "0px", paddingRight: "0px" }}>
                <Form.Group controlId={`exerciseRepeats-${exerciseIndex}-${setIndex}`}>
                    <div className="d-flex align-items-center">
                        <Form.Control
                            type="number"
                            placeholder=""
                            value={detail.repeats}
                            onChange={(e) => handleInputChange(e, exerciseIndex, 'repeats', setIndex)}
                            min="1"
                            required
                        />
                        <em style={{paddingLeft: "8px"}}>reps</em>
                    </div>
                    <Form.Control.Feedback type="invalid">The number of repetitions must be greater than 0.</Form.Control.Feedback>
                </Form.Group>
            </div>

            <div className="col-2 col-md-2 align-self-center" style={{ textAlign: "right" }}>
                <Button
                    variant="close"
                    onClick={() => handleRemoveSet(exerciseIndex, setIndex)}
                >
                </Button>
            </div>
        </Row>
    );
};

export default ModalExerciseDetails;
