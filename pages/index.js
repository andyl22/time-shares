import Head from 'next/head';
import { useState } from 'react';
import styles from '../styles/Home.module.scss';

export default function Home() {
  const [pics, setPics] = useState();
  const accessKey = 'y7CUOcVNwrD1FoUXE8VXn-1a_6NnbnKCmyQ7L6ICoJE';
  const secret = '6qsnSRFklAVoBO2egFFRhhRS8JSOYHPAlofmggnDxVI';

  const getData = async () =>
    fetch(
      `https://api.unsplash.com/search/photos?query=pets&client_id=${accessKey}`
    )
      .then((res) => res.json())
      .then((res) => res.results[0])
      .then((res) => setPics(<img src={res.urls.small} />));

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

      <main className={styles.main}>
        <button onClick={getData}>Click Me</button>
        {pics}
      </main>
    </>
  );
}
