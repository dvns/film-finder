import Head from 'next/head';

import { fetchFilms } from '../utils/contentfulHelpers';
import SearchSuggested from '../components/SearchSuggested';

export default function Home({ films }) {
  return (
    <div>
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
  const films = await fetchFilms();

  return {
    props: {
      films
    },
  };
}
