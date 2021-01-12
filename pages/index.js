import {
  forwardRef,
  useRef,
  useEffect,
  useState,
  useLayoutEffect,
} from "react";
import Link from "next/link";
import queryString from "query-string";
import styled from "styled-components";

import { fetchContent, fetchFilms } from "../utils/contentfulHelpers";
import StyledButton from "../components/Button";
import Product from "../components/Product";
import HorizontalScroll from "../components/HorizontalScroll";
import Card from "../components/Card";

import SearchHeader from "../components/SearchHeader";

const InnerWrapper = styled.section`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
`;

const Featured = styled.div`
  padding-top: 15px;
  display: grid;
  grid-gap: 20px;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
`;

export default function Home({ brands, films, content }) {
  const wrapperRef = useRef(null);
  const [paddingLeft, setPaddingLeft] = useState(0);
  const [headerHeight, setHeaderHeight] = useState(0);

  function updateSize() {
    setPaddingLeft(wrapperRef.current.getBoundingClientRect().left);
  }

  useLayoutEffect(() => {
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  useEffect(() => {
    setPaddingLeft(wrapperRef.current.getBoundingClientRect().left);
  }, [wrapperRef]);

  return (
    <div>
      <SearchHeader
        onHeightChange={(h) => setHeaderHeight(h)}
        films={films}
      />

      <InnerWrapper style={{ marginTop: headerHeight }}>
        <h2>Most Popular</h2>
        <Featured>
          {films
            .filter((f) => f.promote)
            .map((film) => (
              <Link key={film.slug} href={`/films/${film.slug}`} passHref>
                <FilmLink film={film}></FilmLink>
              </Link>
            ))}
        </Featured>
      </InnerWrapper>

      <InnerWrapper
        ref={wrapperRef}
        style={{ paddingBottom: 0, marginBottom: "-20px" }}
      >
        <h2>Brands</h2>
      </InnerWrapper>

      <HorizontalScroll paddingLeft={paddingLeft}>
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
    </div>
  );
}

const BrandLink = forwardRef(({ onClick, href, brand }, ref) => {
  return (
    <a href={href} onClick={onClick} ref={ref}>
      <Card image={brand.logo} />
    </a>
  );
});

const FilmLink = forwardRef(({ onClick, href, film }, ref) => {
  return (
    <a href={href} onClick={onClick} ref={ref}>
      <Product
        info={
          <>
            <p>{film.type}</p>
          </>
        }
        title={`${film.brand.name} ${film.name}`}
        img={film.image}
        style="full"
        bgColor={film.brand.backgroundColor}
        tags={film.format}
      ></Product>
    </a>
  );
});

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
  const fetchHomeContent = await fetchContent(`
    {
      homePage(id: "4bNSR08En4gvwe7iLFUIEz") {
        heading
        heroImageLarge {
          title
          description
          contentType
          fileName
          size
          url
          width
          height
        }
        heroImageSmall {
          title
          description
          contentType
          fileName
          size
          url
          width
          height
        }
      }
    }
  `);

  const content = fetchHomeContent.homePage;

  return {
    props: {
      brands,
      films,
      content,
    },
  };
}
