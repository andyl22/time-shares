import styles from './ItemDisplay.module.scss';

export default function ItemDisplay(props) {
  const { item } = props;

  return (
    <div key={item.name} className={styles.mappedItem}>
      <p>{item.name}</p>
    </div>
  );
}
