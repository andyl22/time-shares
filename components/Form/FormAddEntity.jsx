import styles from './FormAddEntity.module.scss';
import Form from './Form';

export default function FormAddEntity() {
  return (
    <Form>
      <div className={styles.inputContainer}>
        <label htmlFor="name">Name</label>
        <input type="text" id="name" />
      </div>
      <div className={styles.inputContainer}>
        <label htmlFor="description">Description</label>
        <input type="text" id="description" />
      </div>
      <div className={styles.inputContainer}>
        <label htmlFor="rate">Rate</label>
        <input type="text" id="rate" />
      </div>
      <div className={styles.inputContainer}>
        <label htmlFor="image">Upload</label>
        <input type="file" id="image" />
      </div>
    </Form>
  );
}
