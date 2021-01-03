import { useState, forwardRef } from 'react';
import queryString from 'query-string';
import Link from 'next/link';
import { useRouter } from 'next/router';
import SearchInput from '../SearchInput';
import Product from '../Product';
import {
  matchAnyCaseInsensitive,
  stringToArrayLowerCase,
} from '../../utils/searchHelpers';

const Result = forwardRef(({ onClick, href, film }, ref) => {
  return (
    <a href={href} onClick={onClick} ref={ref}>
      <Product>
        {film.image && <img src={film.image.url} />}
        <p>{`${film.brand.name} ${film.name}`}</p>
      </Product>
    </a>
  );
});

export default function SearchSuggested({items}) {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);

  function changeHandler(e) {
    const value = e.target.value
    setSearchTerm(value);
    filterItems(value);
  }

  function filterItems(value) {
    if (value.trim().length < 2) {
      setResults([]);
      return;
    }
    const words = stringToArrayLowerCase(value);
    const res = items.filter(item => {
      const name = item.brand.name.toLowerCase() + ' ' + item.name.toLowerCase();
      return matchAnyCaseInsensitive(name, words);
    });
    setResults(res);
  }

  function submitHandler(e) {
    e.preventDefault();
    const query = {
      q: searchTerm,
    }
    router.push({
      pathname: '/search',
      query: queryString.stringify(query, {arrayFormat: 'index'})
    })
  }

  return (
    <>
      <form onSubmit={submitHandler}>
        <SearchInput value={searchTerm} handleChange={changeHandler} />
      </form>
      {results.map((film) => (
        <Link key={film.slug} href={`/films/${film.slug}`} passHref>
          <Result film={film}></Result>
        </Link>
      ))}
    </>
  );
}