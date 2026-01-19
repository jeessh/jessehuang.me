import styled from "styled-components";

type ExperienceCardProps = {
  logo: string;
  alt: string;
  company: string;
  role: string;
  start: string;
  end: string;
  gradient: string;
  index: number;
};

const ExperienceCard = ({
  logo,
  alt,
  company,
  role,
  start,
  end,
  gradient,
  index,
}: ExperienceCardProps) => {
  const rotations = [2, -3, 1, -2];
  const rotation = rotations[index % rotations.length];

  return (
    <Polaroid $rotation={rotation}>
      <Clip />
      <PhotoArea $gradient={gradient}>
        <CompanyLogo src={logo} alt={alt} />
      </PhotoArea>
      <Caption>
        <Company>{company}</Company>
        <Role>{role}</Role>
        <Date>{start} - {end}</Date>
      </Caption>
    </Polaroid>
  );
};

const Polaroid = styled.div<{ $rotation: number }>`
  background: #fff;
  padding: 12px 12px 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3),
              0 2px 4px rgba(0, 0, 0, 0.2);
  transform: rotate(${props => props.$rotation}deg);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;
  position: relative;
  width: 180px;
  
  &:hover {
    transform: rotate(0deg) translateY(-8px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.4),
                0 4px 8px rgba(0, 0, 0, 0.3);
    z-index: 10;
  }
`;

const Clip = styled.div`
  position: absolute;
  top: -8px;
  left: 50%;
  transform: translateX(-50%);
  width: 40px;
  height: 16px;
  background: linear-gradient(180deg, #8a8a8a 0%, #6a6a6a 100%);
  border-radius: 2px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3),
              inset 0 1px 1px rgba(255, 255, 255, 0.3);
  
  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 8px;
    width: 3px;
    height: 8px;
    background: #555;
    border-radius: 1px;
    transform: translateY(-50%);
  }
  
  &::after {
    content: '';
    position: absolute;
    top: 50%;
    right: 8px;
    width: 3px;
    height: 8px;
    background: #555;
    border-radius: 1px;
    transform: translateY(-50%);
  }
`;

const PhotoArea = styled.div<{ $gradient: string }>`
  background: ${props => props.$gradient};
  padding: 28px;
  margin-bottom: 12px;
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CompanyLogo = styled.img`
  width: 48px;
  height: 48px;
  object-fit: contain;
  position: relative;
  border-radius: 6px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const Caption = styled.div`
  text-align: center;
`;

const Company = styled.h4`
  margin: 0 0 4px 0;
  font-size: 0.9rem;
  color: #1a1a1a;
  font-weight: 600;
`;

const Role = styled.p`
  margin: 0 0 4px 0;
  font-size: 0.8rem;
  color: #4a4a4a;
  font-weight: 500;
`;

const Date = styled.p`
  margin: 0;
  font-size: 0.7rem;
  color: #6a6a6a;
  font-style: italic;
`;

export default ExperienceCard;
