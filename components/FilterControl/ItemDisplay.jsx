import Image from 'next/image';
import Link from 'next/link';
import styles from './ItemDisplay.module.scss';
import PropTypes from 'prop-types';

export default function ItemDisplay(props) {
  const { name, imgSrc, id } = props;

  return (
    <Link href={`/entity/${id}`}>
      <a className={styles.mappedItem}>
        <p className={styles.itemName}>{name}</p>
        <Image
          src={imgSrc}
          width="300"
          height="220px"
          className={styles.image}
        />
      </a>
    </Link>
  );
}

ItemDisplay.propTypes = {
  name: PropTypes.string,
  imgSrc: PropTypes.string,
  id: PropTypes.string
};
