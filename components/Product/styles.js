import styled from "styled-components";

export const Title = styled.p`
  font-size: 16px !important;
  margin: 0;
  color: ${(props) => props.theme.colorHeading};
`;

export const ImageContainer = styled.div`
  flex-shrink: 0;
  position: relative;
  z-index: 0;
  display: inline-block;
  width: 35px;
  height: 35px;

  &::after {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: -1;
    display: block;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-color: ${(props) => props.bgColor || props.theme.brandSecondary};
  }

  img {
    display: block;
    width: 100%;
  }
`;

export const ProductInfo = styled.div`
  flex-grow: 1;
  padding: 15px;

  p {
    margin: 0;
    font-size: 12px;
    &:not(:last-child) {
      margin-bottom: 5px;
    }
  }
`;

export const Tag = styled.span`
  font-size: 12px;
  color: ${(props) => props.theme.colorBody};
  background: ${(props) => props.theme.brandSecondary};
  border-radius: 5px;
  margin-right: 5px;
  padding: 3px 5px;
`;

export const StyledProduct = styled.div`
  display: flex;
  align-items: center;

  &.full {
    min-height: 115px;
    border-radius: ${(props) => props.theme.borderRadius};
    box-shadow: ${(props) => props.theme.uiShadow};
    background: white;
    padding: 0 10px;
    /* border: 1px solid ${(props) => props.theme.colorOutlines}; */

    ${Title} {
      font-weight: 600;
    }

    ${ImageContainer} {
      width: 50px;
      height: 50px;
    }
  }
`;
