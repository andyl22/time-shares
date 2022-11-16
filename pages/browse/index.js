import Head from 'next/head';
import { useState } from 'react';
import FilterControlledSection from '../../components/FilterControl/FilterControlledSection';
import DialogAddEntity from '../../components/Dialog/DialogAddEntity';
import styles from './browse.module.scss';

export async function getServerSideProps() {
  // eslint-disable-next-line no-undef
  const fetchedEntityData = await fetch(`${process.env.API_URI}/api/getEntity`)
    .then((res) => res.json())
    .catch((err) => console.log(err));
  return {
    props: {
      fetchedEntityData,
      // eslint-disable-next-line no-undef
      unsplashAccess: process.env.UNSPLASH_ACCESS
    }
  };
}

export default function browse(props) {
  const { fetchedEntityData, unsplashAccess } = props;
  const [entityData, setEntityData] = useState(fetchedEntityData);
  const [showDialog, setShowDialog] = useState(false);

  const toggleDialog = () => {
    setShowDialog(!showDialog);
  };

  const addSuccessAction = (createdEntity) => {
    setEntityData([...entityData, createdEntity]);
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
        <DialogAddEntity
          toggleDialog={toggleDialog}
          showDialog={showDialog}
          successAction={addSuccessAction}
          unsplashAccess={unsplashAccess}
        />
      </main>
    </>
  );
}
