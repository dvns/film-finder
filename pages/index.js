import Head from 'next/head';

import { fetchFilms } from '../utils/contentfulHelpers';
import SearchSuggested from '../components/SearchSuggested';

export default function Home({ films }) {
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins&family=Inter:wght@400;700&display=swap" rel="stylesheet" />
      </Head>

      <main>
        <SearchSuggested items={films}/>
        <h1>Film Finder</h1>
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
