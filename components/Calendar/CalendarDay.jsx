import { useState } from 'react';
import styles from './CalendarDay.module.scss';
import Dialog from '../Dialog/Dialog';

export default function CalendarDay() {
  const [showDialog, setShowDialog] = useState(false);

  const toggleDialog = (e) => {
    e.stopPropagation();
    setShowDialog(!showDialog);
  };

  return (
    <div className={styles.calendarDayContainer} onClick={toggleDialog}>
      <Dialog
        dialogHeader="Book a time"
        dialogContent={<p>Content</p>}
        show={showDialog}
        hideDialog={toggleDialog}
      />
    </div>
  );
}
