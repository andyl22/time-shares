import Head from 'next/head';
import styles from './entity.module.scss';

export default function Entity() {
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
        <div>Time share booker</div>
      </main>
    </>
  );
}
