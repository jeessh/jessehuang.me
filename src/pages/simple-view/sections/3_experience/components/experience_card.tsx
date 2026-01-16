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
      <RoleHeader>{role}</RoleHeader>

      <CompanyHeader>{company}</CompanyHeader>
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

const Image = styled.img`
  width: 64px;
  height: 64px;
`;

const RoleHeader = styled.h3`
  margin: 0;
`;

const CompanyHeader = styled.h3`
  margin: 0;
`;

const DateHeader = styled.h3``;

const DateLine = styled.div``;

const ReturnLine = styled.div``;

export default ExperienceCard;
