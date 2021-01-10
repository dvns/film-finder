import { forwardRef } from "react";
import Link from "next/link";
import queryString from "query-string";

import { fetchContent, fetchFilms } from "../utils/contentfulHelpers";
import PageWrapper from "../components/PageWrapper";
import SearchSuggested from "../components/SearchSuggested";
import HorizontalScroll from "../components/HorizontalScroll";
import Card from "../components/Card";

const BrandLink = forwardRef(({ onClick, href, brand }, ref) => {
  return (
    <a href={href} onClick={onClick} ref={ref}>
      <Card image={brand.logo} />
    </a>
  );
});

export default function Home({ brands, films }) {
  return (
    <PageWrapper>
      <h1>FILM STOCK FRIDAY</h1>
      <p>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Molestias,
        cum! Earum quis quas molestias itaque?
      </p>
      <SearchSuggested items={films} />
      <h2>Discover</h2>
      <HorizontalScroll>
        {brands.map((b) => (
          <Link
            key={b.name}
            href={{
              pathname: "/search",
              query: queryString.stringify(
                { brands: [b.name.toLowerCase()] },
                { arrayFormat: "index" }
              ),
            }}
            passHref
          >
            <BrandLink brand={b}></BrandLink>
          </Link>
        ))}
      </HorizontalScroll>
    </PageWrapper>
  );
}

export async function getStaticProps() {
  const films = await fetchFilms();
  const fetchBrands = await fetchContent(`
    {
      brandCollection(where: {promote: true}, order: [name_ASC]) {
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
