import {
  forwardRef,
  useRef,
  useEffect,
  useState,
} from "react";
import Link from "next/link";
import queryString from "query-string";
import styled from "styled-components";

import { fetchContent, fetchFilms } from "../utils/contentfulHelpers";
import Card from "../components/Card";
import HorizontalScroll from "../components/HorizontalScroll";
import Product from "../components/Product";
import SearchHeader from "../components/SearchHeader";
import ArrowIcon from "../components/Icons/IconArrow";

const InnerWrapper = styled.section`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;

  h3 {
    font-size: 16px;
    text-transform: uppercase;
  }
`;

const Featured = styled.div`
  padding-top: 15px;
  display: grid;
  grid-gap: 20px;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
`;

const Hero = styled(InnerWrapper)`
  h2 {
    max-width: 400px;
    font-size: 36px;
    color: ${(props) => props.theme.brandPrimary};
  }

  @media (min-width: 920px) {
    display: flex;
    align-items: center;
    justify-content: space-between;

    h2 {
      flex-grow: 1;
      min-width: 500px;
      padding-right: 50px;
    }
  }
`;

const HeroImageContainer = styled.div`
  position: relative;
  left: 15px;
  top: 15px;
  max-width: 300px;
  display: inline-block;
  background: rgb(255, 239, 168);
  margin-bottom: 15px;

  @media (min-width: 375px) {
    max-width: 100%;
  }

  img {
    display: block;
    width: 100%;
    position: relative;
    left: -15px;
    top: 15px;
  }
`;

const BrowseButton = styled.a`
  display: inline-block;
  font-size: 20px;
  font-weight: 600;
  text-decoration: underline;
  margin-bottom: 20px;
  color: ${(props) => props.theme.brandPrimary};

  svg {
    margin-left: 10px;
    fill: ${(props) => props.theme.brandPrimary};
  }
`;

export default function Home({ brands, films }) {
  const wrapperRef = useRef(null);
  const [paddingLeft, setPaddingLeft] = useState(0);
  const [headerHeight, setHeaderHeight] = useState(0);

  function updateSize() {
    setPaddingLeft(wrapperRef.current.getBoundingClientRect().left);
  }

  useEffect(() => {
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  useEffect(() => {
    setPaddingLeft(wrapperRef.current.getBoundingClientRect().left);
  }, [wrapperRef]);

  return (
    <div>
      <SearchHeader onHeightChange={(h) => setHeaderHeight(h)} films={films} />

      <Hero style={{ marginTop: headerHeight }}>
        <div>
          <h2>Photos from your favourite film stocks</h2>
          <Link href="/search" passHref>
            <BrowseButton>
              Browse all<ArrowIcon width="15" />
            </BrowseButton>
          </Link>
        </div>

        <HeroImageContainer>
          <img src="https://images.ctfassets.net/7x23siqvvl83/5nDIBjNQkLgt8U4q3f8Eci/e5cb12fc64e2af6cb372a325a671bb6b/0002.jpg" />
        </HeroImageContainer>
      </Hero>

      <InnerWrapper>
        <h3>Top Picks</h3>
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
        <h3>Discover by brands</h3>
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

  return {
    props: {
      brands,
      films,
    },
  };
}
