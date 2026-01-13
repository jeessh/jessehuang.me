import styled from "styled-components";

type ExperienceCardProps = {
  logo: string;
  alt: string;
  company: string;
  role: string;
  start: string;
  end: string;
};

const ExperienceCard = ({
  logo,
  alt,
  company,
  role,
  start,
  end,
}: ExperienceCardProps) => {
  return (
    <Wrapper>
      <Image src={logo} alt={alt} />
      <h2>{company}</h2>
      <h3>{role}</h3>
      <p>
        {start} - {end}
      </p>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  align-items: center;
`;

const Image = styled.img``;

export default ExperienceCard;
