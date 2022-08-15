import styles from './CalendarBooking.module.scss';
import PropTypes from 'prop-types';

export default function CalendarBooking(props) {
  const { timeSlot } = props;
  const start = timeSlot[0] < timeSlot[1] ? timeSlot[0] : timeSlot[1];
  const end = timeSlot[1] < timeSlot[0] ? timeSlot[0] : timeSlot[1];

  const clickHandler = () => {
    console.log('test');
  };

  return (
    <div className={styles.calendarBooking} onClick={clickHandler}>
      <p>{`Booking from ${start} to ${end}. Add non-placeholder events here.`}</p>
      <style jsx>
        {`
          div {
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
  timeSlot: PropTypes.array
};
