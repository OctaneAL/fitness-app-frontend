import React, { useState } from 'react';
import WeekView from '../components/WeekView'
import MonthView from '../components/MonthView';
import ToggleButton from '../components/WorkoutToggleButton';
import AddWorkoutModal from '../components/AddWorkoutModal';
import { Button, Container, Row } from 'react-bootstrap';
import { v4 as uuidv4 } from 'uuid';
import { startOfMonth, endOfMonth, eachDayOfInterval, getWeek, getYear } from 'date-fns';

// Функція для визначення унікального номера тижня
const getUniqueWeekNumber = (date) => {
  const year = getYear(date);
  const week = getWeek(date);
  return `${year}-${week}`;
};

// Функція для визначення всіх тижнів у місяці
const getWeeksInMonth = (year, month) => {
  const firstDayOfMonth = startOfMonth(new Date(year, month - 1));
  const lastDayOfMonth = endOfMonth(new Date(year, month - 1));
  const allDays = eachDayOfInterval({ start: firstDayOfMonth, end: lastDayOfMonth });

  const weekNumbers = new Set();
  allDays.forEach(date => {
    weekNumbers.add(getUniqueWeekNumber(date));
  });

  return weekNumbers;
};

// console.log(getUniqueWeekNumber("2024-06-29"));
// console.log(getUniqueWeekNumber("2024-07-01"));

// console.log(`Weeks in July 2024:`, getWeeksInMonth(2024, 7));

// Головний компонент Workout
const Workout = () => {
  const [validated, setValidated] = useState(false);
  const [events, setEvents] = useState([
    {
      "id": "1759b35d-e3c9-483d-951c-fa83e7424672",
      "name": "Груди",
      "date": "2024-07-18",
      "exercises": [
          {
              "name": "Жим лежачи",
              "details": [
                  {
                      "repeats": "521356",
                      "weight": "123"
                  },
                  {
                      "repeats": "4124",
                      "weight": "124"
                  },
                  {
                      "repeats": "421",
                      "weight": "142"
                  }
              ]
          }
      ],
      "duration": "60"
    },
    {
      "id": "1759b35d-e3c9-483d-951c-fa83e7424674",
      "name": "Ноги",
      "date": "2024-07-20",
      "exercises": [
          {
              "name": "Присідання",
              "details": [
                  {
                      "repeats": "52",
                      "weight": "123"
                  },
                  {
                      "repeats": "4124",
                      "weight": "124"
                  },
                  {
                      "repeats": "421",
                      "weight": "142"
                  }
              ]
          }
      ],
      "duration": "90"
    }
  ]);

  const [showModal, setShowModal] = useState(false);
  const initialEventState = {
    id: uuidv4(),
    name: '',
    date: '',
    exercises: [{ name: '', details: [{ repeats: '', weight: '' }] }]
  };
  const [newEvent, setNewEvent] = useState(initialEventState);
  const [editEventId, setEditEventId] = useState(null);

  const [view, setView] = useState('week');

  const handleCloseModal = () => {
    setShowModal(false);
    setEditEventId(null);
    setNewEvent(initialEventState);
    setValidated(false);
  };

  const handleDeleteEvent = (id) => {
    const updatedEvents = events.filter((event) => event.id !== id);
    setEvents(updatedEvents);
  };

  const handleEditEvent = (id) => {
    console.log("edit", id)
    const eventToEdit = events.find((evt) => evt.id === id);
    if (eventToEdit) {
      setNewEvent(eventToEdit);
      setEditEventId(id);
      setShowModal(true);
    }
  };
  
  const handleAddEvent = (event) => {
    const form = event.currentTarget;
    event.preventDefault();
    if (form.checkValidity() === false) {
      event.stopPropagation();
      setValidated(true);
    } else {
      let updatedEvents;
      if (editEventId !== null) {
        updatedEvents = events.map((evt) => (evt.id === editEventId ? { ...newEvent } : evt));
      } else {
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
            Додати тренування
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
        />
      </Container>
  );
};

export default Workout;
