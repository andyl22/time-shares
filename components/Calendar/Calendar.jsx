import styles from './Calendar.module.scss';
import CalendarDay from './CalendarDay';
import moment from 'moment';
import { useState } from 'react';
import { useEffect } from 'react';

export default function Calendar() {
  const [dates, setDates] = useState([]);

  useEffect(() => {
    let tempDates = [moment()];
    for (let i = 1; i < 7; i++) {
      tempDates.push(moment().add(i, 'days'));
    }
    setDates(tempDates);
  }, []);

  const mappedDates = dates.map((date) => (
    <CalendarDay key={date} date={date} />
  ));

  const shiftForward = () => {
    setDates([
      ...dates.slice(1, dates.length),
      moment(dates[dates.length - 1]).add(1, 'days')
    ]);
  };

  const shiftBackward = () => {
    setDates([
      moment(dates[0]).subtract(1, 'days'),
      ...dates.slice(0, dates.length - 1)
    ]);
  };

  return (
    <div className={styles.calendarContainer}>
      <div className={styles.calendarControl}>
        <button onClick={shiftBackward}>Previous Day</button>
        <button onClick={shiftForward}>Next Day</button>
      </div>
      <div className={styles.calendarDisplay}>{mappedDates}</div>
    </div>
  );
}
