import Head from 'next/head';
import styles from '../styles/Home.module.css';

import { getAllFilms } from '../utils/prismicHelpers';

export default function Home({ films }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <ul>
          {films.map(film => 
            <li key={film.id}>
              <p>{film.data.brand} {film.data.name}</p>
              <p>{film.data.colour} Film</p>
            </li>
          )}
        </ul>
      </main>
    </div>
  )
}

export async function getStaticProps() {
  const films = await getAllFilms();
  
  films.sort((a, b) => {
    const nameA = (a.data.brand + ' ' + a.data.name).toLowerCase();
    const nameB = (b.data.brand + ' ' + b.data.name).toLowerCase();
    if (nameA < nameB) {
      return -1;
    } else if (nameB > nameA) {
      return 1;
    } else {
      return 0;
    }
  });

  return {
    props: {
      films
    },
  };
}
