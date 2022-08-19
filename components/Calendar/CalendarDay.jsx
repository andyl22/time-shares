import styles from './CalendarDay.module.scss';
import Dialog from '../Dialog/Dialog';
import CalendarBooking from './CalendarBooking';
import { useState, useRef, useContext } from 'react';
import PropTypes from 'prop-types';
import { postHTTP } from '../../utilities/api';

export default function CalendarDay(props) {
  const { date } = props;
  const [showDialog, setShowDialog] = useState(false);
  const [timeSlice, setTimeSlice] = useState([]);
  /* TBD: query for times for this specific date that is possed in the props to retrieve already booked times*/
  const [bookedTimes, setBookedTimes] = useState([]);
  const timeUnitsNode = useRef();
  const user = useContext(EntityDetails);
  console.log(user);

  const toggleDialog = (e) => {
    e.stopPropagation();
    setShowDialog(!showDialog);
  };

  const persistDialog = async () => {
    const body = {
      startTime: timeSlice[0],
      endTime: timeSlice[1]
    };
    postHTTP('/createNewEntityBooking', body).then((res) => console.log(res));
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
        show={showDialog}
        hideDialog={toggleDialog}
        dialogConfirmAction={() => {
          persistDialog();
        }}
        dialogCancelAction={() => {
          setTimeSlice([]);
        }}
      >
        <p>Content</p>
      </Dialog>
    </div>
  );
}

CalendarDay.propTypes = {
  date: PropTypes.object
};
