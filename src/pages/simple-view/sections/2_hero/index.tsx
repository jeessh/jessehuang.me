import styled from "styled-components";

const Hero = () => {
  return (
    <Container>
      <TextWrapper>
        <Header>hey i'm jesse </Header>
        <Header>throwing random shit at things</Header>
      </TextWrapper>
    </Container>
  );
};

const Container = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-width: 100%;
  min-height: 80vh;
`;

const TextWrapper = styled.div`
  animation: slideInFromLeft 0.6s ease-out;

  @keyframes slideInFromLeft {
    from {
      opacity: 0;
      transform: translateX(-50px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }
`;

const Header = styled.h1``;

export default Hero;
