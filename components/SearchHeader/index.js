import {
  forwardRef,
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

const SearchContainer = styled.div`
  padding-bottom: 20px;
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
    onHeightChange(height);
  }

  useLayoutEffect(() => {
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  useEffect(() => {
    updateSize();
  }, [headerRef]);

  return (
    <StyledHeader showSearch={showSearch}>
      <InnerWrapper>
        <HeaderContainer ref={headerRef}>
          <h1>
            FILM<br></br>STOCK<br></br>FRIDAY
          </h1>
          <SearchButton
            showSearch={showSearch}
            onClick={() => setShowSearch((show) => !show)}
          >
            {showSearch ? <CloseIcon /> : <SearchIcon />}
          </SearchButton>
        </HeaderContainer>
        {showSearch && (
          <SearchContainer>
            <SearchSuggested items={films} />
            <Overlay onClick={() => setShowSearch(false)} />
          </SearchContainer>
        )}
      </InnerWrapper>
    </StyledHeader>
  );
}
