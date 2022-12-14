import styles from './DialogAddEntity.module.scss';
import Form from '../Form/Form';
import Dialog from './Dialog';
import { useState } from 'react';
import { postHTTP } from '../../utilities/api';
import PropTypes from 'prop-types';

// component user should pass the showDialog and toggleDialog to this dialog type
export default function DialogAddEntity(props) {
  const { showDialog, toggleDialog, successAction, unsplashAccess } = props;
  const [form, setForm] = useState({
    name: '',
    description: '',
    rate: '',
    category: '',
    image: ''
  });

  const handleChange = (e) => {
    const key = e.target.id;
    const value = e.target.value;
    setForm({ ...form, [key]: value });
  };

  const convertImageForStorage = (file) => {
    const fReader = new FileReader();
    fReader.readAsDataURL(file);
    fReader.onloadend = (e) => {
      setForm({ ...form, image: e.target.result });
    };
  };

  const handleFileUpload = (e) => {
    convertImageForStorage(e.target.files[0]);
  };

  const submitAction = async () => {
    const postBody =
      form.image === ''
        ? await fetch(
            `https://api.unsplash.com/search/photos?query=${form.name}&orientation=squarish&client_id=${unsplashAccess}`
          )
            .then((res) => res.json())
            .then((res) => res.results[Math.floor(Math.random() * 10)])
            .then((res) => ({ ...form, image: res.urls.small }))
        : form;

    postHTTP('/createNewEntity', postBody)
      .then((res) => successAction(res.entity))
      .then(() =>
        setForm({
          name: '',
          description: '',
          rate: '',
          category: '',
          image: ''
        })
      )
      .catch((err) => console.log(err));
  };

  return (
    <Dialog
      show={showDialog}
      dialogHeader={'Add Object'}
      hideDialog={toggleDialog}
      dialogConfirmAction={submitAction}
      // Could clear out the form here
      dialogCancelAction={() => {}}
    >
      <Form>
        <div className={styles.inputContainer}>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            onChange={handleChange}
            value={form.name}
          />
        </div>
        <div className={styles.inputContainer}>
          <label htmlFor="description">Description</label>
          <input
            type="text"
            id="description"
            onChange={handleChange}
            value={form.description}
          />
        </div>
        <div className={styles.inputContainer}>
          <label htmlFor="rate">Rate</label>
          <input
            type="text"
            id="rate"
            onChange={handleChange}
            value={form.rate}
          />
        </div>
        <div className={styles.inputContainer}>
          <label htmlFor="category">Category</label>
          <input
            type="text"
            id="category"
            onChange={handleChange}
            value={form.category}
          />
        </div>
        <div className={styles.inputContainer}>
          <label htmlFor="image">Image</label>
          <input type="file" id="image" onChange={handleFileUpload} />
        </div>
      </Form>
    </Dialog>
  );
}

DialogAddEntity.propTypes = {
  showDialog: PropTypes.bool,
  toggleDialog: PropTypes.func,
  successAction: PropTypes.func,
  unsplashAccess: PropTypes.string
};
