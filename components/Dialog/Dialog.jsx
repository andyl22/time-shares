import { createPortal } from 'react-dom';
import styles from './Dialog.module.scss';
import PropTypes from 'prop-types';

export default function Dialog(props) {
  const { dialogHeader, dialogContent, show, hideDialog } = props;

  if (!show) return null;
  return createPortal(
    <div className={styles.modalContainer} onClick={hideDialog}>
      <div
        className={styles.dialogContainer}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.dialogHeaderContainer}>
          <h1>{dialogHeader}</h1>
          <button onClick={hideDialog}>test</button>
        </div>
        <div className={styles.dialogContentContainer}>{dialogContent}</div>
      </div>
    </div>,
    document.getElementById('__next')
  );
}

Dialog.propTypes = {
  dialogHeader: PropTypes.string,
  dialogContent: PropTypes.element,
  show: PropTypes.bool,
  hideDialog: PropTypes.func
};
