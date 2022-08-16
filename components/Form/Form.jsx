import styles from './Form.module.scss';
import PropTypes from 'prop-types';

export default function Form({ children }) {
  return <div className={styles.formContainer}>{children}</div>;
}

Form.propTypes = {
  children: PropTypes.array
};
