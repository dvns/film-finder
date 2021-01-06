import styled from 'styled-components';

export const Input = styled.input`
  width: 100%;
  padding: 10px 45px;
  border-radius: 5px;
  background: white;
  border-width: 1px;
  border-style: solid;
  border-color: white;
  outline: 0;
  -webkit-appearance: none;
  font-family: "Inter";
  font-size: 18px;
  font-weight: 500;

  &::placeholder {
    color: #c5c5c5;
  }
`;