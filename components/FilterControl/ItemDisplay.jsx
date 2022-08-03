import styles from './ItemDisplay.module.scss';
import PropTypes from 'prop-types';

export default function ItemDisplay(props) {
  const { item } = props;

  return (
    <div key={item.name} className={styles.mappedItem}>
      <p>{item.name}</p>
    </div>
  );
}

ItemDisplay.propTypes = {
  item: {
    name: PropTypes.string
  }
};
