import styled from 'styled-components';

export const Suggested = styled.div`
  position: ${props => props.focused ? 'fixed' : 'static'};
  width: 100%;
  height: ${props => props.focused ? '100vh' : 'auto'};
`;

export const Results = styled.div`
  display: ${props => props.show ? 'block' : 'none'};
  width: 100%;
  height: 100%;
  overflow: scroll;

  a {
    display: block;
    border-bottom: 1px solid #e5e5e5;
  }
`;

export const CancelButton = styled.button`
`;

export const InstructionText = styled.p`
`;