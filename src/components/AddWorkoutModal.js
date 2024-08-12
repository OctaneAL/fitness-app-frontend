import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { getMuscleGroups, filterExercises, getExerciseCatalog, getFavoriteExercises } from '../services/api';
import { useAuth } from '../services/auth';
import ModalExercise from './ModalExercise';

const AddWorkoutModal = ({ showModal, handleCloseModal, handleAddEvent, newEvent, setNewEvent, validated, editEventId, initialExerciseState }) => {
    const [selectValid, setSelectValid] = useState(newEvent.exercises.map(() => true));  
    const {user_id} = useAuth();

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

    const [exerciseOptions, setExerciseOptions] = useState([]);
    const [exercises, setExercises] = useState([]);
    const [muscleGroups, setMuscleGroups] = useState([]);
    const [mapMuscleGroups, setMapMuscleGroups] = useState({});

    const [favoriteExercises, setFavoriteExercises] = useState([]);
    const [favoriteOption, setFavoriteOption] = useState({});
    
    useEffect(() => {
      getExerciseCatalog()
          .then(data => {
            setExerciseOptions(data);
          })

      getMuscleGroups()
          .then(data => {
            setMuscleGroups(data);
          })

      filterExercises({
          targetMuscleGroupId: "",
          name: "",
          difficultyIds: [],
          equipmentIds: [],
          bodyRegionIds: []
      })
          .then(data => {
            setExercises(data);
          })
    }, []);

    useEffect(() => {
      if (typeof user_id !== "string"){
        getFavoriteExercises(user_id)
          .then((data) => {
            setFavoriteExercises(data);
          })
      }
    }, [user_id])

    useEffect(() => {
      if (favoriteExercises.length > 0 && exercises.length > 0){
        let mp = new Map();

        for (let exercise of exercises) { 
          mp.set(parseInt(exercise.id), exercise.name)
        }
        
        let option = {};
        option["label"] = "Favorite exercises";
        option["options"] = [];

        for (let id of favoriteExercises) {
          option["options"].push({"label": mp.get(id), "value": id}); 
        }

        setFavoriteOption(option);
      }
    }, [favoriteExercises, exercises])

    useEffect(() => {
      let mp = new Map();

      muscleGroups.forEach(group => {
        mp.set(group.id, group.name);
      });

      setMapMuscleGroups(mp);
    }, [muscleGroups])

    useEffect(() => {
      if (muscleGroups.length > 0 && exercises.length > 0 && mapMuscleGroups.size > 0) {
        let mp = {};

        for (let muscleGroup of muscleGroups){
          mp[muscleGroup.name] = [];
        }

        for (let exercise of exercises){
          let t_id = parseInt(exercise.target_muscle_group_id);

          if (t_id === 0) continue;

          let muscleGroupName = mapMuscleGroups.get(t_id);
          
          let t = {};
          t["label"] = exercise.name;
          t["value"] = parseInt(exercise.id);

          mp[muscleGroupName].push(t);
        }
  
        let groupedOptions = [];
  
        for (let key of Object.keys(mp)){
          groupedOptions.push({"label": key, "options": mp[key]});
        }
  
        setExerciseOptions(groupedOptions);
      }
      
    }, [muscleGroups, exercises, mapMuscleGroups])
    
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
              <Form.Control.Feedback type="invalid">Please enter the name of the workout.</Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="eventDate">
              <Form.Label>Date of the workout</Form.Label>
              <Form.Control
                type="date"
                value={newEvent.date}
                onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
                max={new Date().toISOString().split("T")[0]}
                required
              />
              <Form.Control.Feedback type="invalid">Please select a workout date.</Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="duration">
              <Form.Label>Approximate workout time (minutes)</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter the duration of your workout"
                value={newEvent.duration}
                onChange={(e) => setNewEvent({ ...newEvent, duration: e.target.value })}
                min="0"
                required
              />
              <Form.Control.Feedback type="invalid">Please enter the duration of your workout.</Form.Control.Feedback>
            </Form.Group>

            {newEvent.exercises.map((exercise, exerciseIndex) => (
              <ModalExercise
                key={exerciseIndex}
                exerciseIndex={exerciseIndex}
                favoriteOption={favoriteOption}
                exerciseOptions={exerciseOptions}
                handleSelectChange={handleSelectChange}
                selectValid={selectValid}
                exercise={exercise}
                handleInputChange={handleInputChange}
                newEvent={newEvent}
                setNewEvent={setNewEvent}
              />
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