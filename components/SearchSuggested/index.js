import { useState, forwardRef } from 'react';
import Link from 'next/link';
import SearchInput from '../SearchInput';
import Product from '../Product';

export default function SearchSuggested({items}) {
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
    const words = value.toLowerCase().trim().split(/\s+/);
    const res = items.filter(item => {
      const name = item.brand.name.toLowerCase() + ' ' + item.name.toLowerCase();
      return words.some(word => {
        let regex = new RegExp(word, 'i');
        return regex.exec(name);
      })
    });
    setResults(res);
  }

  const Result = forwardRef(({ onClick, href, film }, ref) => {
    return (
      <a href={href} onClick={onClick} ref={ref}>
        <Product>
          <p>{`${film.brand.name} ${film.name}`}</p>
        </Product>
      </a>
    );
  });

  return (
    <>
      <SearchInput value={searchTerm} handleChange={changeHandler} />
      {results.map((film) => (
        <Link key={film.slug} href={`/films/${film.slug}`} passHref>
          <Result film={film}>
          </Result>
        </Link>
      ))}
    </>
  );
}