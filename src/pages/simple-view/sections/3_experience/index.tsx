import ExperienceCard from "./components/experience_card";
import { experiences } from "./experiences";
import styled from "styled-components";

const Experience = () => {
  return (
    <Container>
      {experiences.map((exp, index) => (
        <ExperienceCard
          key={index}
          logo={exp.logo}
          alt={exp.alt}
          company={exp.company}
          role={exp.role}
          start={exp.start}
          end={exp.end}
        />
      ))}
    </Container>
  );
};

const Container = styled.section`

`;

const SectionTitle = styled.h2`
  margin-bottom: 16px;
`;


export default Experience;
