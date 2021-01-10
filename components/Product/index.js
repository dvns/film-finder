import styled from "styled-components";
import { StyledProduct, Title, ImageContainer, ProductInfo, Tag } from "./styles";
import StyledButton from "../Button";
import ArrowIcon from "../Icons/IconArrow";

const GoButton = styled(StyledButton)`
  background: none;
  box-shadow: none;
  width: 25px;
  height: 25px;
  padding: 0;

  svg {
    width: 15px;
    fill: ${(props) => props.theme.brandPrimary};
  }
`;

export default function Product({ title, img, style, info, bgColor, tags }) {
  return (
    <StyledProduct className={style}>
      <ImageContainer bgColor={bgColor}>
        {img && <img src={img.url}></img>}
      </ImageContainer>
      <ProductInfo>
        <Title dangerouslySetInnerHTML={{ __html: title }}></Title>
        {info}
        {tags && tags.map((tag) => (
          <Tag key={tag}>{tag}</Tag>
        ))}
      </ProductInfo>
      {style === "full" && (
        <GoButton tabIndex="-1">
          <ArrowIcon></ArrowIcon>
        </GoButton>
      )}
    </StyledProduct>
  );
}
