import {ProductDiv, Title, ImageContainer, ProductInfo} from './styles';

export default function Product({title, img}) {
  return (
    <ProductDiv>
      <ImageContainer>{img && <img src={img.url}></img>}</ImageContainer>
      <ProductInfo>
        <Title dangerouslySetInnerHTML={{ __html: title }}></Title>
      </ProductInfo>
    </ProductDiv>
  );
};
