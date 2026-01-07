import styled from 'styled-components'
import Navbar from './components/navbar'

const SimpleView = () => {
  return (
    <>
      <Container>
        <Navbar />
      </Container>
    </>
  )
}

const Container = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #0f172a;
`;

export default SimpleView
