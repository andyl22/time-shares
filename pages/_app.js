import '../styles/globals.scss';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';

// eslint-disable-next-line react/prop-types
function MyApp({ Component, pageProps }) {
  return (
    <>
      <Header />
      <Component {...pageProps} />
      <Footer />
    </>
  );
}

export default MyApp;
