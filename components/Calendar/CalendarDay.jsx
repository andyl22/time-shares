import { useState } from 'react';
import styles from './CalendarDay.module.scss';
import Dialog from '../Dialog/Dialog';
import CalendarBooking from './CalendarBooking';
import { useRef } from 'react';
import { postHTTP } from '../../utilities/api';
import PropTypes from 'prop-types';

export default function CalendarDay(props) {
  const { date } = props;
  const [showDialog, setShowDialog] = useState(false);
  const [timeSlice, setTimeSlice] = useState([]);
  /* TBD: query for times for this specific date that is possed in the props to retrieve already booked times*/
  const [bookedTimes, setBookedTimes] = useState([]);
  const timeUnitsNode = useRef();

  const toggleDialog = (e) => {
    e.stopPropagation();
    setShowDialog(!showDialog);
  };

  const persistDialog = () => {
    setBookedTimes([...bookedTimes, timeSlice]);
    setTimeSlice([]);
  };

  const listenToDrag = (e) => {
    const originalValue = e.target.value;

    const handleDrag = (e) => {
      if (
        e.target.value === undefined ||
        e.target.parentNode !== timeUnitsNode.current
      )
        return;
      setTimeSlice([originalValue, e.target.value]);
    };

    document.addEventListener('mouseover', handleDrag);
    document.addEventListener(
      'mouseup',
      (e) => {
        document.removeEventListener('mouseover', handleDrag);
        toggleDialog(e);
        if ((timeSlice.length < 2) & (e.target.value === originalValue)) {
          setTimeSlice([originalValue, originalValue]);
        }
      },
      { once: true }
    );
  };

  const hours = [
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
    21, 22, 23, 24
  ];

  const mappedHours = hours.map((time) => (
    <li
      className={`${styles.timeUnit} ${
        time >= timeSlice[0] && time <= timeSlice[1] && styles.color
      } ${time <= timeSlice[0] && time >= timeSlice[1] && styles.color}`}
      key={time}
      value={time}
      onMouseDown={listenToDrag}
    >
      {time}
    </li>
  ));

  const mappedBookings = bookedTimes.map((timeSlot) => {
    return <CalendarBooking key={timeSlot} timeSlot={timeSlot} />;
  });

  return (
    <div className={styles.calendarDayContainer}>
      <div className={styles.dayHeader}>{date.format('MMM Do YY')}</div>
      <div className={styles.hourTimes} ref={timeUnitsNode}>
        {mappedBookings}
        {mappedHours}
      </div>
      <Dialog
        dialogHeader="Book a time"
        dialogContent={<p>Content</p>}
        show={showDialog}
        hideDialog={toggleDialog}
        dialogConfirmAction={() => {
          postHTTP('/createNewBooking', {
            name: 'test',
            description: 'test',
            rate: 35,
            image: 'test',
            category: 'test'
          })
            .then(() => persistDialog())
            .catch((err) => console.log(err));
        }}
        dialogCancelAction={() => {
          setTimeSlice([]);
        }}
      />
    </div>
  );
}

CalendarDay.propTypes = {
  date: PropTypes.object
};
