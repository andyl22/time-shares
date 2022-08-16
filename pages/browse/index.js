import Head from 'next/head';
import { useState } from 'react';
import Dialog from '../../components/Dialog/Dialog';
import FilterControlledSection from '../../components/FilterControl/FilterControlledSection';
import FormAddEntity from '../../components/Form/FormAddEntity';
import styles from './browse.module.scss';

export async function getStaticProps() {
  // eslint-disable-next-line no-undef
  const entityData = await fetch(`${process.env.API_URI}/api/getEntity`)
    .then((res) => res.json())
    .catch((err) => console.log(err));
  return {
    props: { entityData }
  };
}

export default function browse(props) {
  const { entityData } = props;
  const [showDialog, setShowDialog] = useState(false);

  const toggleDialog = () => {
    setShowDialog(!showDialog);
  };

  return (
    <>
      <Head>
        <title>Time Shares</title>
        <meta
          name="description"
          content="Buy time shares of your favorite pet"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.browsePage}>
        <button onClick={toggleDialog}>Create a new booking</button>
        <FilterControlledSection entityData={entityData} />
        <Dialog
          show={showDialog}
          dialogHeader={'Add Object'}
          dialogContent={<FormAddEntity />}
          hideDialog={toggleDialog}
          dialogConfirmAction={() => {}}
          dialogCancelAction={() => {}}
        />
      </main>
    </>
  );
}
