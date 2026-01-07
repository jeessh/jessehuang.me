import styled from "styled-components";
import Navbar from "./sections/1_navbar";
import Hero from "./sections/2_hero";
import Experience from "./sections/3_experience";

const SimpleView = () => {
  return (
    <>
      <Container>
        <Navbar />
        <Hero />
        <Experience />
      </Container>
    </>
  );
};

const Container = styled.main`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: stretch;
`;

export default SimpleView;
