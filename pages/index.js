import Head from "next/head";

import { fetchContent, fetchFilms } from "../utils/contentfulHelpers";
import SearchSuggested from "../components/SearchSuggested";
import HorizontalScroll from "../components/HorizontalScroll";
import Card from "../components/Card";

export default function Home({ brands, films }) {
  return (
    <div>
      <Head>
        <title>Film Lookbook</title>
        <link rel="icon" href="/favicon.ico" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
      </Head>

      <main>
        <h1>Film Lookbook</h1>
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Molestias,
          cum! Earum quis quas molestias itaque?
        </p>
        <SearchSuggested items={films} />
        <h2>Discover</h2>
        <h3>Popular Brands</h3>
        <HorizontalScroll>
          {brands.map((b) => (
            <Card
              key={b.name}
              image={b.logo}
            />
          ))}
        </HorizontalScroll>
      </main>
    </div>
  );
}

export async function getStaticProps() {
  const films = await fetchFilms();
  const fetchBrands = await fetchContent(`
    {
      brandCollection(where: {promote: true}) {
        items {
          name
          logo {
            title
            url
          }
        }
      }
    }
  `);

  const brands = fetchBrands.brandCollection.items;

  return {
    props: {
      brands,
      films,
    },
  };
}
