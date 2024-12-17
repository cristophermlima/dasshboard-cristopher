import { CardComponent, Header } from '@/components'
import { Container } from '@mui/material'

function Home() {
  return (
    <>
      <Header></Header>
      <Container maxWidth="lg">
        <CardComponent>CARD</CardComponent>
      </Container>
      <Header />
    </>
  )
}

export default Home
