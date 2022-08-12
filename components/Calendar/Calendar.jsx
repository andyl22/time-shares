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
  });

  const mappedDates = dates.map((date) => (
    <CalendarDay key={date} date={date} />
  ));

  return <div className={styles.calendarContainer}>{mappedDates}</div>;
}
