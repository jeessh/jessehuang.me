import styled from "styled-components";
import Navbar from "./sections/1_navbar";
import Hero from "./sections/2_hero";
import Experience from "./sections/3_experience";
import About from "./sections/4_about";
import Contact from "./sections/5_contact";

const SimpleView = () => {
  return (
    <>
      <Container>
        <Navbar />
        <Content>
          <Hero />
          <Experience />
          <About />
          <Contact scrolled={false} />
        </Content>
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

const Content = styled.div`
  width: 80%;
  margin: 0 auto;
`;

export default SimpleView;
