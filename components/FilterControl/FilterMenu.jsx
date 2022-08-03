import { useEffect, useState } from 'react';
import styles from './FilterMenu.module.scss';

export default function FilterMenu(props) {
  // eslint-disable-next-line react/prop-types
  const { changeActiveFilter, categories } = props;
  const [activeFilter, setActiveFilter] = useState(categories[0]);

  const onClick = (option) => {
    setActiveFilter(option);
    changeActiveFilter(option);
  };

  useEffect(() => {}, []);

  // eslint-disable-next-line react/prop-types
  const mappedFilterOptions = categories.map((option) => {
    return (
      <div
        className={`${styles.checkboxContainer} ${
          activeFilter === option && styles.activeFilter
        }`}
        onClick={() => onClick(option)}
        key={option}
      >
        <input
          type="checkbox"
          id={option}
          value={option}
          name={option}
          checked={option === activeFilter}
          disabled={option === activeFilter}
        />
        <label htmlFor={option}>{option}</label>
      </div>
    );
  });

  return (
    <div className={styles.filterMenu}>
      <h1 className={styles.menuTitle}>Filter</h1>
      <div className={styles.filterOptions}>{mappedFilterOptions}</div>
    </div>
  );
}
