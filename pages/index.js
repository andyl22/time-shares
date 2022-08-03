import PropTypes from 'prop-types';
import Head from 'next/head';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import styles from '../styles/Home.module.scss';
import Image from 'next/image';

export function getStaticProps() {
  return {
    props: {
      // eslint-disable-next-line no-undef
      accessKey: process.env.UNSPLASH_ACCESS
    }
  };
}

export default function Home(props) {
  const { accessKey } = props;
  const [pics, setPics] = useState();

  useEffect(() => {
    const getData = async () =>
      fetch(
        `https://api.unsplash.com/search/photos?query=pets&orientation=squarish&client_id=${accessKey}`
      )
        .then((res) => res.json())
        .then((res) => res.results[Math.floor(Math.random() * 10)])
        .then((res) =>
          setPics(<Image src={res.urls.small} width="300" height="300" />)
        );
    getData();
  }, []);

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
        {pics}
        <Link href="/browse">
          <a>
            <button className={styles.buyNow}>Buy a time share now!</button>
          </a>
        </Link>
      </main>
    </>
  );
}

Home.propTypes = {
  accessKey: PropTypes.string
};
