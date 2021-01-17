import { useEffect, useState, forwardRef } from "react";
import Link from "next/link";
import { withRouter } from "next/router";
import queryString from "query-string";
import styled from "styled-components";

import FilterWrapper from "../../components/FilterWrapper";
import {
  FilterGroup,
  FilterCheckbox,
  FilterCheckLabel,
} from "../../components/FilterWrapper/styles";
import FilterIcon from "../../components/Icons/IconFilter";
import CheckIcon from "../../components/Icons/IconCheck";
import PageWrapper from "../../components/PageWrapper";
import Product from "../../components/Product";
import SearchSuggested from "../../components/SearchSuggested";
import StyledButton from "../../components/Button";
import SearchHeader from "../../components/SearchHeader";

import { fetchContent, fetchFilms } from "../../utils/contentfulHelpers";
import {
  matchAnyCaseInsensitive,
  stringToArrayLowerCase,
} from "../../utils/searchHelpers";

const InnerWrapper = styled.section`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
`;

const FilterBadge = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  transform: translate(30%, -70%);
  display: ${(props) => (props.show ? "flex" : "none")};
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  background: white;
  font-size: 12px;
  font-weight: 600;
  text-align: center;
  color: ${(props) => props.theme.brandPrimary};
  border-radius: ${(props) => props.theme.borderRadius};
  border: 1px solid ${(props) => props.theme.brandPrimary};
  box-shadow: ${(props) => props.theme.uiShadow};
`;

const FilterButton = styled(StyledButton)`
  position: relative;
  color: white;
  font-size: 16px;
  font-weight: 600;
  padding: 5px 8px 5px 15px;
  margin-right: 0;
  margin-left: auto;

  svg {
    flex-shrink: 0;
    width: 30px;
    height: 30px;
    margin-left: 10px;
  }
`;

const ClearButton = styled(StyledButton)`
  height: auto;
  padding: 5px 10px;
  background: ${(props) => props.theme.brandPrimary};
  font-size: 14px;
  font-weight: 600;
  color: white;
  display: ${(props) => (props.show ? "initial" : "none")};
`;


const ResultsList = styled.div`
  display: grid;
  grid-gap: 20px;
  grid-template-columns: repeat(auto-fit, minmax(325px, 1fr));
  a {
    display: inline-block;
    width: 100%;
  }
`;

const ResultsHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-flow: wrap;

  & > * {
    flex-grow: 1;
  }

  p {
    font-size: 20px;
    font-weight: 600;
    color: ${(props) => props.theme.brandPrimary};
    margin-right: 20px;
    flex-grow: 999;
  }

  @media (max-width: 376px) {
  }
`;

