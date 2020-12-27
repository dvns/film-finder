import styled from 'styled-components';

export const MasonryDiv = styled.div`
  display: grid;
  grid-auto-flow: column;
  grid-gap: ${props => props.gap || '10px'};
  max-width: 1200px;
  border: 1px solid red;
`;

export const Col = styled.div`
`;