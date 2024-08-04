import React, { useState, useEffect } from 'react'
import ExerciseComponent from './ExerciseComponent';
import { Container, Col, Row } from 'react-bootstrap';
import '../styles/WeekView.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

const WeekView = ({ workouts, onEditEvent, onDeleteEvent, currentWeek, setCurrentWeek }) => {
    const [currentWeekWorkouts, setCurrentWeekWorkouts] = useState([]);

    const getNextWeek = () => {
        const nextWeekStart = new Date(currentWeek.start.setDate(currentWeek.start.getDate() + 7));
        const nextWeekEnd = new Date(currentWeek.end.setDate(currentWeek.end.getDate() + 7));
        return { start: nextWeekStart, end: nextWeekEnd };
    };

    const getPreviousWeek = () => {
        const prevWeekStart = new Date(currentWeek.start.setDate(currentWeek.start.getDate() - 7));
        const prevWeekEnd = new Date(currentWeek.end.setDate(currentWeek.end.getDate() - 7));
        return { start: prevWeekStart, end: prevWeekEnd };
    };

    const formatDate = (date) => {
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    };

    function strToUTCDate(date){
        let localTimeDate = new Date(date);

        const year = localTimeDate.getFullYear();
        const month = localTimeDate.getMonth();
        const day = localTimeDate.getUTCDate();

        let UTCDate = new Date(year, month, day);

        return UTCDate;
    }
    const countExerciseDays = () => {
        const exerciseDays = workouts.filter(exercise => {
            const exerciseDate = strToUTCDate(exercise.date);

            return exerciseDate >= currentWeek.start && exerciseDate <= currentWeek.end;
        });
        return new Set(exerciseDays.map(exercise => new Date(exercise.date).getDay())).size;
    };

    const countTotalExercises = () => {
        return workouts.filter(exercise => {
            const exerciseDate = strToUTCDate(exercise.date);
            return exerciseDate >= currentWeek.start && exerciseDate <= currentWeek.end;
        }).length;
    };

    const renderDayStatus = (day) => {
        const exerciseDate = new Date(currentWeek.start);
        exerciseDate.setDate(currentWeek.start.getDate() + day);
        const hasExercise = workouts.some(exercise => {
            const date = new Date(exercise.date + 'T00:00:00Z');
            return date.toDateString() === exerciseDate.toDateString();
        });
        return (
            <div className={`day ${hasExercise ? 'active' : ''}`}>
                <span>{exerciseDate.toLocaleDateString('en-US', { weekday: 'short' })[0]}</span>
            </div>
        );
    };

  const groupedWorkouts = currentWeekWorkouts.reduce((groups, workout) => {
    const date = workout.date.split('T')[0];

    if (!groups[date]) {
        groups[date] = [];
    }
    groups[date].push(workout);

    // Sorting by dates
    const sortedDates = Object.keys(groups).sort((a, b) => new Date(a) - new Date(b));

    const sortedGroupedWorkouts = sortedDates.reduce((sortedAcc, date) => {
      sortedAcc[date] = groups[date];
      return sortedAcc;
    }, {});

    return sortedGroupedWorkouts;
}, {});

  
  useEffect(() => {
    const filteredWorkouts = workouts.filter(workout => {
        let workoutDate = strToUTCDate(workout.date);

        return workoutDate >= currentWeek.start && workoutDate <= currentWeek.end;
    });
    setCurrentWeekWorkouts(filteredWorkouts);
}, [currentWeek, workouts]);

    return (
        <Container>
            <div className="week-view">
                <Row className="d-flex align-items-center justify-content-center">
                    <Col>
                        <div
                            className="d-inline-block align-items-center justify-content-center arrow-button"
                            onClick={() => setCurrentWeek(getPreviousWeek())}
                        >
                            <FontAwesomeIcon icon={faChevronLeft} size="2x" className="text-primary" />
                        </div>
                    </Col>
                    <Col>
                        <h4 style = {{ marginBottom: "0px" }} >{formatDate(currentWeek.start)} – {formatDate(currentWeek.end)}</h4>
                    </Col>
                    <Col>
                        <div
                            className="d-inline-block align-items-center justify-content-center arrow-button"
                            onClick={() => setCurrentWeek(getNextWeek())}
                        >
                            <FontAwesomeIcon icon={faChevronRight} size="2x" className="text-primary" />
                        </div>
                    </Col>
                </Row>
                <div className="summary">
                    <h2>{countExerciseDays()} of 5 exercise days</h2>
                    <p>You exercised a total of {countTotalExercises()} times</p>
                </div>
                <div className="days">
                    {Array.from({ length: 7 }, (_, index) => renderDayStatus(index))}
                </div>
            </div>
            <div className="workout-summary">
                {Object.keys(groupedWorkouts).map(date => (
                    <div key={date} className="workout-group">
                        <h3>{new Date(date).toDateString()}</h3>
                        {groupedWorkouts[date].map((workout, index) => (
                            <ExerciseComponent
                                key={index}
                                workout={workout}
                                onEditEvent={onEditEvent}
                                onDeleteEvent={onDeleteEvent}
                            />
                        ))}
                    </div>
                ))}
            </div>
        </Container>
    );
} 

export default WeekView;