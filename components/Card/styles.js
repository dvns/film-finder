import styled from "styled-components";

export const CardDiv = styled.div`
  width: 100%;
  height: 250px;
  border-radius: 5px;
  background-image: ${(props) => `url(${props.imgUrl})`};
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center center;
  background-color: white;
`;