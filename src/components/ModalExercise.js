import React from 'react';
import { Button, Form } from 'react-bootstrap';
import WindowedSelect, { createFilter } from 'react-windowed-select';
import ModalExerciseDetails from './ModalExerciseDetails';

const ModalExercise = ({ exerciseIndex, favoriteOption, exerciseOptions, handleSelectChange, selectValid, exercise, setNewEvent, handleInputChange, newEvent }) => {
    const customStyles = {
        groupHeading: (provided, state) => ({
            ...provided,
            backgroundColor: '#f0f0f0',
            fontSize: '1.2rem',
            padding: '10px 10px',
            color: '#333',
        }),
    };

    const findOptionInGroups = (groups, value) => {
        for (let group of groups) {
            if (typeof group.options === "undefined") continue;
            const option = group.options.find(opt => opt.value === value);
            if (option) {
                return option;
            }
        }
        return null;
    };

    const handleRemoveSet = (exerciseIndex, setIndex) => {
        const updatedExercises = [...newEvent.exercises];
        updatedExercises[exerciseIndex].details.splice(setIndex, 1);
        setNewEvent({ ...newEvent, exercises: updatedExercises });
    };

    const handleAddSet = (exerciseIndex) => {
        const updatedExercises = [...newEvent.exercises];
        updatedExercises[exerciseIndex].details.push({ repeats: '', weight: '' });
        setNewEvent({ ...newEvent, exercises: updatedExercises });
    };
    
    return (
        <div className="exercise-group">
            <Form.Group style={{ marginBottom: "0.5rem" }} controlId={`exerciseName-${exerciseIndex}`}>
                <WindowedSelect
                    defaultValue={null}
                    value={findOptionInGroups([favoriteOption, ...exerciseOptions], exercise.exercise_catalog_id)}
                    onChange={(e) => handleSelectChange(e, exerciseIndex)}
                    options={[favoriteOption, ...exerciseOptions]}
                    placeholder="Select exercise"
                    isClearable={true}
                    isSearchable={true}
                    filterOption={createFilter({ignoreAccents: false})}
                    className={selectValid[exerciseIndex] ? "" : "is-invalid"}
                    styles={customStyles}
                />
                <Form.Control.Feedback type="invalid">Please select the name of the exercise.</Form.Control.Feedback>
            </Form.Group>

            {exercise.details.map((detail, setIndex) => (
                <ModalExerciseDetails
                    key={setIndex}
                    setIndex={setIndex}
                    exerciseIndex={exerciseIndex}
                    detail={detail}
                    handleInputChange={handleInputChange}
                    handleRemoveSet={handleRemoveSet}
                />
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
    );
};

export default ModalExercise;
