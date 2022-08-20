import styles from './Calendar.module.scss';
import CalendarDay from './CalendarDay';
import moment from 'moment';
import { useState, useEffect, useContext } from 'react';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { postHTTP } from '../../utilities/api';
import { EntityContext } from '../../context/EntityContext';

export default function Calendar() {
  const [dates, setDates] = useState([]);
  const [mappedDates, setMappedDates] = useState([]);
  const entityDetails = useContext(EntityContext);

  useEffect(() => {
    let tempDates = [moment()];
    for (let i = 1; i < 7; i++) {
      tempDates.push(moment().add(i, 'days'));
    }
    setDates(tempDates);
  }, []);

  useEffect(() => {
    if (!entityDetails && dates.length < 1) return;
    const updateMappedDates = async () => {
      setMappedDates(
        await Promise.all(
          dates.map(async (date) => {
            const bookings = await postHTTP('/getEntityBookingsById', {
              id: entityDetails._id
            });
            return <CalendarDay key={date} date={date} bookings={bookings} />;
          })
        )
      );
    };
    updateMappedDates();
  }, [dates]);

  const shiftForward = () => {
    setDates([
      ...dates.slice(1, dates.length),
      moment(dates[dates.length - 1]).add(1, 'days')
    ]);
  };

  const shiftBackward = () => {
    setDates([
      moment(dates[0]).subtract(1, 'days'),
      ...dates.slice(0, dates.length - 1)
    ]);
  };

  return (
    <div className={styles.calendarContainer}>
      <div className={styles.calendarControl}>
        <button onClick={shiftBackward}>
          <NavigateBeforeIcon />
        </button>
        <button onClick={shiftForward}>
          <NavigateNextIcon />
        </button>
      </div>
      <div className={styles.calendarDisplay}>
        {mappedDates ? mappedDates : 'loading'}
      </div>
      <button onClick={() => console.log(entityDetails)}>Click</button>
    </div>
  );
}
