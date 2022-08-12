import Head from 'next/head';
import FilterControlledSection from '../../components/FilterControl/FilterControlledSection';
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
        <FilterControlledSection entityData={entityData} />
      </main>
    </>
  );
}
