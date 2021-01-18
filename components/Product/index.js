import styled from "styled-components";
import { StyledProduct, Title, ImageContainer, ProductInfo, Tag } from "./styles";
import StyledButton from "../Button";
import ArrowIcon from "../Icons/IconArrow";
import FilmIcon from "../Icons/IconFilm";

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

function sortTags(tags) {
  const sorted = tags.sort((a, b) => {
    if (a < b) {
      return -1;
    }
    if (a > b) {
      return 1;
    }
    return 0;
  });

  return sorted;
}

export default function Product({ title, img, style, info, bgColor, tags }) {
  return (
    <StyledProduct className={style}>
      <ImageContainer bgColor={bgColor}>
        {img && <img src={img.url}></img> || <FilmIcon opacity="0.3" />}
      </ImageContainer>
      <ProductInfo>
        <Title dangerouslySetInnerHTML={{ __html: title }}></Title>
        {info}
        {tags && sortTags(tags).map((tag) => <Tag key={tag}>{tag}</Tag>)}
      </ProductInfo>
      <GoButton tabIndex="-1">
        <ArrowIcon></ArrowIcon>
      </GoButton>
    </StyledProduct>
  );
}
