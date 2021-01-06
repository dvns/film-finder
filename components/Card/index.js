import { CardDiv } from "./styles";

export default function Card({image}) {
  return(
    <CardDiv imgUrl={image.url} />
  )
}