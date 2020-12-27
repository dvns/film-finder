import styled from 'styled-components';

export const LazyContainer = styled.div`
  display: inline-block;
  width: 100%;
  margin-bottom: 10px;
`

export const Image = styled.img`
  display: block;
  width: 100%;
`;

export const Placeholder = styled.div.attrs(({ dataHeight }) => ({
  style: {
    height: dataHeight,
  }
}))`
  display: inline-block;
  width: 100%;
  background: #f1f1f1;
`;