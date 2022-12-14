import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import Calendar from '../../components/Calendar/Calendar';
import { postHTTP } from '../../utilities/api';
import styles from './entity.module.scss';
import EntityContextProvider from '../../context/EntityContext';

export default function Entity() {
  const [entityDetails, setEntityDetails] = useState();
  const router = useRouter();

  useEffect(() => {
    if (!router || entityDetails) return;
    postHTTP('/getEntityById', { id: router.query.id })
      .then((res) => setEntityDetails(res))
      .catch((err) => console.log(err));
  }, [router]);

  return (
    <EntityContextProvider entityDetails={entityDetails}>
      <Head>
        <title>Time Shares</title>
        <meta
          name="description"
          content="Buy time shares of your favorite pet"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.browsePage}>
        <div className={styles.calendarContainer}>
          <h1>{entityDetails ? entityDetails.name : 'Loading...'}</h1>
          <Calendar />
        </div>
      </main>
    </EntityContextProvider>
  );
}
