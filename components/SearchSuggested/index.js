import { useEffect, useState, forwardRef } from "react";
import queryString from "query-string";
import Link from "next/link";
import { useRouter } from "next/router";

import IconX from "../Icons/IconX";
import SearchIcon from "../Icons/IconSearch";
import SearchInput from "../SearchInput";
import Product from "../Product";

import {
  matchAnyCaseInsensitive,
  stringToArrayLowerCase,
} from "../../utils/searchHelpers";

import {
  CancelButton,
  SearchWrapper,
  IconWrapper,
  InstructionText,
  Results,
  Suggested,
} from "./styles";

function boldText(text, searchTerm) {
  const searchArr = searchTerm.trim().split(/\s+/);
  const textArr = text.trim().split(/\s+/);
  textArr.forEach((t, idx) => {
    searchArr.forEach((w) => {
      const regex = new RegExp(w, "gi");
      const bold = textArr[idx].replace(regex, (str) => `<b>${str}</b>`);
      textArr[idx] = bold;
    });
  });
  return textArr.join(" ");
}

const Result = forwardRef(({ onClick, href, film, searchTerm }, ref) => {
  return (
    <a href={href} onClick={onClick} ref={ref} tabIndex="0">
      <Product
        img={film.image}
        title={boldText(`${film.brand.name} ${film.name}`, searchTerm)}
      ></Product>
    </a>
  );
});

const minSearchLength = 2;

export default function SearchSuggested({ items }) {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);
  const [focused, setFocused] = useState(false);

  useEffect(() => {
    const escHandler = (event) => {
      if (event.keyCode === 27) {
        setFocused(false);
      }
    };
    window.addEventListener("keydown", escHandler);

    return () => {
      window.removeEventListener("keydown", escHandler);
    };
  }, []);

  useEffect(() => {
    if (focused) return;
    setSearchTerm("");
  }, [focused]);

  useEffect(() => {
    filterItems();
  }, [searchTerm]);

  function changeHandler(e) {
    const value = e.target.value;
    setSearchTerm(value);
  }

  function filterItems() {
    if (searchTerm.trim().length < minSearchLength) {
      setResults([]);
      return;
    }
    const words = stringToArrayLowerCase(searchTerm);
    const res = items.filter((item) => {
      const name =
        item.brand.name.toLowerCase() + " " + item.name.toLowerCase();
      return matchAnyCaseInsensitive(name, words);
    });
    setResults(res);
  }

  function submitHandler(e) {
    e.preventDefault();
    setFocused(false);
    const query = {
      q: searchTerm,
    };
    router.push({
      pathname: "/search",
      query: queryString.stringify(query, { arrayFormat: "index" }),
    });
  }

  return (
    <Suggested>
      <form onSubmit={submitHandler}>
        <SearchWrapper>
          <IconWrapper>
            <SearchIcon fill={focused ? "#080b2f" : "#080b2f"} />
          </IconWrapper>
          <SearchInput
            value={searchTerm}
            handleChange={changeHandler}
            handleFocus={(boolean) => setFocused(boolean)}
            active={focused}
            placeholder="Search"
          />
          <CancelButton
            type="button"
            show={focused && searchTerm.length > 0}
            onClick={() => setFocused(false)}
          >
            <IconX fill="white" />
          </CancelButton>
        </SearchWrapper>
      </form>

      <Results show={focused && searchTerm.length >= minSearchLength}>
        {results.length < 1 && (
          <InstructionText>No results for "{searchTerm}".</InstructionText>
        )}
        {results.length > 0 &&
          results.map((film) => (
            <Link key={film.slug} href={`/films/${film.slug}`} passHref>
              <Result film={film} searchTerm={searchTerm}></Result>
            </Link>
          ))}
      </Results>
    </Suggested>
  );
}
