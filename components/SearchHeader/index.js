import Link from "next/link";

import {
  useRef,
  useEffect,
  useState,
  useLayoutEffect,
} from "react";

import styled from "styled-components";

import StyledButton from "../Button";
import CloseIcon from "../Icons/IconX";
import SearchIcon from "../Icons/IconSearch";
import SearchSuggested from "../SearchSuggested";

const InnerWrapper = styled.section`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
`;

const SearchButton = styled(StyledButton)`
  width: 30px;
  height: 30px;
  padding: 0;
  background: none;
  border: none;
  box-shadow: none;

  svg {
    width: ${(props) => (props.showSearch ? "15px" : "30px")};
    height: ${(props) => (props.showSearch ? "15px" : "30px")};
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
  opacity: ${(props) => (props.show ? "1" : "0")};
  visibility: ${(props) => (props.show ? "visible" : "hidden")};
`;

const SearchContainer = styled.div`
  padding-bottom: ${(props) => (props.show ? "20px" : "0")};
  max-height: ${(props) => (props.show ? "500px" : "0")};
  opacity: ${(props) => (props.show ? "1" : "0")};
  overflow: hidden;
  transition: all 0.2s ease-out;
`;

const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 0;

  h1 {
    font-size: 16px;
    line-height: 0.9;
    margin: 0;
    cursor: pointer;
  }
`;

const StyledHeader = styled.header`
  z-index: 9999;
  position: ${(props) => (props.showSearch ? "fixed" : "absolute")};
  top: 0;
  width: 100%;
  background: white;
`;


export default function SearchHeader({ films, onHeightChange }) {
  const headerRef = useRef(null);
  const [headerHeight, setHeaderHeight] = useState(0);
  const [showSearch, setShowSearch] = useState(false);

  function updateSize() {
    const height = headerRef.current.getBoundingClientRect().height;
    setHeaderHeight(height);
    onHeightChange && onHeightChange(height);
  }

  useLayoutEffect(() => {
    const escHandler = (event) => {
      if (event.keyCode === 27) {
        setShowSearch(false);
      }
    };

    updateSize();
    window.addEventListener("resize", updateSize);
    window.addEventListener("keydown", escHandler);
    return () => {
      window.removeEventListener("resize", updateSize);
      window.removeEventListener("keydown", escHandler);
    };
  }, []);

  useEffect(() => {
    updateSize();
  }, [headerRef]);

  return (
    <StyledHeader showSearch={showSearch}>
      <InnerWrapper>
        <HeaderContainer ref={headerRef}>
          <Link href="/">
            <h1>
              FILM<br></br>STOCK<br></br>FRIDAY
            </h1>
          </Link>
          <SearchButton
            showSearch={showSearch}
            onClick={() => setShowSearch((show) => !show)}
          >
            {showSearch ? <CloseIcon /> : <SearchIcon />}
          </SearchButton>
        </HeaderContainer>
        <SearchContainer show={showSearch}>
          <SearchSuggested
            items={films}
            onSubmit={() => setShowSearch(false)}
            showSearch={showSearch}
          />
          <Overlay show={showSearch} onClick={() => setShowSearch(false)} />
        </SearchContainer>
      </InnerWrapper>
    </StyledHeader>
  );
}
