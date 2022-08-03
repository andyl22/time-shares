import Link from 'next/link';
import styles from './Header.module.scss';

export default function Header() {
  return (
    <header className={styles.header}>
      <Link href="/">
        <a>
          <h1>Time Shares</h1>
        </a>
      </Link>
    </header>
  );
}
