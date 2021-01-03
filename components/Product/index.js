import styled from 'styled-components';

const Card = styled.div`
  img {
    width: 100px;
  }
`;

export default function Product({children}) {
  return (
    <Card>
      {children}
    </Card>
  )
};
