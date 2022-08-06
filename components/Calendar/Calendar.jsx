import styles from './Calendar.module.scss';
import CalendarDay from './CalendarDay';

export default function Calendar() {
  return (
    <div className={styles.calendarContainer}>
      <CalendarDay />
      <CalendarDay />
      <CalendarDay />
      <CalendarDay />
      <CalendarDay />
      <CalendarDay />
      <CalendarDay />
    </div>
  );
}
