import Image from 'next/image';
import Link from 'next/link';
import styles from './ItemDisplay.module.scss';
import PropTypes from 'prop-types';

export default function ItemDisplay(props) {
  const { imgSrc, details } = props;

  return (
    <Link
      href={{
        pathname: `/entity/${details._id}`
      }}
      key={details._id}
    >
      <a className={styles.mappedItem}>
        <p className={styles.itemName}>{details.name}</p>
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
  imgSrc: PropTypes.string,
  details: PropTypes.object
};
