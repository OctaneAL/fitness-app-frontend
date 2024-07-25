import React from 'react';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';

const AddWorkoutModal = ({ showModal, handleCloseModal, handleAddEvent, newEvent, setNewEvent, validated, editEventId }) => {
    const handleInputChange = (e, exerciseIndex, field, setIndex = null) => {
      const value = e.target.value;
      const updatedExercises = [...newEvent.exercises];
      if (setIndex === null) {
        updatedExercises[exerciseIndex][field] = value;
      } else {
        updatedExercises[exerciseIndex].details[setIndex][field] = value;
      }
      setNewEvent({ ...newEvent, exercises: updatedExercises });
    };
  
    const handleAddSet = (exerciseIndex) => {
      const updatedExercises = [...newEvent.exercises];
      updatedExercises[exerciseIndex].details.push({ repeats: '', weight: '' });
      setNewEvent({ ...newEvent, exercises: updatedExercises });
    };
  
    const handleRemoveSet = (exerciseIndex, setIndex) => {
      const updatedExercises = [...newEvent.exercises];
      updatedExercises[exerciseIndex].details.splice(setIndex, 1);
      setNewEvent({ ...newEvent, exercises: updatedExercises });
    };

    const exerciseOptions = [
      'Жим лежачи',
      'Присідання',
      'Мертва тяга',
      'Підтягування',
      'Біцепс на лавці Скотта'
    ];

    return (
      <Modal show={showModal} onHide={handleCloseModal}>
      <Modal.Header closeButton>
        <Modal.Title>{editEventId ? "Редагувати тренування" : "Додати тренування"}</Modal.Title>
      </Modal.Header>
      <Form noValidate validated={validated} onSubmit={handleAddEvent}>
        <Modal.Body>
          <Form.Group controlId="eventName">
            <Form.Label>Назва тренування</Form.Label>
            <Form.Control
              type="text"
              placeholder="Введіть назву тренування"
              value={newEvent.name}
              onChange={(e) => setNewEvent({ ...newEvent, name: e.target.value })}
              required
            />
            <Form.Control.Feedback type="invalid">Будь ласка, введіть назву тренування.</Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="eventDate">
            <Form.Label>День тренування</Form.Label>
            <Form.Control
              type="date"
              value={newEvent.date}
              onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
              required
            />
            <Form.Control.Feedback type="invalid">Будь ласка, виберіть день тренування.</Form.Control.Feedback>
          </Form.Group>

          {/* <Form.Group controlId="startTime">
            <Form.Label>Час початку</Form.Label>
            <Form.Control
              type="time"
              value={newEvent.startTime}
              onChange={(e) => setNewEvent({ ...newEvent, startTime: e.target.value })}
              required
            />
            <Form.Control.Feedback type="invalid">Будь ласка, введіть час початку.</Form.Control.Feedback>
          </Form.Group> */}

          <Form.Group controlId="duration">
            <Form.Label>Приблизний час тренування (хвилини)</Form.Label>
            <Form.Control
              type="number"
              placeholder="Введіть тривалість тренування"
              value={newEvent.duration}
              onChange={(e) => setNewEvent({ ...newEvent, duration: e.target.value })}
              required
            />
            <Form.Control.Feedback type="invalid">Будь ласка, введіть тривалість тренування.</Form.Control.Feedback>
          </Form.Group>

          {newEvent.exercises.map((exercise, exerciseIndex) => (
            <div key={exerciseIndex} className="exercise-group">
              <Form.Group style={{ marginBottom: "0.5rem" }} controlId={`exerciseName-${exerciseIndex}`}>
                <Form.Label>Назва вправи</Form.Label>
                <Form.Control
                  as="select"
                  value={exercise.name}
                  onChange={(e) => handleInputChange(e, exerciseIndex, 'name')}
                  required
                >
                  <option value="">Оберіть вправу</option>
                  {exerciseOptions.map((option, index) => (
                    <option key={index} value={option}>
                      {option}
                    </option>
                  ))}
                </Form.Control>
                <Form.Control.Feedback type="invalid">Будь ласка, оберіть назву вправи.</Form.Control.Feedback>
              </Form.Group>

              {exercise.details.map((detail, setIndex) => (
                <div key={setIndex}>
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
                        <Form.Control.Feedback type="invalid">Будь ласка, введіть вагу.</Form.Control.Feedback>
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
                        <Form.Control.Feedback type="invalid">Кількість повторів повинна бути більше 0.</Form.Control.Feedback>
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
                </div>

                
              ))}
              <Button
                variant="link"
                onClick={() => handleAddSet(exerciseIndex)}
              >
                Додати новий підхід
              </Button>
              <div className="d-flex justify-content-between w-100">
                <Button
                  variant="danger"
                  style={{ margin: '10px', marginLeft: 'auto', marginRight: 'auto', marginBottom: '0px' }}
                  onClick={() => {
                    const updatedExercises = newEvent.exercises.filter((_, i) => i !== exerciseIndex);
                    setNewEvent({ ...newEvent, exercises: updatedExercises });
                  }}
                >
                  Видалити вправу
                </Button>
              </div>
            </div>
          ))}
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            style={{ margin: '10px', marginLeft: 'auto', marginRight: 'auto' }}
            onClick={() =>
              setNewEvent({ ...newEvent, exercises: [...newEvent.exercises, { name: '', sets: 1, details: [{ repeats: '', weight: '' }] }] })
            }
          >
            Додати вправу
          </Button>
          <Button variant="secondary" onClick={handleCloseModal}>
            Закрити
          </Button>
          <Button variant="primary" type="submit">
            Зберегти
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
    )
}

export default AddWorkoutModal;