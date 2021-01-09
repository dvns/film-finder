import styled from "styled-components";

const StyledButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: ${(props) => props.theme.borderRadius};
  border: none;
  background: ${(props) => props.theme.brandPrimary};
  box-shadow: ${(props) => props.theme.uiShadow};
  svg {
    width: 100%;
  }
`;

export default StyledButton;