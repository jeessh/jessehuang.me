import React from "react";
import styled from "styled-components";

const Hero = () => {
  return (
    <Container>
      <TextWrapper>
        <Header>hey im jesse</Header>
        <Header>i make things for fun</Header>
      </TextWrapper>
    </Container>
  );
};

const Container = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: #9d9dcd;
  min-width: 100%;
  min-height: 100vh;
`;

const TextWrapper = styled.div``;

const Header = styled.h1``;

export default Hero;
