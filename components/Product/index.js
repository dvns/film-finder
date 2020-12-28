import styled from 'styled-components';

const Card = styled.div`

`;

export default function Product({children}) {
  return (
    <Card>
      {children}
    </Card>
  )
};
