import styles from './CalendarBooking.module.scss';
import PropTypes from 'prop-types';
import Dialog from '../Dialog/Dialog';
import { useState } from 'react';
import moment from 'moment';

export default function CalendarBooking(props) {
  const { bookingDetails } = props;
  const [bookingData, setBookingData] = useState(bookingDetails);
  const [formData, setFormData] = useState(bookingDetails);
  const [showDialog, setShowDialog] = useState(false);
  const { startTime, endTime, name, description } = bookingData;

  const toggleDialog = () => {
    setShowDialog(!showDialog);
  };

  const handleChange = (e) => {
    let newValue = e.target.value;
    setFormData({ ...formData, [e.target.id]: newValue });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.startTime > formData.endTime) {
      [formData.startTime, formData.endTime] = [
        formData.endTime,
        formData.startTime
      ];
    }
    setBookingData(formData);
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
          <form className={styles.editBookingForm} onSubmit={handleSubmit}>
            <div className={styles.formField}>
              <label htmlFor="bookingDate">Booking Date</label>
              <input
                type="date"
                id="dayBooked"
                value={moment(formData.dayBooked).format('YYYY-MM-DD')}
                onChange={handleChange}
              />
            </div>
            <div className={styles.formField}>
              <label htmlFor="bookingStart">Start</label>
              <input
                type="text"
                id="startTime"
                value={formData.startTime}
                onChange={handleChange}
              />
            </div>
            <div className={styles.formField}>
              <label htmlFor="bookingEnd">End</label>
              <input
                type="text"
                id="endTime"
                value={formData.endTime}
                onChange={handleChange}
              />
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
            background: ${startTime === endTime ? '#955fff' : '#5f88ff'};
            position: absolute;
            top: ${startTime * 2 + 2}rem;
            right: 0;
            height: ${(endTime - startTime) * 2 || 2}rem;
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
