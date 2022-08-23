import styles from './CalendarBooking.module.scss';
import PropTypes from 'prop-types';
import Dialog from '../Dialog/Dialog';
import { useState } from 'react';

export default function CalendarBooking(props) {
  const { bookingDetails } = props;
  const { name, description, startTime, endTime } = bookingDetails;
  const [showDialog, setShowDialog] = useState(false);
  const start = startTime < endTime ? startTime : endTime;
  const end = endTime < startTime ? startTime : endTime;

  const toggleDialog = () => {
    setShowDialog(!showDialog);
  };

  return (
    <div className={styles.calendarBooking} onClick={toggleDialog}>
      <p>{name}</p>
      <p>{description}</p>
      <style jsx>
        {`
          div {
            display: flex;
            flex-direction: column;
            gap: 0.2rem;
            align-items: center;
            background: #5f88ff;
            position: absolute;
            top: ${start * 2 + 2}rem;
            right: 0;
            height: ${(end - start) * 2 + 2}rem;
            width: 75%;
            color: white;
            font-weight: 600;
            padding: 0.1rem 0.5rem;
            border-radius: 0.2rem;
            border-top: 1px solid white;
            border-bottom: 1px solid white;
            overflow: hidden;
          }
        `}
      </style>
      {showDialog ? (
        <Dialog
          dialogHeader="Booking"
          dialogContent={<p>Content</p>}
          show={showDialog}
          hideDialog={toggleDialog}
          dialogConfirmAction={() => {
            console.log('confirm');
          }}
          dialogCancelAction={() => {
            console.log('cancel');
          }}
        />
      ) : null}
    </div>
  );
}

CalendarBooking.propTypes = {
  timeSlot: PropTypes.array
};
