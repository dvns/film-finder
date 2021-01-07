import styled from 'styled-components';

const gutter = '20px';

export const ScrollContainer = styled.div`
  display: grid;
  grid-template-columns: ${gutter} 1fr ${gutter};
  align-content: start;
  margin: 0 -${gutter};
`;

export const Scroll = styled.ul`
  list-style: none;
  padding: 0;
  display: grid;
  grid-gap: calc(${gutter} / 2);
  grid-template-columns: 10px;
  grid-template-rows: minmax(150px, 1fr);
  grid-auto-flow: column;
  grid-auto-columns: calc(50% - ${gutter} * 2);
  grid-column: 1 / -1;

  overflow-x: scroll;
  scroll-snap-type: x proximity;
  padding-bottom: 40px;

  &::before,
  &::after {
    content: "";
    width: 10px;
  }
`;

export const Item = styled.li`
  scroll-snap-align: center;
`;