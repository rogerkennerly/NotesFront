import { Container } from "./style";

export function Section ({text, children}){
  return (
    <Container>
      <h2>{text}</h2>
      {children}
    </Container>
  )
}