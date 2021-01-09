import styled from 'styled-components';
import StyledButton from "../Button";

export const Suggested = styled.div`
  width: 100%;
  position: relative;
`;

export const SearchWrapper = styled.div`
  position: relative;
`;

export const Results = styled.div`
  position: absolute;
  top: calc(100% + 10px);
  display: ${(props) => (props.show ? "block" : "none")};
  width: 100%;
  max-height: 315px;
  border-radius: ${(props) => props.theme.borderRadius};
  background: white;
  overflow: scroll;
  padding: 10px;
  box-shadow: ${(props) => props.theme.uiShadow};

  a {
    display: block;
    &:not(:last-child) {
      margin-bottom: 10px;
    }
  }
`;

export const CancelButton = styled(StyledButton)`
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  width: 25px;
  height: 25px;
  padding: 7px;
  transition: visibility 0.2s ease-out, opacity 0.2s ease-out;
  visibility: ${(props) => (props.show ? "visible" : "hidden")};
  opacity: ${(props) => (props.show ? "1" : "0")};
`;

export const InstructionText = styled.p`
  margin: 0;
  padding: 10px 0;
`;

export const IconWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 10px;
  transform: translateY(-50%);
  width: 25px;
  height: 25px;
  svg {
    width: 100%;
    transition: fill 0.2s ease-out;
  }
`;