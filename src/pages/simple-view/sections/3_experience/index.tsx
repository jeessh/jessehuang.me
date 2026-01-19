import ExperienceCard from "./components/experience_card";
import Clothesline from "./components/clothesline";
import { experiences } from "./experiences";
import styled from "styled-components";

const Experience = () => {
  return (
    <Container>
      <Clothesline position="top" />
      <Clothesline position="bottom" reverse />
      <PolaroidsWrapper>
        {experiences.map((exp, index) => (
          <PolaroidWrapper key={index} $index={index}>
            <ExperienceCard
              logo={exp.logo}
              alt={exp.alt}
              company={exp.company}
              role={exp.role}
              start={exp.start}
              end={exp.end}
              gradient={exp.gradient}
              index={index}
            />
          </PolaroidWrapper>
        ))}
      </PolaroidsWrapper>
    </Container>
  );
};

const Container = styled.section`
  padding: 4rem 2rem;
  position: relative;
`;

const PolaroidsWrapper = styled.div`
  display: grid;
  gap: 3rem;
  padding-top: 3rem;
  max-width: 1200px;
  margin: 0 auto;
  justify-items: center;

  grid-template-columns: repeat(4, 1fr);

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
    row-gap: calc(3rem + 128px);
  }
`;

const PolaroidWrapper = styled.div<{ $index: number }>`
  ${(props) => {
    const positions = [
      { top: "5px" },
      { top: "35px" },
      { top: "55px" },
      { top: "75px" },
    ];
    return `
        position: relative;
        top: ${positions[props.$index % 4].top};
      `;
  }}

  // split into two rows for smaller screens
  @media (max-width: 1024px) {
    ${(props) => {
      // First row (0, 1) hangs from top line - steeper slope
      // Second row (2, 3) hangs from bottom line - gentler slope
      const row = Math.floor(props.$index / 2);
      const col = props.$index % 2;

      if (row === 0) {
        // Top row: steeper slope (left high, right low)
        return col === 0 ? "top: 20px;" : "top: 65px;";
      } else {
        // Bottom row: gentler slope (left high, right slightly lower)
        return col === 0 ? "top: 15px;" : "top: 40px;";
      }
    }}
    position: relative;
  }
`;

export default Experience;
