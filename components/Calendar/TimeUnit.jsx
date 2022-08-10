import styles from './TimeUnit.module.scss';
import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { useState } from 'react';

export default function TimeUnit(props) {
  const { unit, listen } = props;
  const [color, setColor] = useState(false);

  const handleDrag = () => {
    if (!listen) return;
    const doSomething = () => {
      document.removeEventListener('mouseover', printElement);
    };
    const printElement = (e) => {
      console.log(e.target);
      setColor(true);
    };
    document.addEventListener('mouseover', printElement);
    document.addEventListener('mouseup', doSomething, { once: true });
  };

  useEffect(() => {
    console.log(listen);
  }, []);

  return (
    <p
      className={`${styles.timeUnit} && ${color && styles.color}`}
      onMouseOver={handleDrag}
    >
      {unit}
    </p>
  );
}

TimeUnit.propTypes = {
  unit: PropTypes.number,
  listen: PropTypes.bool
};
