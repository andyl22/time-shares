import { useState } from 'react';
import styles from './CalendarDay.module.scss';
import Dialog from '../Dialog/Dialog';
import { useRef } from 'react';

export default function CalendarDay() {
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
      () => {
        document.removeEventListener('mouseover', handleDrag);
      },
      { once: true }
    );
  };

  const hours = [0, 3, 6, 9, 12, 15, 18, 21, 24];
  const mappedHours = hours.map((time) => (
    <li
      className={`${styles.timeUnit} ${
        time >= timeSlice[0] && time <= timeSlice[1] && styles.color
      }`}
      key={time}
      value={time}
    >
      {time}
    </li>
  ));

  return (
    <div className={styles.calendarDayContainer} onClick={toggleDialog}>
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
        dialogConfirmAction={toggleDialog}
        dialogCancelAction={() => {}}
      />
    </div>
  );
}
