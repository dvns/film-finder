import styled from "styled-components";

export const CardDiv = styled.div`
  width: 100%;
  height: 250px;

  border-radius: ${(props) => props.theme.borderRadius};
  box-shadow: ${(props) => props.theme.uiShadow};
  /* border: 1px solid ${(props) => props.theme.colorOutlines}; */
  background-image: ${(props) => `url(${props.imgUrl})`};
  background-size: 125px;
  background-repeat: no-repeat;
  background-position: center center;
  background-color: white;
  margin-top: 15px;

  @media (min-width: 768px) {
    height: auto;
    padding-top: 62.5%;
  }
`;