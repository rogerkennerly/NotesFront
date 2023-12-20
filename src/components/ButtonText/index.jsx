import { Container } from "./style";

export function ButtonText({text, isActive = false, ...rest}){
  return (
    <Container type="button" {...rest} isActive={isActive} >
      {text}
    </Container>
  )
}