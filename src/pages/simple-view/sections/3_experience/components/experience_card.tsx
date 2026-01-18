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
      <SideWrapper>
        <Image src={logo} alt={alt} />
        <InfoWrapper>
          <Role>{role}</Role>
          <Company>{company}</Company>
        </InfoWrapper>
      </SideWrapper>
      <HorizontalLine />
      <SideWrapper>
        <Date>
          {start} - {end}
        </Date>
      </SideWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 48px;
  margin: 24px 0;
`;

const SideWrapper = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
`;

const Image = styled.img`
  width: 48px;
  height: 48px;
  border-radius: 4px;
`;

const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 16px;
`;

const Role = styled.h3`
  margin-bottom: 4px;
`;

const Company = styled.h4`
  margin: 0;
`;

const Date = styled.h4`
`;

const HorizontalLine = styled.div`
  background-color: #222222;
  height: 2px;
  flex: 1;
  margin: 0 16px;
`;

const ReturnLine = styled.div``;

export default ExperienceCard;
