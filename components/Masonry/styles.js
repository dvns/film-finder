import styled from 'styled-components';

export const MasonryDiv = styled.div`
  display: grid;
  grid-template-columns: ${props => `repeat(${props.col}, minmax(0, 1fr))`};
  grid-gap: ${props => props.gap || '10px'};
  max-width: 1200px;
`;

export const Col = styled.div`
`;