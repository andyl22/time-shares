import styles from './CalendarBooking.module.scss';
import PropTypes from 'prop-types';

export default function CalendarBooking(props) {
  const { start, end } = props;

  const clickHandler = (e) => {
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
          }
        `}
      </style>
    </div>
  );
}

CalendarBooking.propTypes = {
  start: PropTypes.number,
  end: PropTypes.number
};
