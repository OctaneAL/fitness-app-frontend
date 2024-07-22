import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import { Modal, Button, Form, Container, Card } from 'react-bootstrap';
import '../pages/Calendar.css';
import bgImage from '../assets/images/bg.jpg';
import { v4 as uuidv4 } from 'uuid';

// import WorkoutCard from './WorkoutCard';
import ExerciseCard from './ExerciseCard';

const CalendarComponent = () => {
  const [events, setEvents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const initialEventState = {
    id: uuidv4(),
    name: '',
    date: '',
    exercises: [{ name: '', sets: 1, details: [{ repeats: '', weight: '' }] }]
  };
  const [newEvent, setNewEvent] = useState(initialEventState);
  const [selectedDate, setSelectedDate] = useState(null);
  const [validated, setValidated] = useState(false);
  const [editEventId, setEditEventId] = useState(null);

  useEffect(() => {
    const loadScript = (src) => {
      return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = src;
        script.async = true;
        script.onload = resolve;
        script.onerror = reject;
        document.body.appendChild(script);
      });
    };

    const loadJQueryAndBootstrap = async () => {
      try {
        await loadScript('https://code.jquery.com/jquery-3.5.1.min.js');
        await loadScript('https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js');
        initCalendar();
      } catch (error) {
        console.error('Error loading scripts:', error);
      }
    };

    const initCalendar = () => {
      const Calendar = function (selector, options) {
        this.options = options;
        this.draw();
      };

      Calendar.prototype.draw = function () {
        this.getCookie('selected_day');
        this.getOptions();
        this.drawDays();
        const that = this;
        // const reset = document.getElementById('reset');
        const pre = document.getElementsByClassName('pre-button');
        const next = document.getElementsByClassName('next-button');

        pre[0].addEventListener('click', () => that.preMonth());
        next[0].addEventListener('click', () => that.nextMonth());
        // reset.addEventListener('click', () => that.reset());

        const days = document.getElementsByTagName('td');
        let daysLen = days.length;
        while (daysLen--) {
          days[daysLen].addEventListener('click', function () {
            that.clickDay(this);
          });
        }

         // Automatically select today's date on initial load
        const today = new Date();
        const todayCell = Array.from(days).find(day => day.innerHTML == today.getDate() && day.id !== 'disabled');
        console.log(todayCell);
        if (todayCell) {
          this.clickDay(todayCell);
        }
      };

      Calendar.prototype.drawHeader = function (e) {
        const headDay = document.getElementsByClassName('head-day');
        const headMonth = document.getElementsByClassName('head-month');

        e ? (headDay[0].innerHTML = e) : (headDay[0].innerHTML = day);
        headMonth[0].innerHTML = `${monthTag[month]} - ${year}`;
      };

      Calendar.prototype.drawDays = function () {
        const startDay = new Date(year, month, 1).getDay();
        const nDays = new Date(year, month + 1, 0).getDate();
        let n = startDay;

        for (let k = 0; k < 42; k++) {
          days[k].innerHTML = '';
          days[k].id = '';
          days[k].className = '';
        }

        for (let i = 1; i <= nDays; i++) {
          days[n].innerHTML = i;
          n++;
        }

        for (let j = 0; j < 42; j++) {
          if (days[j].innerHTML === '') {
            days[j].id = 'disabled';
          } else if (j === day + startDay - 1) {
            if (
              (this.options && month === setDate.getMonth() && year === setDate.getFullYear()) ||
              (!this.options && month === today.getMonth() && year === today.getFullYear())
            ) {
              this.drawHeader(day);
              days[j].id = 'today';
            }
          }
          if (selectedDay) {
            if (
              j === selectedDay.getDate() + startDay - 1 &&
              month === selectedDay.getMonth() &&
              year === selectedDay.getFullYear()
            ) {
              days[j].className = 'selected';
              this.drawHeader(selectedDay.getDate());
            }
          }
        }
      };

      Calendar.prototype.clickDay = function (o) {
        if (o.innerHTML === '') {
          return;
        }
        const selected = document.getElementsByClassName('selected');
        const len = selected.length;
        if (len !== 0) {
          selected[0].className = '';
        }

        let x = parseInt(o.innerHTML, 10) + 1; // Adding 1 cuz somehow it decreases by 1 in toISOSString func
        o.className = 'selected';
        selectedDay = new Date(year, month, x);
        this.drawHeader(o.innerHTML);
        this.setCookie('selected_day', 1);
        // Set selected date
        setSelectedDate(selectedDay.toISOString().split('T')[0]);
      };

      Calendar.prototype.preMonth = function () {
        if (month < 1) {
          month = 11;
          year -= 1;
        } else {
          month -= 1;
        }
        this.drawHeader(1);
        this.drawDays();
      };

      Calendar.prototype.nextMonth = function () {
        if (month >= 11) {
          month = 0;
          year += 1;
        } else {
          month += 1;
        }
        this.drawHeader(1);
        this.drawDays();
      };

      Calendar.prototype.getOptions = function () {
        if (this.options) {
          const sets = this.options.split('-');
          setDate = new Date(sets[0], sets[1] - 1, sets[2]);
          day = setDate.getDate();
          year = setDate.getFullYear();
          month = setDate.getMonth();
        }
      };

      Calendar.prototype.reset = function () {
        month = today.getMonth();
        year = today.getFullYear();
        day = today.getDate();
        this.options = undefined;
        this.drawDays();
      };

      Calendar.prototype.setCookie = function (name, expiredays) {
        let expires = '';
        if (expiredays) {
          const date = new Date();
          date.setTime(date.getTime() + expiredays * 24 * 60 * 60 * 1000);
          expires = '; expires=' + date.toGMTString();
        }
        document.cookie = name + '=' + selectedDay + expires + '; path=/';
      };

      Calendar.prototype.getCookie = function (name) {
        if (document.cookie.length) {
          const arrCookie = document.cookie.split(';');
          const nameEQ = name + '=';
          for (let i = 0, cLen = arrCookie.length; i < cLen; i++) {
            let c = arrCookie[i];
            while (c.charAt(0) === ' ') {
              c = c.substring(1, c.length);
            }
            if (c.indexOf(nameEQ) === 0) {
              selectedDay = new Date(c.substring(nameEQ.length, c.length));
            }
          }
        }
      };

      const today = new Date();
      let year = today.getFullYear();
      let month = today.getMonth();
      const monthTag = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
      ];
      let day = today.getDate();
      const days = document.getElementsByTagName('td');
      let selectedDay;
      let setDate;
      // let daysLen = days.length;
      // const calendar = new Calendar();
      new Calendar();
    };

    loadJQueryAndBootstrap();
  }, []);

  const handleDeleteEvent = (id) => {
    const updatedEvents = events.filter((event) => event.id !== id);
    // const updatedEvents = events.filter((_, i) => i !== index);
    setEvents(updatedEvents);
  };

  const handleShowModal = () => {
    setEditEventId(null);
    setShowModal(true);
  };

  const handleEditEvent = (eventId) => {
    // const eventToEdit = filteredEvents[eventIndex];
    const eventToEdit = events.find((event) => event.id === eventId);
    console.log(eventToEdit);
    setNewEvent(eventToEdit || initialEventState);
    setEditEventId(eventId);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditEventId(null);
    setNewEvent(initialEventState);
  };
  
  const handleAddEvent = (event) => {
    const form = event.currentTarget;
    event.preventDefault();

    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      let updatedEvents;
      if (editEventId !== null) {
        // updatedEvents = [...events];
        // updatedEvents[editEvent] = { ...newEvent, date: selectedDate };
        updatedEvents = events.map((evt) => (evt.id === editEventId ? { ...newEvent, date: selectedDate } : evt));
      } else {
        // updatedEvents = [...events, { ...newEvent, date: selectedDate }];
        updatedEvents = [...events, { ...newEvent, id: uuidv4(), date: selectedDate }];
      }
      setEvents(updatedEvents);
      setShowModal(false);
      setNewEvent(initialEventState);
      setEditEventId(null);
    }
    setValidated(true);
  };


  const handleInputChange = (e, exerciseIndex, field, setIndex) => {
    const { value } = e.target;
    const updatedExercises = [...newEvent.exercises];
    if (setIndex !== undefined) {
      updatedExercises[exerciseIndex].details[setIndex][field] = value;
    } else {
      updatedExercises[exerciseIndex][field] = value;
    }
    setNewEvent({ ...newEvent, exercises: updatedExercises });
  };

  const handleSetsChange = (e, exerciseIndex) => {
    const { value } = e.target;
    let sets = parseInt(value, 10);
  
    if (isNaN(sets) || value === '') {
      sets = 0;
    }
    if (sets > 20) {
      sets = 20;
    }
  
    const updatedExercises = [...newEvent.exercises];
    updatedExercises[exerciseIndex].sets = sets;
  
    updatedExercises[exerciseIndex].details = Array(sets)
      .fill(null)
      .map((_, idx) => updatedExercises[exerciseIndex].details[idx] || { repeats: '', weight: '' });
    setNewEvent({ ...newEvent, exercises: updatedExercises });
  };
  

  const filteredEvents = selectedDate ? events.filter((event) => event.date == selectedDate) : events;

  return (
    <section>
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-8">
            <div className="calendar elegant-calencar d-md-flex">
              <div className="wrap-header d-flex align-items-center img" style={{ backgroundImage: `url(${bgImage})` }}>
                {/* <p id="reset">Today</p> */}
                <div id="header" className="p-0">
                  <div className="head-info">
                    <div className="head-month"></div>
                    <div className="head-day"></div>
                  </div>
                </div>
              </div>
              <div className="calendar-wrap">
                <div className="w-100 button-wrap">
                  <div className="pre-button d-flex align-items-center justify-content-center">
                    <i className="fa fa-chevron-left"></i>
                  </div>
                  <div className="next-button d-flex align-items-center justify-content-center">
                    <i className="fa fa-chevron-right"></i>
                  </div>
                </div>
                <table id="calendar">
                  <thead>
                    <tr>
                      <th>Sun</th>
                      <th>Mon</th>
                      <th>Tue</th>
                      <th>Wed</th>
                      <th>Thu</th>
                      <th>Fri</th>
                      <th>Sat</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                    </tr>
                    <tr>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                    </tr>
                    <tr>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                    </tr>
                    <tr>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                    </tr>
                    <tr>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                    </tr>
                    <tr>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                    </tr>
                  </tbody>
                </table>
                <div className="d-flex justify-content-end mt-3">
                  <Button variant="primary" onClick={() => handleShowModal()}>
                    Додати тренування
                  </Button>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="training-list elegant-calencar">
              <div className="d-flex align-items-center" style={{ backgroundColor: '#2C3E50', color: '#fff' }}>
                <div className="p-0">
                  <div className="head-info">
                    <h5 className="training-list-title">Список тренувань</h5>
                  </div>
                </div>
              </div>
              <Container className="mt-4">
                <div className="training-list-wrap" style={{ maxHeight: '600px', overflowY: 'auto', padding: '0px' }}>
                  {filteredEvents.map((workout, index) => (
                    <Card className="mb-4">
                      <Card.Header as="h5" style={{ marginBottom: "1rem" }}>{workout.name}</Card.Header>
                      {workout.exercises.map((exercise, index) => (
                        <ExerciseCard key={index} exercise={exercise} />
                      ))}<div className="d-flex justify-content-between">
                        <Button variant="secondary" style={{ margin: '10px', marginTop: '0px' }} onClick={() => handleEditEvent(workout.id)}>Редагувати</Button>
                        <Button variant="danger" style={{ margin: '10px', marginTop: '0px' }} onClick={() => handleDeleteEvent(workout.id)}>Видалити</Button>
                      </div>
                      
                    </Card>
                  ))}
                </div>
              </Container>
              {/* <div className="training-list-wrap" style={{ maxHeight: '400px', overflowY: 'auto', padding: '10px' }}>
                <ul className="list-group">
                  {filteredEvents.map((event, index) => (
                    <li key={index} className="list-group-item">
                      <strong>{event.name}</strong>
                      <ul>
                        {event.exercises.map((exercise, idx) => (
                          <li key={idx}>
                            {exercise.name}: {exercise.sets} підходів
                            <ul>
                              {exercise.details.map((detail, detailIdx) => (
                                <li key={detailIdx}>
                                  Повтори: {detail.repeats}, Вага: {detail.weight} кг
                                </li>
                              ))}
                            </ul>
                          </li>
                        ))}
                      </ul>
                      <div className="d-flex justify-content-between">
                        <Button variant="secondary" onClick={() => handleEditEvent(event.id)}>Редагувати</Button>
                        <Button variant="danger" onClick={() => handleDeleteEvent(event.id)}>Видалити</Button>
                      </div>
                    </li>
                  ))}
                </ul>
              </div> */}
            </div>
          </div>
        </div>
      </div>

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
            {newEvent.exercises.map((exercise, exerciseIndex) => (
              <div key={exerciseIndex} className="exercise-group">
                <Form.Group controlId={`exerciseName-${exerciseIndex}`}>
                  <Form.Label>Назва вправи</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Введіть назву вправи"
                    value={exercise.name}
                    onChange={(e) => handleInputChange(e, exerciseIndex, 'name')}
                    required
                  />
                  <Form.Control.Feedback type="invalid">Будь ласка, введіть назву вправи.</Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId={`exerciseSets-${exerciseIndex}`}>
                  <Form.Label>Кількість підходів</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Введіть кількість підходів"
                    value={exercise.sets}
                    onChange={(e) => handleSetsChange(e, exerciseIndex)}
                    min="0"
                    max="20"
                    required
                  />
                  <Form.Control.Feedback type="invalid">Кількість підходів повинна бути більше 0.</Form.Control.Feedback>
                </Form.Group>
                {exercise.details.map((detail, setIndex) => (
                  <div key={setIndex} className="set-details">
                    <h4>Підхід {setIndex + 1}</h4>
                    <Form.Group controlId={`exerciseRepeats-${exerciseIndex}-${setIndex}`}>
                      <Form.Label>Кількість повторів</Form.Label>
                      <Form.Control
                        type="number"
                        placeholder="Введіть кількість повторів"
                        value={detail.repeats}
                        onChange={(e) => handleInputChange(e, exerciseIndex, 'repeats', setIndex)}
                        min="1"
                        required
                      />
                      <Form.Control.Feedback type="invalid">Кількість повторів повинна бути більше 0.</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group controlId={`exerciseWeight-${exerciseIndex}-${setIndex}`}>
                      <Form.Label>Вага (кг)</Form.Label>
                      <Form.Control
                        type="number"
                        placeholder="Введіть вагу"
                        value={detail.weight}
                        onChange={(e) => handleInputChange(e, exerciseIndex, 'weight', setIndex)}
                        min="0"
                        required
                      />
                      <Form.Control.Feedback type="invalid">Будь ласка, введіть вагу.</Form.Control.Feedback>
                    </Form.Group>
                  </div>
                ))}
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

    </section>
  );
};

export default CalendarComponent;
