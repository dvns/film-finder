import { useEffect, useState, forwardRef } from "react";
import Link from "next/link";
import { withRouter } from "next/router";
import queryString from "query-string";

import Product from "../../components/Product";
import SearchSuggested from "../../components/SearchSuggested";

import { fetchContent, fetchFilms } from "../../utils/contentfulHelpers";
import {
  matchAnyCaseInsensitive,
  stringToArrayLowerCase,
} from "../../utils/searchHelpers";

export const withPageRouter = (Component) => {
  return withRouter(({ router, ...props }) => {
    router.query = queryString.parse(router.asPath.split(/\?/)[1], {
      arrayFormat: "index",
    });
    return <Component {...props} router={router} />;
  });
};

function getCheckedKeys(obj) {
  return Object.keys(obj).filter((key) => obj[key]);
}

function getLabel(key, arr) {
  return arr.find((item) => item.id === key).label;
}

function Search({ router, filters, films }) {
  const [filtered, setFiltered] = useState({
    brands: initCheckedObj(filters.brands, router.query.brands),
    types: initCheckedObj(filters.types, router.query.types),
    formats: initCheckedObj(filters.formats, router.query.formats),
  });
  const [searchTerm, setSearchTerm] = useState(router.query.q || "");
  const [results, setResults] = useState([]);

  useEffect(() => {
    const newFiltered = {
      brands: initCheckedObj(filters.brands, router.query.brands),
      types: initCheckedObj(filters.types, router.query.types),
      formats: initCheckedObj(filters.formats, router.query.formats),
    };
    setFiltered(newFiltered);
    setSearchTerm(router.query.q || "");
  }, [router.query]);

  useEffect(() => {
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
    router.push(
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
    <div suppressHydrationWarning>
      <SearchSuggested items={films} />
      <h1>Filters</h1>
      <h2>Brands:</h2>
      {filters.brands.map((brand) => (
        <div key={brand.id}>
          <label>
            {brand.label}
            <input
              name="brands"
              id={brand.id}
              type="checkbox"
              onChange={checkboxHandler}
              checked={filtered.brands[brand.id]}
            />
          </label>
        </div>
      ))}
      <h2>Formats:</h2>
      {filters.formats.map((format) => (
        <div key={format.id}>
          <label>
            {format.label}
            <input
              name="formats"
              id={format.id}
              type="checkbox"
              onChange={checkboxHandler}
              checked={filtered.formats[format.id]}
            />
          </label>
        </div>
      ))}
      <h2>Types:</h2>
      {filters.types.map((type) => (
        <div key={type.id}>
          <label>
            {type.label}
            <input
              name="types"
              id={type.id}
              type="checkbox"
              onChange={checkboxHandler}
              checked={filtered.types[type.id]}
            />
          </label>
        </div>
      ))}
      <p>{`Search results for: "${searchTerm}"`}</p>
      {results.map((film) => (
        <Link key={film.slug} href={`/films/${film.slug}`} passHref>
          <Result film={film}></Result>
        </Link>
      ))}
    </div>
  );
}

const Result = forwardRef(({ onClick, href, film }, ref) => {
  return (
    <a href={href} onClick={onClick} ref={ref}>
      <Product
        title={`${film.brand.name} ${film.name}`}
        img={film.image}
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

export default withPageRouter(Search);
