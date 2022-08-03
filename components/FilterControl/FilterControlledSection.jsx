import FilterMenu from './FilterMenu';
import styles from './FilterControlledSection.module.scss';
import { useState } from 'react';
import ItemDisplay from './ItemDisplay';

export default function FilterControlledSection() {
  const categories = ['milk', 'cookie', 'trees'];
  const [activeFilter, setActiveFilter] = useState(categories[0]);

  const changeActiveFilter = (option) => {
    setActiveFilter(option);
  };

  const sampleItems = [
    { name: 'milk 1', category: 'milk', id: 1 },
    { name: 'cookie', category: 'cookie', id: 2 },
    { name: 'milk 2', category: 'milk', id: 3 }
  ];

  const mappedItems = sampleItems
    .filter((item) => item.category === activeFilter)
    .map((item) => <ItemDisplay item={item} key={item.id} />);

  return (
    <div className={styles.filteredSection}>
      <FilterMenu
        changeActiveFilter={changeActiveFilter}
        categories={categories}
      />
      <div className={styles.filterContent}>
        <h1 className={styles.sectionTitle}>{activeFilter}</h1>
        <div className={styles.mappedItemsContainer}>{mappedItems}</div>
      </div>
    </div>
  );
}
