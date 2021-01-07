import styled from "styled-components";

export const CardDiv = styled.div`
  width: 100%;
  height: 250px;
  border-radius: 10px;;
  border: 1px solid #d2d2d2;
  background-image: ${(props) => `url(${props.imgUrl})`};
  background-size: 80%;
  background-repeat: no-repeat;
  background-position: center center;
  background-color: white;
`;