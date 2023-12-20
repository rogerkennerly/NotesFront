import { Container } from "./style";

export function Button({text, loading = false, ...rest}){
  return( 
    <Container type="button" disabled={loading} {...rest}>
      {loading ? 'Carregando...' : text}
    </Container>
  )
}