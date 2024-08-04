import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Row } from 'react-bootstrap';
import { getExerciseCatalog } from '../services/api'
import WindowedSelect, { createFilter } from 'react-windowed-select';

const AddWorkoutModal = ({ showModal, handleCloseModal, handleAddEvent, newEvent, setNewEvent, validated, editEventId, initialExerciseState }) => {
    

    const [selectValid, setSelectValid] = useState(newEvent.exercises.map(() => true));  

    const handleInputChange = (e, exerciseIndex, field, setIndex = null) => {
      let value = null;
      if (e !== null){
        value = e.target.value;
      }
      
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

    const handleSelectChange = (selectedOption, exerciseIndex) => {
      let e = null
      if (selectedOption !== null){
        e = { target: { value: selectedOption.value } }
        setSelectValid((prev) => prev.map((valid, index) => index === exerciseIndex ? true : valid));
      } else {
          setSelectValid((prev) => prev.map((valid, index) => index === exerciseIndex ? false : valid));
      }
      handleInputChange(
        e,
        exerciseIndex,
        'exercise_catalog_id'
      );
    };

    const validateForm = (event) => {
      const form = event.currentTarget;
      const isValid = form.checkValidity();
      const selectValidation = newEvent.exercises.map(exercise => !!exercise.exercise_catalog_id);
      setSelectValid(selectValidation);
      
      if (!isValid || selectValidation.includes(false)) {
          event.preventDefault();
          event.stopPropagation();
      }
  };

    // const exerciseOptions = [
    //   { id: 0, name: 'Жим лежачи' },
    //   { id: 1, name: 'Присідання' },
    //   { id: 2, name: 'Мертва тяга' },
    //   { id: 3, name: 'Підтягування' },
    //   { id: 4, name: 'Біцепс на лавці Скотта' }
    // ];
    // let exerciseOptions = [];

    const [exerciseOptions, setExerciseOptions] = useState([]);

    const options = exerciseOptions.map((option) => ({
      value: option.id,
      label: option.name,
    }));
    // const [options, setOptions] = useState([]);

    // const { onMouseMove, onMouseOver, ...newInnerProps } = options.innerProps

    
    

    useEffect(() => {
      getExerciseCatalog()
          .then(data => {
              setExerciseOptions(data);
          })
  }, []);
  
    return (
      <Modal show={showModal} onHide={handleCloseModal}>
      <Modal.Header closeButton>
        <Modal.Title>{editEventId ? "Edit workout" : "Add workout"}</Modal.Title>
      </Modal.Header>
      <Form noValidate validated={validated} onSubmit={(e) => { validateForm(e); handleAddEvent(e); }}>
        <Modal.Body>
          <Form.Group controlId="eventName">
            <Form.Label>Name of the workout</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter the name of the workout"
              value={newEvent.name}
              onChange={(e) => setNewEvent({ ...newEvent, name: e.target.value })}
              required
            />
            <Form.Control.Feedback type="invalid">Будь ласка, введіть назву тренування.</Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="eventDate">
            <Form.Label>Date of the workout</Form.Label>
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
            <Form.Label>Approximate workout time (minutes)</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter the duration of your workout"
              value={newEvent.duration}
              onChange={(e) => setNewEvent({ ...newEvent, duration: e.target.value })}
              required
            />
            <Form.Control.Feedback type="invalid">Будь ласка, введіть тривалість тренування.</Form.Control.Feedback>
          </Form.Group>

          {newEvent.exercises.map((exercise, exerciseIndex) => (
            <div key={exerciseIndex} className="exercise-group">
              <Form.Group style={{ marginBottom: "0.5rem" }} controlId={`exerciseName-${exerciseIndex}`}>
                {/* <Form.Label>Name of the exercise</Form.Label> */}

                <WindowedSelect
                  // styles={customStyles}
                  defaultValue={null}
                  value={options.find(option => option.value === exercise.exercise_catalog_id)}
                  onChange={(e) => handleSelectChange(e, exerciseIndex)}
                  options={options}
                  placeholder="Select exercise"
                  isClearable={true}
                  isSearchable={true}
                  filterOption={createFilter({ignoreAccents: false})}
                  className={selectValid[exerciseIndex] ? "" : "is-invalid"}
                />
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
                Add set
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
                  Delete exercise
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
              setNewEvent({ ...newEvent, exercises: [...newEvent.exercises, initialExerciseState] })
            }
          >
            Add exercise
          </Button>
          <Button
            variant="primary"
            type="submit" 
            style={{ margin: '10px', marginLeft: 'auto', marginRight: 'auto' }}
          >
            Save
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
    )
}

export default AddWorkoutModal;