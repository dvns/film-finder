import styled from 'styled-components';

export const Suggested = styled.div`
  position: ${props => props.focused ? 'fixed' : 'static'};
  width: 100%;
  height: ${props => props.focused ? '100vh' : 'auto'};
`;

export const Results = styled.div`
  width: 100%;
  height: 100%;
  border: 1px solid red;
  overflow: scroll;

  a {
    display: block;
    border-bottom: 1px solid #e5e5e5;
  }
`;