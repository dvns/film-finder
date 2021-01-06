import styled from 'styled-components';

export const Suggested = styled.div`
  width: 100%;
  position: relative;

  form {
    
    /* border-bottom: 1px solid #e5e5e5; */
  }
`;

export const SearchWrapper = styled.div`
  position: relative;
`;

export const Results = styled.div`
  position: absolute;
  top: calc(100% + 10px);
  display: ${(props) => (props.show ? "block" : "none")};
  width: 100%;
  max-height: 315px;
  border-radius: 5px;
  background: white;
  overflow: scroll;
  padding: 10px;
  box-shadow: 0 0.6px 2.2px rgba(0, 0, 0, 0.011),
    0 1.3px 5.3px rgba(0, 0, 0, 0.016), 0 2.5px 10px rgba(0, 0, 0, 0.02),
    0 4.5px 17.9px rgba(0, 0, 0, 0.024), 0 8.4px 33.4px rgba(0, 0, 0, 0.029),
    0 20px 80px rgba(0, 0, 0, 0.04);

  a {
    display: block;
    &:not(:last-child) {
      margin-bottom: 10px;
    }
  }
`;

export const CancelButton = styled.button`
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  justify-content: center;
  width: 25px;
  height: 25px;
  padding: 7px;
  border-radius: 5px;
  border: none;
  background: black;
  box-shadow: 0 0.6px 2.2px rgba(0, 0, 0, 0.011),
    0 1.3px 5.3px rgba(0, 0, 0, 0.016), 0 2.5px 10px rgba(0, 0, 0, 0.02),
    0 4.5px 17.9px rgba(0, 0, 0, 0.024), 0 8.4px 33.4px rgba(0, 0, 0, 0.029),
    0 20px 80px rgba(0, 0, 0, 0.04);
  transition: visibility 0.2s ease-out, opacity 0.2s ease-out;
  visibility: ${(props) => (props.show ? "visible" : "hidden")};
  opacity: ${(props) => (props.show ? "1" : "0")};
  svg {
    width: 100%;
  }
`;

export const InstructionText = styled.p`
  margin: 0;
  padding: 10px 0;
`;

export const IconWrapper = styled.div`
  position: absolute;
  top: calc(50% + 5px);
  left: 10px;
  transform: translateY(-50%);
  width: 25px;
  svg {
    width: 100%;
    transition: fill 0.2s ease-out;
  }
`;