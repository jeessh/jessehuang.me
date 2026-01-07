import styled from "styled-components";
import Navbar from "./sections/navbar";
import Hero from "./sections/hero";

const SimpleView = () => {
  return (
    <>
      <Container>
        <Navbar />
        <Hero />
      </Container>
    </>
  );
};

const Container = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export default SimpleView;
