import React, { useState, useEffect } from 'react'
import CalendarComponent from '../components/CalendarMonthComponent';
import ExerciseBriefComponent from '../components/ExerciseBriefComponent';
import NoWorkouts from './NoWorkoutsComponent';

const MonthView = ({ exercises, setView, setCurrentWeek, selectedDate, setSelectedDate }) => {
    const [filteredExercises, setFilteredExercises] = useState([]);
  
  // Функція для визначення першого дня тижня
  const getFirstDayOfWeek = (date) => {
    const firstDay = new Date(date);
    firstDay.setDate(date.getDate() - date.getDay());
    return firstDay;
  };

  // Функція для визначення останнього дня тижня
  const getLastDayOfWeek = (date) => {
    const lastDay = new Date(date);
    lastDay.setDate(date.getDate() - date.getDay() + 6);
    return lastDay;
  };

  // Функція для розбиття дат на тижні
  const getWeeksInMonth = (year, month) => {
    const weeks = [];
    const date = new Date(year, month, 1);
    let weekStart = getFirstDayOfWeek(date);
    let weekEnd = getLastDayOfWeek(date);

    while (weekStart.getMonth() === month || weekEnd.getMonth() === month) {
      weeks.push({
        start: new Date(weekStart),
        end: new Date(weekEnd)
      });

      weekStart.setDate(weekStart.getDate() + 7);
      weekEnd.setDate(weekEnd.getDate() + 7);
    }

    return weeks;
  };

  useEffect(() => {
    if (!selectedDate) return;
    const date = new Date(selectedDate);
    const year = date.getFullYear();
    const month = date.getMonth();

    const weeksInMonth = getWeeksInMonth(year, month);

    const filtered = weeksInMonth.map((week) => {
      return {
        week,
        exercises: exercises.filter((exercise) => {
          const [year, month, day] = exercise.date.split('-').map(Number);
          const exerciseDate = new Date(year, month - 1, day);
          return exerciseDate >= week.start && exerciseDate <= week.end;
        })
      };
    });

    // All weeks, even with no workouts
    // setFilteredExercises(filtered);

    // Only weeks with at least 1 workout
    const nonEmptyFiltered = Object.values(filtered).filter(week => week.exercises.length > 0);
    setFilteredExercises(nonEmptyFiltered);

  }, [exercises, selectedDate]);
  
  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const onWeekClick = (week) => {
    setCurrentWeek(week);
    setView('week');
  };

    return (
      <div>
        <CalendarComponent selectedDate={selectedDate} setSelectedDate={setSelectedDate} workouts={exercises} />
        { filteredExercises.length === 0 ? (
            <NoWorkouts />
          ) :
          filteredExercises.map((week, index) => (
            <div key={index} onClick={() => onWeekClick(week.week)}>
              <ExerciseBriefComponent title={formatDate(week.week.start) + " - " + formatDate(week.week.end)} numberOfWorkouts={week.exercises.length}/>
            </div>
          ))
        }
      </div>
    );
};

export default MonthView;