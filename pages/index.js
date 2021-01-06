import Head from 'next/head';

import { fetchFilms } from '../utils/contentfulHelpers';
import SearchSuggested from '../components/SearchSuggested';

export default function Home({ films }) {
  return (
    <div>
      <Head>
        <title>Film Lookbook</title>
        <link rel="icon" href="/favicon.ico" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap" rel="stylesheet" />
      </Head>

      <main>
        <h1>Film Lookbook</h1>
        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Molestias, cum! Earum quis quas molestias itaque?</p>
        <SearchSuggested items={films}/>
        <h2>Discover</h2>
        <h3>Brands</h3>
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
