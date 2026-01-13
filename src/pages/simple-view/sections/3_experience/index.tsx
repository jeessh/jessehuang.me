import React from "react";
import styled from "styled-components";
import ExperienceCard from "./components/experience_card";
import { experiences } from "./experiences";

const Experience = () => {
  return (
    <section>
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
    </section>
  );
};

export default Experience;
