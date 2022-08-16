import { createPortal } from 'react-dom';
import styles from './Dialog.module.scss';
import PropTypes from 'prop-types';
import CloseIcon from '@mui/icons-material/Close';

export default function Dialog(props) {
  const {
    dialogHeader,
    children,
    show,
    hideDialog,
    dialogCancelAction,
    dialogConfirmAction
  } = props;

  const cancelDialog = (e) => {
    hideDialog(e);
    dialogCancelAction();
  };

  const confirmDialog = (e) => {
    hideDialog(e);
    dialogConfirmAction();
  };

  if (!show) return null;
  return createPortal(
    <div className={styles.modalContainer} onClick={cancelDialog}>
      <div
        className={styles.dialogContainer}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.dialogHeaderContainer}>
          <h1>{dialogHeader}</h1>
          <button onClick={cancelDialog}>
            <CloseIcon fontSize="small" />
          </button>
        </div>
        <div className={styles.childrenContainer}>{children}</div>
        <div className={styles.dialogActionButtons}>
          <button onClick={confirmDialog}>Confirm</button>
          <button onClick={cancelDialog}>Cancel</button>
        </div>
      </div>
    </div>,
    document.getElementById('__next')
  );
}

Dialog.propTypes = {
  dialogHeader: PropTypes.string,
  children: PropTypes.element,
  show: PropTypes.bool,
  hideDialog: PropTypes.func,
  dialogCancelAction: PropTypes.func,
  dialogConfirmAction: PropTypes.func
};
