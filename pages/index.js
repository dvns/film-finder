import Head from 'next/head';
import styles from '../styles/Home.module.css';

import { fetchContent } from '../utils/contentfulHelpers';
import SearchSuggested from '../components/SearchSuggested';

export default function Home({ films }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <SearchSuggested items={films}/>
      </main>
    </div>
  );
}

export async function getStaticProps() {
  const response = await fetchContent(`
    {
      filmCollection {
        items {
          slug
          name
          brand {
            name
          }
          iso
          type
          format
          flickrQuery
        }
      }
    }
  `);

  const films = response.filmCollection.items;
  
  films.sort((a, b) => {
    const nameA = (a.brand.name + ' ' + a.name).toLowerCase();
    const nameB = (b.brand.name + ' ' + b.name).toLowerCase();
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
