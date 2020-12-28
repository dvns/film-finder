import styled from 'styled-components';

export const LazyContainer = styled.div`
  position: relative;
  display: inline-block;
  width: 100%;
  margin-bottom: 10px;
`

export const Image = styled.img`
  display: block;
  width: 100%;
  opacity: ${props => props.show ? 1 : 0};
  transition: opacity 0.3s ease-in-out;
`;

export const Placeholder = styled.div.attrs(({ dataHeight }) => ({
  style: {
    height: dataHeight,
  },
}))`
  position: ${props => props.hidden ? 'absolute' : 'static'};
  top: 0;
  left: 0;
  opacity: ${props => props.hidden ? 0 : 1};
  display: inline-block;
  width: 100%;
  background: #f1f1f1;
  transition: opacity 0.3s ease-in-out;
`;