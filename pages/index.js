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
import PageHeader from "../components/PageHeader";
import PageWrapper from "../components/PageWrapper";
import Product from "../components/Product";
import SearchSuggested from "../components/SearchSuggested";
import HorizontalScroll from "../components/HorizontalScroll";
import Card from "../components/Card";

const Hero = styled.header`
  position: relative;
  background-image: url(${(props) => props.bgSmall});
  background-size: cover;
  background-position: center top;
  min-height: 400px;
  height: 40vh;

  @media (min-width: 768px) {
    min-height: 475px;
    height: 30vh;
    background-image: url(${(props) => props.bgLarge});
    background-position: center 65%;
  }
`;

const InnerWrapper = styled.section`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
`;

const SearchContainer = styled(InnerWrapper)`
  & > div {
    max-width: 500px;
  }
`;

const HeroContent = styled(InnerWrapper)`
  color: white;

  h1 {
    font-size: 16px;
    line-height: 0.9;
    margin: 0;
  }

  p {
    max-width: 500px;
    font-size: 24px;
    font-weight: 700;
    margin: 0;
    margin-top: 50px;
    color: white;
  }

  @media (min-width: 768px) {
    color: ${(props) => props.theme.brandPrimary};
    p {
      margin-top: 75px;
      color: ${(props) => props.theme.brandPrimary};
    }
  }
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
      <Hero bgLarge={content.heroImageLarge.url} bgSmall={content.heroImageSmall.url}>
        <HeroContent>
          <h1>
            FILM<br></br>STOCK<br></br>FRIDAY
          </h1>
          <p>{content.heading}</p>
        </HeroContent>
        <SearchContainer>
          <SearchSuggested items={films} className="searchbar" />
        </SearchContainer>
      </Hero>

      <InnerWrapper>
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

      <InnerWrapper ref={wrapperRef} style={{paddingBottom: 0, marginBottom: '-20px'}}>
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
