import styled from "styled-components";

const StyledHeader = styled.header`
  width: 100%;
  padding: 10px;
  background: white;
  text-align: center;
  /* border-bottom: 1px solid ${props => props.theme.brandSecondary}; */
  h1 {
    font-size: 16px;
    margin: 0;
  }
`;

export default function PageHeader({children}) {
  return (
    <StyledHeader>
      {children}
    </StyledHeader>
  )
};