function Search({ router, filters, films }) {
  const [filtered, setFiltered] = useState({
    brands: initCheckedObj(filters.brands, router.query.brands),
    types: initCheckedObj(filters.types, router.query.types),
    formats: initCheckedObj(filters.formats, router.query.formats),
  });
  const [searchTerm, setSearchTerm] = useState(router.query.q || "");
  const [results, setResults] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [filteredCount, setFilteredCount] = useState(0);
  const [headerHeight, setHeaderHeight] = useState(0);

  useEffect(() => {
    // Update state filtered state based on query change
    const newFiltered = {
      brands: initCheckedObj(filters.brands, router.query.brands),
      types: initCheckedObj(filters.types, router.query.types),
      formats: initCheckedObj(filters.formats, router.query.formats),
    };
    setFiltered(newFiltered);
    setSearchTerm(router.query.q || "");
  }, [router.query]);

  useEffect(() => {
    const count = Object.keys(filtered).reduce((counter, group) => {
      if (Object.values(filtered[group]).includes(true)) {
        return counter + 1;
      } else {
        return counter;
      }
    }, 0);
    setFilteredCount(count);
    // Update search results when filtered state changes
    applyFilters();
  }, [filtered]);

  function applyFilters() {
    const words = stringToArrayLowerCase(searchTerm);
    const filterResults = films.filter((film) => {
      const name = `${film.brand.name} ${film.name}`.toLowerCase();
      const matchedName = matchAnyCaseInsensitive(name, words);

      let matchedBrands = true;
      const checkedBrands = getCheckedKeys(filtered.brands);
      if (checkedBrands.length > 0) {
        matchedBrands = matchAnyCaseInsensitive(
          film.brand.name,
          checkedBrands.map((key) => getLabel(key, filters.brands))
        );
      }

      let matchedFormats = true;
      const checkedFormats = getCheckedKeys(filtered.formats);
      if (checkedFormats.length > 0) {
        matchedFormats = matchAnyCaseInsensitive(
          film.format,
          checkedFormats.map((key) => getLabel(key, filters.formats))
        );
      }

      let matchedTypes = true;
      const checkedTypes = getCheckedKeys(filtered.types);
      if (checkedTypes.length > 0) {
        matchedTypes = matchAnyCaseInsensitive(
          film.type,
          checkedTypes.map((key) => getLabel(key, filters.types))
        );
      }

      return matchedName && matchedBrands && matchedFormats && matchedTypes;
    });

    setResults(filterResults);
  }

  function checkboxHandler(e) {
    const newFiltered = JSON.parse(JSON.stringify(filtered));
    newFiltered[e.target.name][e.target.id] = e.target.checked;
    const query = {
      ...router.query,
      [e.target.name]: getCheckedKeys(newFiltered[e.target.name]),
    };
    router.replace(
      {
        pathname: "/search",
        query: queryString.stringify(query, { arrayFormat: "index" }),
      },
      undefined,
      { shallow: true }
    );
  }

  function clearFilterGroup(group) {
    const newFiltered = JSON.parse(JSON.stringify(filtered));
    Object.keys(newFiltered[group]).forEach((key) => {
      newFiltered[group][key] = false;
    });
    const query = {
      ...router.query,
      [group]: getCheckedKeys(newFiltered[group]),
    };
    router.replace(
      {
        pathname: "/search",
        query: queryString.stringify(query, { arrayFormat: "index" }),
      },
      undefined,
      { shallow: true }
    );
  }

  function initCheckedObj(arr, queryArr = []) {
    const obj = arr.reduce((acc, curr) => ((acc[curr.id] = false), acc), {});
    queryArr.forEach((key) => {
      const exists = arr.find((item) => item.id === key);
      // If query is not valid, redirect to home page.
      if (!exists && process.browser) {
        router.push("/");
        return;
      }
      obj[key] = true;
    });
    return obj;
  }

  return (
    <div>
      <SearchHeader films={films} onHeightChange={(h) => setHeaderHeight(h)} />
      <InnerWrapper style={{ marginTop: headerHeight }}>
        <ResultsHeader>
          <p>
            {results.length > 0
              ? `Showing ${results.length} film stocks${
                  searchTerm.length > 0 ? ` for "${searchTerm}"` : ""
                }`
              : `No film stocks found${
                  searchTerm.length ? ` for "${searchTerm}"` : ""
                }`}
          </p>
          <FilterButton onClick={() => setShowFilters(true)}>
            Filters
            <FilterIcon fill="white" />
            <FilterBadge show={filteredCount > 0}>{filteredCount}</FilterBadge>
          </FilterButton>
        </ResultsHeader>
      </InnerWrapper>

      <FilterWrapper
        show={showFilters}
        closeHandler={() => setShowFilters(false)}
        title={filtersTitleText(results.length)}
      >
        {Object.keys(filtered).map((group) => (
          <FilterGroup key={group}>
            <header>
              <h2>{group}</h2>
              <ClearButton
                onClick={() => clearFilterGroup(group)}
                show={getCheckedKeys(filtered[group]).length > 0}
              >
                Clear
              </ClearButton>
            </header>
            {filters[group].map((item) => (
              <FilterCheckLabel
                key={item.id}
                checked={filtered[group][item.id]}
                htmlFor={item.id}
              >
                <FilterCheckbox checked={filtered[group][item.id]}>
                  <CheckIcon></CheckIcon>
                </FilterCheckbox>
                {item.label}
                <input
                  name={group}
                  id={item.id}
                  type="checkbox"
                  onChange={checkboxHandler}
                  checked={filtered[group][item.id]}
                />
              </FilterCheckLabel>
            ))}
          </FilterGroup>
        ))}
      </FilterWrapper>

      <InnerWrapper>
        <ResultsList>
          {results.map((film) => (
            <Link key={film.slug} href={`/films/${film.slug}`} passHref>
              <Result film={film}></Result>
            </Link>
          ))}
        </ResultsList>
      </InnerWrapper>
    </div>
  );
}

function getCheckedKeys(obj) {
  return Object.keys(obj).filter((key) => obj[key]);
}

function getLabel(key, arr) {
  return arr.find((item) => item.id === key).label;
}

function filtersTitleText(num) {
  if (num === 0) {
    return "No matches";
  }
  return `${num} match${num > 1 ? "es" : ""}`;
}

const Result = forwardRef(({ onClick, href, film }, ref) => {
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
      brandCollection(order: [name_ASC]) {
        items {
          name
        }
      }
    }
  `);

  const brands = fetchBrands.brandCollection.items.map((b) => ({
    label: b.name,
    id: b.name.toLowerCase().replace(/\s/g, ""),
  }));
  const types = [...new Set(films.map((film) => film.type))].map((t) => ({
    label: t,
    id: t.toLowerCase().replace(/\s/g, ""),
  }));
  const formats = [
    ...new Set(...films.map((film) => film.format)),
  ].map((f) => ({ label: f, id: f.toLowerCase().replace(/\s/g, "") }));

  return {
    props: {
      filters: {
        brands,
        types,
        iso: [0, 6400],
        formats,
      },
      films,
    },
  };
}

export const withPageRouter = (Component) => {
  return withRouter(({ router, ...props }) => {
    router.query = queryString.parse(router.asPath.split(/\?/)[1], {
      arrayFormat: "index",
    });
    return <Component {...props} router={router} />;
  });
};

export default withPageRouter(Search);
