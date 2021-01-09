import styled from "styled-components";
import { StyledFilterWrapper, FilterBody } from "./styles";
import StyledButton from "../Button";
import IconX from "../Icons/IconX";

const CloseButton = styled(StyledButton)`
  width: 42px;
  height: 42px;
  padding: 14px;
  box-shadow: none;
  background: none;

  svg {
    fill: ${props => props.theme.brandPrimary};
  }
`;

export default function FilterWrapper({ show, closeHandler, title, children }) {
  return (
    <StyledFilterWrapper show={show}>
      <header>
        <h1>{title}</h1>
        <CloseButton onClick={() => closeHandler()}>
          <IconX></IconX>
        </CloseButton>
      </header>
      <FilterBody show={show}>
        {children}
      </FilterBody>
    </StyledFilterWrapper>
  );
}
