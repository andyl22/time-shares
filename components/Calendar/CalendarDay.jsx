import styles from './CalendarDay.module.scss';
import Dialog from '../Dialog/Dialog';
import CalendarBooking from './CalendarBooking';
import { useState, useRef, useContext } from 'react';
import PropTypes from 'prop-types';
import { postHTTP } from '../../utilities/api';
import { EntityContext } from '../../context/EntityContext';
import Form from '../Form/Form';
import moment from 'moment/moment';

export default function CalendarDay(props) {
  const { date, bookings } = props;
  const [showDialog, setShowDialog] = useState(false);
  const [timeSlice, setTimeSlice] = useState([]);

  const [bookedTimes, setBookedTimes] = useState(
    bookings.map((booking) => ({
      name: booking.name,
      description: booking.description,
      dateOfBooking: booking.dateOfBooking,
      dayBooked: booking.dayBooked,
      startTime: booking.startTime,
      endTime: booking.endTime
    }))
  );

  const [createBookingForm, setCreateBookingForm] = useState({
    name: '',
    description: ''
  });
  const timeUnitsNode = useRef();
  const entityDetails = useContext(EntityContext);

  const toggleDialog = (e) => {
    e.stopPropagation();
    setShowDialog(!showDialog);
  };

  const persistDialog = async () => {
    const startTime = timeSlice[0] < timeSlice[1] ? timeSlice[0] : timeSlice[1];
    const endTime = timeSlice[1] < timeSlice[0] ? timeSlice[0] : timeSlice[1];
    const body = {
      dateOfBooking: moment().toDate(),
      dayBooked: moment(date).format('MM/DD/YYYY'),
      startTime,
      endTime,
      entityId: entityDetails._id,
      ...createBookingForm
    };
    await postHTTP('/createNewEntityBooking', body).then((res) =>
      console.log(res)
    );
    setBookedTimes([...bookedTimes, body]);
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
        time >= timeSlice[0] && time < timeSlice[1] && styles.color
      } ${time <= timeSlice[0] && time > timeSlice[1] && styles.color}`}
      key={time}
      value={time}
      onMouseDown={listenToDrag}
    >
      {time}
    </li>
  ));

  const mappedBookings = bookedTimes.map((bookingDetails) => {
    return (
      <CalendarBooking
        key={`${bookingDetails.name}-${bookingDetails.description}`}
        bookingDetails={bookingDetails}
      />
    );
  });

  const formChange = (e) => {
    setCreateBookingForm({
      ...createBookingForm,
      [e.target.id]: e.target.value
    });
    console.log(createBookingForm);
  };

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
        <div className={styles.formContainer}>
          <Form>
            <div className={styles.formInput}>
              <label htmlFor="name">Name</label>
              <input
                type="text"
                value={createBookingForm.name}
                id="name"
                onChange={formChange}
              />
            </div>
            <div className={styles.formInput}>
              <label htmlFor="description">Description</label>
              <input
                type="text"
                value={createBookingForm.description}
                id="description"
                onChange={formChange}
              />
            </div>
          </Form>
        </div>
      </Dialog>
    </div>
  );
}

CalendarDay.propTypes = {
  date: PropTypes.object,
  bookings: PropTypes.array
};
