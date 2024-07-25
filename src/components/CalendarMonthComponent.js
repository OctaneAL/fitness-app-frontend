import React, { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import '../styles/CalendarMonth.css';

const CalendarComponent = ({ selectedDate, setSelectedDate, workouts }) => {
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

    const highlightWorkoutDays = (year, month) => {
      const days = document.getElementsByTagName('td');
      const workoutDates = workouts.map(workout => workout.date.split('T')[0]);
      for (let day of days) {
        if (day.innerHTML === '') {
          day.id = 'disabled';
          continue;
        }
        let x = parseInt(day.innerHTML) + 1;
        const date = new Date(year, month, x).toISOString().split('T')[0];
        if (workoutDates.includes(date)) {
          day.classList.add('workout-day');
        } else {
          day.classList.remove('workout-day');
        }
      }
    };

    const initCalendar = () => {
      const Calendar = function () {
        this.draw();
      };

      Calendar.prototype.draw = function () {
        this.getOptions();
        this.drawDays();
        this.drawHeader();
        const that = this;
        const pre = document.getElementsByClassName('pre-button');
        const next = document.getElementsByClassName('next-button');

        pre[0].addEventListener('click', () => that.preMonth());
        next[0].addEventListener('click', () => that.nextMonth());

        this.highlightToday();
        highlightWorkoutDays(year, month);
      };

      Calendar.prototype.highlightToday = function () {
        const today = new Date();
        const days = document.getElementsByTagName('td');
        for (let day of days) {
          if (today.getMonth() === month && today.getFullYear() === year && day.innerHTML == today.getDate() && day.id !== 'disabled') {
            day.id = 'today';
          } else {
            day.id = '';
          }
        }
      };

      Calendar.prototype.drawHeader = function () {
        const headMonth = document.getElementsByClassName('head-month');
        headMonth[0].textContent = `${monthTag[month]} - ${year}`;
      };

      Calendar.prototype.drawDays = function () {
        const startDay = new Date(year, month, 1).getDay();
        const nDays = new Date(year, month + 1, 0).getDate();
        let n = startDay;
        const days = document.getElementsByTagName('td');

        for (let k = 0; k < 42; k++) {
          days[k].innerHTML = '';
          days[k].id = '';
        }

        for (let i = 1; i <= nDays; i++) {
          days[n].innerHTML = i;
          n++;
        }
        
        this.highlightToday();
        highlightWorkoutDays(year, month);
      };

      Calendar.prototype.preMonth = function () {
        if (month < 1) {
          month = 11;
          year -= 1;
        } else {
          month -= 1;
        }
        this.updateSelectedDate();
        this.drawHeader();
        this.drawDays();
      };

      Calendar.prototype.nextMonth = function () {
        if (month >= 11) {
          month = 0;
          year += 1;
        } else {
          month += 1;
        }
        this.updateSelectedDate();
        this.drawHeader();
        this.drawDays();
      };

      Calendar.prototype.updateSelectedDate = function () {
        const newDate = new Date(year, month + 1, 1);
        setSelectedDate(newDate.toISOString().split('T')[0]);
      };

      Calendar.prototype.getOptions = function () {
        if (this.options) {
          const sets = this.options.split('-');
          setDate = new Date(sets[0], sets[1] - 1, sets[2]);
          year = setDate.getFullYear();
          month = setDate.getMonth();
        }
      };

      const today = new Date(selectedDate);
      let year = today.getFullYear();
      let month = today.getMonth();
      const monthTag = [
        'January', 'February', 'March', 'April', 'May', 'June', 'July',
        'August', 'September', 'October', 'November', 'December'
      ];
      let setDate;
      new Calendar();
    };
    
    loadJQueryAndBootstrap();
  }, [setSelectedDate, workouts]);

  return (
    <section>
      <div className="container mt-5" style={{ marginBottom: "1rem" }}>
        <div className="row">
          <div className="col-md-12">
            <div className="calendar elegant-calencar d-md-flex">
              <div className="calendar-wrap">
                <div className="container">
                  <div className="row align-items-center">
                    <div className="col-auto">
                      <div className="pre-button d-flex align-items-center justify-content-center arrow-button">
                        <i className="fa fa-chevron-left"></i>
                      </div>
                    </div>
                    <div className="col text-center">
                      <h4 className="head-month"></h4>
                    </div>
                    <div className="col-auto">
                      <div className="next-button d-flex align-items-center justify-content-center arrow-button">
                        <i className="fa fa-chevron-right"></i>
                      </div>
                    </div>
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CalendarComponent;
