import styled from "styled-components";
import Navbar from "./sections/1_navbar";
import Hero from "./sections/2_hero";
import ParallaxText from "./sections/parallax-text";
import Experience from "./sections/3_experience";
import Projects from "./sections/4_projects";
import About from "./sections/5_about";
import Contact from "./sections/6_contact";

const SimpleView = () => {
  return (
    <>
      <Container>
        <Navbar />
        <ParallaxText />
        <Content>
          <Hero />
          <Experience />
          <ExtraSpacing />
          <Projects />
          <ExtraSpacing />
          <About />
          <Contact />
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
  display: flex;
  flex-direction: column;
  gap: 6rem;
`;

const ExtraSpacing = styled.div`
  height: 6rem;
`;

export default SimpleView;
