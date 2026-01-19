import styled from "styled-components";

type ClotheslineProps = {
  position: "top" | "bottom";
  reverse?: boolean;
};

const Clothesline = ({ position, reverse = false }: ClotheslineProps) => {
  const path = reverse
    ? "M0 50 Q1500 150 3000 200" // Gentler slope for bottom row
    : "M0 50 Q1500 250 3000 350"; // Steeper slope for top row

  return (
    <Container $position={position}>
      <svg viewBox="0 0 3000 500" preserveAspectRatio="none">
        <defs>
          <linearGradient
            id={`lineGradient-${position}`}
            x1="0%"
            y1="0%"
            x2="100%"
            y2="0%"
          >
            <stop offset="0%" stopColor="#3a3a3a" stopOpacity="0" />
            <stop offset="20%" stopColor="#3a3a3a" stopOpacity="1" />
            <stop offset="80%" stopColor="#3a3a3a" stopOpacity="1" />
            <stop offset="100%" stopColor="#3a3a3a" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path
          d={path}
          stroke={`url(#lineGradient-${position})`}
          strokeWidth="8"
          fill="none"
          filter="drop-shadow(0 1px 2px rgba(0, 0, 0, 0.3))"
        />
      </svg>
    </Container>
  );
};

const Container = styled.div<{ $position: "top" | "bottom" }>`
  position: absolute;
  left: 0;
  right: 0;
  height: 200px;
  pointer-events: none;
  width: 99vw;
  margin-left: calc(-50vw + 50%);

  svg {
    width: 100%;
    height: 100%;
  }

  display: ${(props) => (props.$position === "top" ? "block" : "none")};
  top: 4rem;

  @media (max-width: 1024px) {
    display: block;
    top: ${(props) =>
      props.$position === "top" ? "4rem" : "calc(4rem + 350px + 3rem + 2px)"};
  }
`;

export default Clothesline;
