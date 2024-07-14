import React, { useEffect, useState } from 'react';
import $ from 'jquery';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import { Modal, Button, Form } from 'react-bootstrap';
import '../pages/Calendar.css';
import bgImage from '../assets/images/bg.jpg';

const CalendarComponent = () => {
  const [events, setEvents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newEventName, setNewEventName] = useState('');
  const [selectedDate, setSelectedDate] = useState(null);

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
        const reset = document.getElementById('reset');
        const pre = document.getElementsByClassName('pre-button');
        const next = document.getElementsByClassName('next-button');

        pre[0].addEventListener('click', () => that.preMonth());
        next[0].addEventListener('click', () => that.nextMonth());
        reset.addEventListener('click', () => that.reset());

        const days = document.getElementsByTagName('td');
        let daysLen = days.length;
        while (daysLen--) {
          days[daysLen].addEventListener('click', function () {
            that.clickDay(this);
          });
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
        const selected = document.getElementsByClassName('selected');
        const len = selected.length;
        if (len !== 0) {
          selected[0].className = '';
        }
        o.className = 'selected';
        selectedDay = new Date(year, month, o.innerHTML);
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
      let daysLen = days.length;
      const calendar = new Calendar();
    };

    loadJQueryAndBootstrap();
  }, []);

  const handleAddEvent = () => {
    const newEvent = {
      date: selectedDate,
      eventName: newEventName,
    };
    setEvents([...events, newEvent]);
    setNewEventName('');
    setShowModal(false);
  };

  const handleInputChange = (e) => {
    setNewEventName(e.target.value);
  };

  const filteredEvents = events.filter(event => event.date === selectedDate);

  return (
    <section className="ftco-section">
      <div className="container">
        <div className="row">
          <div className="col-md-8">
            <div className="elegant-calencar d-md-flex">
              <div className="wrap-header d-flex align-items-center img" style={{ backgroundImage: `url(${bgImage})` }}>
                <p id="reset">Today</p>
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
                  <Button variant="primary" onClick={() => setShowModal(true)}>
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
              <div className="training-list-wrap" style={{ maxHeight: '400px', overflowY: 'auto', padding: '10px' }}>
                <ul className="list-group">
                  {filteredEvents.map((event, index) => (
                    <li key={index} className="list-group-item">
                      {event.date}: {event.eventName}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Додати тренування</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="eventName">
              <Form.Label>Назва тренування</Form.Label>
              <Form.Control
                type="text"
                placeholder="Введіть назву тренування"
                value={newEventName}
                onChange={handleInputChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Закрити
          </Button>
          <Button variant="primary" onClick={handleAddEvent}>
            Зберегти
          </Button>
        </Modal.Footer>
      </Modal>
    </section>
  );
};

export default CalendarComponent;
