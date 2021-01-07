import styled from 'styled-components';

export const Input = styled.input`
  width: 100%;
  padding: 10px 45px;
  border-radius: 10px;
  background: white;
  border-width: 1px;
  border-style: solid;
  border-color: ${(props) => (props.active ? "#080b2f" : "#d2d2d2")};
  outline: 0;
  -webkit-appearance: none;
  font-family: "Inter";
  font-size: 16px;
  font-weight: 500;
  transition: border-color 0.2s ease-out;

  &::placeholder {
    color: #d2d2d2;
    font-weight: 400;
  }
`;