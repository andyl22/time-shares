import { useState } from 'react';
import styles from './CalendarDay.module.scss';
import Dialog from '../Dialog/Dialog';
import TimeUnit from './TimeUnit';

export default function CalendarDay() {
  const [showDialog, setShowDialog] = useState(false);
  const [listen, setListen] = useState(false);

  const toggleDialog = (e) => {
    e.stopPropagation();
    setShowDialog(!showDialog);
  };

  const listenToDrag = () => {
    setListen(true);
    document.addEventListener('mouseup', () => setListen(false), {
      once: true
    });
  };

  const hours = [0, 3, 6, 9, 12, 15, 18, 21, 24];
  const mappedHours = hours.map((time) => (
    <TimeUnit key={time} unit={time} listen={listen} />
  ));

  return (
    <div className={styles.calendarDayContainer} onClick={toggleDialog}>
      <div className={styles.hourTimes} onMouseDown={listenToDrag}>
        {mappedHours}
      </div>
      <Dialog
        dialogHeader="Book a time"
        dialogContent={<p>Content</p>}
        show={showDialog}
        hideDialog={toggleDialog}
      />
    </div>
  );
}
