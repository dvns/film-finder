import {
  Scroll,
  ScrollContainer,
  Item,
} from "./styles";

export default function HorizontalScroll({children, paddingLeft}) {
  return (
    <ScrollContainer>
      <Scroll style={{ paddingLeft }}>
        {children.map((c) => (
          <Item key={c.key}>{c}</Item>
        ))}
      </Scroll>
    </ScrollContainer>
  );
}