import React, { useState, useEffect } from 'react';
import WeekView from '../components/WeekView'
import MonthView from '../components/MonthView';
import ToggleButton from '../components/WorkoutToggleButton';
import AddWorkoutModal from '../components/AddWorkoutModal';
import { Button, Container, Row } from 'react-bootstrap';
import { v4 as uuidv4 } from 'uuid';

import { useAuth } from '../services/auth';

import { getAllUserWorkouts, updateWorkout, addWorkout, deleteWorkout } from '../services/api';

// Функція для визначення унікального номера тижня
// import { getWeek, getYear } from 'date-fns';
// const getUniqueWeekNumber = (date) => {
//   const year = getYear(date);
//   const week = getWeek(date);
//   return `${year}-${week}`;
// };

// Головний компонент Workout
const Workout = () => {
  const [validated, setValidated] = useState(false);

  const [events, setEvents] = useState([]);

  const [showModal, setShowModal] = useState(false);

  const initialExerciseState = { exercise_catalog_id: '', details: [{ repeats: '', weight: '' }] };
  const initialEventState = {
    id: uuidv4(),
    name: '',
    date: '',
    planned_volume: '',
    exercises: [initialExerciseState]
  };

  const [newEvent, setNewEvent] = useState(initialEventState);
  const [editEventId, setEditEventId] = useState(null);

  const { user_id } = useAuth();

  const [view, setView] = useState('week');

  useEffect(() => {
    getAllUserWorkouts(user_id)
        .then(data => {
            setEvents(data); // data вже є масивом
            // setLoading(false);
        })
        .catch(error => {
            // setError(error.message);
            // setLoading(false);
            console.log("bad, bro");
        });
}, [user_id]);

  const handleCloseModal = () => {
    setShowModal(false);
    setEditEventId(null);
    setNewEvent(initialEventState);
    setValidated(false);
  };

  const handleDeleteEvent = (id) => {
    deleteWorkout(id);
    const updatedEvents = events.filter((event) => event.id !== id);
    setEvents(updatedEvents);
  };

  const handleEditEvent = (id) => {
    const eventToEdit = events.find((evt) => evt.id === id);
    if (eventToEdit) {
      setNewEvent(eventToEdit);
      setEditEventId(id);
      setShowModal(true);
    }
  };

  function getPlannedVolume(workout) {
    let res = 0;
    for (let exercise of workout.exercises){
      for (let detail of exercise.details){
        res += parseInt(detail.weight) * parseInt(detail.repeats);
      }
    }
    return res;
  }
  
  const handleAddEvent = (event) => {
    const form = event.currentTarget;
    
    event.preventDefault();
    if (form.checkValidity() === false) {
      event.stopPropagation();
      setValidated(true);
    } else {
      let updatedEvents;
      
      newEvent['planned_volume'] = getPlannedVolume(newEvent);
      for (let exercise of newEvent['exercises']){
        exercise['exercise_catalog_id'] = parseInt(exercise['exercise_catalog_id']);
      }

      if (editEventId !== null) {
        updateWorkout(editEventId, newEvent);
        // setEvents(events.map(evt => (evt.id === editEventId ? newEvent : evt)));
        updatedEvents = events.map((evt) => (evt.id === editEventId ? { ...newEvent } : evt));
      } else {
        const id = uuidv4();
        addWorkout(id, newEvent, user_id);
        updatedEvents = [...events, { ...newEvent, id: uuidv4() }];
        
      }
      setEvents(updatedEvents);
      handleCloseModal();
    }
  };

  const getCurrentWeek = () => {
    const now = new Date();

    const year = now.getFullYear();
    const month = now.getMonth();
    const day = now.getDay();
    
    const firstDayOfWeek = new Date(year, month, day);
    
    firstDayOfWeek.setDate(now.getDate() - now.getDay());
    // firstDayOfWeek.setUTCHours(0, 0, 0, 0);

    const lastDayOfWeek = new Date(firstDayOfWeek);
    lastDayOfWeek.setDate(firstDayOfWeek.getDate() + 6);

    return { start: firstDayOfWeek, end: lastDayOfWeek };
};

  const [currentWeek, setCurrentWeek] = useState(getCurrentWeek());
  const [selectedDate, setSelectedDate] = useState(new Date());
  

  return (
      <Container className="mt-5">
        <Row>
          <ToggleButton view={view} setView={setView} />
        </Row>
        <Row>
            {view === 'week' ? <WeekView workouts={events} onEditEvent={handleEditEvent} onDeleteEvent={handleDeleteEvent} currentWeek={currentWeek} setCurrentWeek={setCurrentWeek} /> : <MonthView exercises={events} setView={setView} setCurrentWeek={setCurrentWeek} selectedDate={selectedDate} setSelectedDate={setSelectedDate} />}
            
            {/* <Row className="w-100">
              <ExerciseBriefComponent />
              <ExerciseBriefComponent />
            </Row> */}
            {/* <Row className="w-100">
              <ExerciseComponent />
              <ExerciseComponent />
            </Row> */}
          
        </Row>
        <Row>
          <Button
            variant="success"
            className="mt-3"
            onClick={() => setShowModal(true)}
          >
            Add workout
          </Button>
        </Row>
        
        <AddWorkoutModal
          showModal={showModal}
          handleCloseModal={handleCloseModal}
          handleAddEvent={handleAddEvent}
          newEvent={newEvent}
          validated={validated}
          setNewEvent={setNewEvent}
          editEventId={null}
          initialExerciseState={initialExerciseState}
        />
      </Container>
  );
};

export default Workout;
