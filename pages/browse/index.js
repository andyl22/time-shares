import Head from 'next/head';
import FilterControlledSection from '../../components/FilterControl/FilterControlledSection';
import styles from './browse.module.scss';

export default function browse() {
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
        <FilterControlledSection />
      </main>
    </>
  );
}
