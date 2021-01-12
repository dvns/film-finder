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
import CloseIcon from "../components/Icons/IconX";
import SearchIcon from "../components/Icons/IconSearch";
import SearchSuggested from "../components/SearchSuggested";
import HorizontalScroll from "../components/HorizontalScroll";
import Card from "../components/Card";

const InnerWrapper = styled.section`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
`;

const SearchButton = styled(StyledButton)`
  width: 30px;
  height: 30px;
  padding: 0;
  background: none;
  border: none;
  box-shadow: none;

  svg {
    width: ${(props) => (props.showSearch ? "20px" : "30px")};
    height: ${(props) => (props.showSearch ? "20px" : "30px")};
    fill: ${(props) => props.theme.brandPrimary};
  }
`;

const Overlay = styled.div`
  z-index: -1;
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
`;

const Featured = styled.div`
  padding-top: 15px;
  display: grid;
  grid-gap: 20px;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
`;

const SearchContainer = styled.div`
  padding-top: 20px;
`;

const StyledHeader = styled.header`
  z-index: 9999;
  position: ${(props) => (props.showSearch ? "fixed" : "static")};
  top: 0;
  width: 100%;
  background: white;

  h1 {
    font-size: 16px;
    line-height: 0.9;
    margin: 0;
  }

  .header-wrapper {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
`;

export default function Home({ brands, films, content }) {
  const wrapperRef = useRef(null);
  const headerRef = useRef(null);
  const [paddingLeft, setPaddingLeft] = useState(0);
  const [headerHeight, setHeaderHeight] = useState(0);
  const [showSearch, setShowSearch] = useState(false);

  function updateSize() {
    setPaddingLeft(wrapperRef.current.getBoundingClientRect().left);
    setHeaderHeight(headerRef.current.getBoundingClientRect().height);
  }

  useLayoutEffect(() => {
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  useEffect(() => {
    setPaddingLeft(wrapperRef.current.getBoundingClientRect().left);
    setHeaderHeight(headerRef.current.getBoundingClientRect().height);
  }, [wrapperRef]);

  return (
    <div>
      <StyledHeader showSearch={showSearch} ref={headerRef}>
        <InnerWrapper>
          <div className="header-wrapper">
            <h1>
              FILM<br></br>STOCK<br></br>FRIDAY
            </h1>
            <SearchButton
              showSearch={showSearch}
              onClick={() => setShowSearch((show) => !show)}
            >
              {showSearch ? <CloseIcon /> : <SearchIcon />}
            </SearchButton>
          </div>
          {showSearch && (
            <SearchContainer>
              <SearchSuggested items={films} />
              <Overlay onClick={() => setShowSearch(false)} />
            </SearchContainer>
          )}
        </InnerWrapper>
      </StyledHeader>

      <InnerWrapper style={{marginTop: showSearch ? headerHeight : "0px"}}>
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
