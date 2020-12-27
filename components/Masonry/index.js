import {useEffect, useRef, useState} from 'react';
import { Col, MasonryDiv } from './styles';

const populateCols = (children, cols) => {
  children.forEach((child, i) => cols[i % cols.length].push(child));
};

export default function Masonry({children, gap, minWidth = 500}) {
  const masonryRef = useRef(null);
  const [colsCount, setColsCount] = useState(3);
  const cols = [...Array(colsCount)].map(() => []);
  populateCols(children, cols);

  const resizeHandler = () =>
    setColsCount(Math.ceil(masonryRef.current.offsetWidth / minWidth));

  useEffect(() => {
    resizeHandler();
    window.addEventListener('resize', resizeHandler);
    return () => {
      window.removeEventListener('resize', resizeHandler);
    }
  }, [])

  return (
    <MasonryDiv ref={masonryRef} gap={gap} col={colsCount}>
      {[...Array(colsCount).keys()].map(i => (
        <Col key={i} gap={gap}>
          {cols[i]}
        </Col>
      ))}
    </MasonryDiv>
  );
}