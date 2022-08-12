import FilterMenu from './FilterMenu';
import styles from './FilterControlledSection.module.scss';
import { useState } from 'react';
import ItemDisplay from './ItemDisplay';
import PropTypes from 'prop-types';

export default function FilterControlledSection(props) {
  const { entityData } = props;

  const categories = Array.from(
    entityData.reduce((set, entity) => set.add(entity.category), new Set())
  );

  const [activeFilter, setActiveFilter] = useState(
    categories ? categories[0] : undefined
  );

  const changeActiveFilter = (option) => {
    setActiveFilter(option);
  };

  const mappedItems = entityData
    .filter((item) => item.category === activeFilter)
    .map((item) => (
      <ItemDisplay key={item._id} imgSrc={'/images/cat.jpg'} details={item} />
    ));

  return (
    <div className={styles.controlSection}>
      <h1 className={styles.sectionTitle}>{activeFilter}</h1>
      <div className={styles.filteredSection}>
        <FilterMenu
          changeActiveFilter={changeActiveFilter}
          categories={categories}
        />
        <div className={styles.filterContent}>
          <div className={styles.mappedItemsContainer}>{mappedItems}</div>
        </div>
      </div>
    </div>
  );
}

FilterControlledSection.propTypes = {
  entityData: PropTypes.array
};
