import styles from './CalendarBooking.module.scss';
import PropTypes from 'prop-types';
import Dialog from '../Dialog/Dialog';
import { useState } from 'react';

export default function CalendarBooking(props) {
  const { bookingDetails } = props;
  const { date, name, description, startTime, endTime } = bookingDetails;
  const [showDialog, setShowDialog] = useState(false);
  const start = startTime < endTime ? startTime : endTime;
  const end = endTime < startTime ? startTime : endTime;

  const toggleDialog = () => {
    setShowDialog(!showDialog);
    console.log(bookingDetails);
  };

  return (
    <div className="calendarBooking" onClick={toggleDialog}>
      <p>{name}</p>
      <p>{description}</p>
      {showDialog ? (
        <Dialog
          dialogHeader="Booking"
          show={showDialog}
          hideDialog={toggleDialog}
          dialogConfirmAction={() => {
            console.log('confirm');
          }}
          dialogCancelAction={() => {
            console.log('cancel');
          }}
        >
          <form
            className={styles.editBookingForm}
            onSubmit={(e) => {
              e.preventDefault();
              console.log('submitted');
            }}
          >
            <div className={styles.formField}>
              <label htmlFor="bookingDate">Booking Date</label>
              <input
                type="date"
                id="bookingDate"
                value={date.format('YYYY-MM-DD')}
              />
            </div>
            <div className={styles.formField}>
              <label htmlFor="bookingStart">Start</label>
              <input type="text" id="bookingStart" value={start} />
            </div>
            <div className={styles.formField}>
              <label htmlFor="bookingEnd">End</label>
              <input type="text" id="bookingEnd" value={end} />
            </div>
            <button type="submit">Submit</button>
          </form>
        </Dialog>
      ) : null}
      <style jsx>
        {`
          .calendarBooking {
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
    </div>
  );
}

CalendarBooking.propTypes = {
  bookingDetails: PropTypes.object
};
