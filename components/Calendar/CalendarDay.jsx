import { useState } from 'react';
import styles from './CalendarDay.module.scss';
import Dialog from '../Dialog/Dialog';
import { useRef } from 'react';
import { postHTTP } from '../../utilities/api';
import PropTypes from 'prop-types';

export default function CalendarDay(props) {
  const { date } = props;
  const [showDialog, setShowDialog] = useState(false);
  const [timeSlice, setTimeSlice] = useState([]);
  const thisNode = useRef();

  const toggleDialog = (e) => {
    e.stopPropagation();
    setShowDialog(!showDialog);
  };

  const listenToDrag = (e) => {
    const originalValue = e.target.value;
    const handleDrag = (e) => {
      if (
        e.target.value === undefined ||
        e.target.parentNode !== thisNode.current
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
    >
      {time}
    </li>
  ));

  return (
    <div className={styles.calendarDayContainer}>
      <div className={styles.dayHeader}>{date.format('MMM Do YY')}</div>
      <div
        className={styles.hourTimes}
        onMouseDown={listenToDrag}
        ref={thisNode}
      >
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
            .then((res) => console.log(res))
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
