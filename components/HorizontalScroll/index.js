import {
  Scroll,
  ScrollContainer,
  Item,
} from "./styles";

export default function HorizontalScroll({children}) {
  return (
    <ScrollContainer>
      <Scroll>
        {children.map((c) => (
          <Item key={c.key}>{c}</Item>
        ))}
      </Scroll>
    </ScrollContainer>
  );
}