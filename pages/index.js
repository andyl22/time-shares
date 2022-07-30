import Head from 'next/head';
import Footer from '../components/Footer/Footer';
import styles from '../styles/Home.module.scss';

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Time Shares</title>
        <meta
          name="description"
          content="Buy time shares of your favorite pet"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1>Time Shares</h1>
      </main>

      <Footer />
    </div>
  );
}
