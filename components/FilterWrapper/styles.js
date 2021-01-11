import styled from "styled-components";

export const StyledFilterWrapper = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 999;
  width: 100%;
  height: ${(props) => (props.show ? "100%" : "0%")};
  background: white;
  transition: visibility 0.2s ease-out, height 0.2s ease-in;
  transition-delay: visibility 0.2s;
  visibility: ${(props) => (props.show ? "visible" : "hidden")};
  /* opacity: ${(props) => (props.show ? "1" : "0")}; */

  h1 {
    margin: 0;
    font-size: 24px;
  }
`;

export const FilterHeader = styled.header`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 999;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 20px;
  background: white;
  border-bottom: 1px solid ${(props) => props.theme.brandSecondary};
`;

export const FilterBody = styled.div`
  height: 100%;
  overflow: scroll;
  padding: 20px;
  padding-top: 102px;
`;

export const FilterGroup = styled.div`
  margin-bottom: 20px;
  padding: 20px;
  border-radius: ${(props) => props.theme.borderRadius};
  background: ${(props) => props.theme.brandSecondary};

  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    min-height: 32px;
    margin-bottom: 20px;
  }

  h2 {
    font-size: 20px;
    margin: 0;
  }
`;

export const FilterCheckbox = styled.div`
  width: 20px;
  height: 20px;
  margin-right: 10px;
  border-radius: 7px;
  border: 1px solid
    ${(props) =>
      props.checked ? props.theme.brandPrimary : props.theme.colorOutlines};
  background: ${(props) =>
    props.checked ? props.theme.brandPrimary : "transparent"};

  svg {
    fill: ${(props) => (props.checked ? "white" : "transparent")};
  }
`;

export const FilterCheckLabel = styled.label`
  position: relative;
  display: flex;
  margin-bottom: 20px;
  font-weight: 500;
  color: ${(props) =>
    props.checked ? props.theme.brandPrimary : props.theme.colorBody};
  transition: all 0.1s;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  input[type="checkbox"] {
    position: absolute;
    top: 0;
    opacity: 0;
  }

  &:focus-within {
    ${FilterCheckbox} {
      outline: -webkit-focus-ring-color auto 1px;
    }
  }
`;