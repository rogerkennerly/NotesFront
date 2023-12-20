import { Container } from "./style";

export function Tag({text, ...rest}){
  return(
    <Container {...rest}>
      {text}
    </Container>
  )
}