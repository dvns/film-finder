import styled from 'styled-components';

export const ProductDiv = styled.div`
  display: flex;
  align-items: center;
`;

export const Title = styled.p`
  margin: 0;
  color: ${(props) => props.theme.colorHeading};
`;

export const ImageContainer = styled.div`
  flex-shrink: 0;
  display: inline-block;
  width: 50px;
  height: 50px;

  img {
    display: block;
    width: 100%;
  }
`

export const ProductInfo = styled.div`
  flex-grow: 1;
  padding: 15px;
`