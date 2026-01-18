import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { GH, LI } from "@/assets";
import { useEffect, useState } from "react";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [clickedQuestion, setClickedQuestion] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 128);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <Container $isScrolled={isScrolled}>
      <NameWrapper to="/">
        <NameHeader>Jesse Huang</NameHeader>
      </NameWrapper>
      <LinksWrapper>
        <LinkItem
          to="https://www.github.com/jeessh"
          target="_blank"
          rel="noopener noreferrer"
        >
          <LinkIcon src={GH} alt="GitHub" />
        </LinkItem>
        <LinkItem
          to="https://www.linkedin.com/in/huang-jesse"
          target="_blank"
          rel="noopener noreferrer"
        >
          <LinkIcon src={LI} alt="LinkedIn" />
        </LinkItem>
        <button onClick={() => setClickedQuestion(!clickedQuestion)}>?</button>
      </LinksWrapper>
    </Container>
  );
};

const Container = styled.nav<{ $isScrolled: boolean }>`
  width: ${props => props.$isScrolled ? '65%' : '90%'};
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: sticky;
  margin: 0 auto;
  top: 16px;
  border-radius: 8px;
  background-color: #1a1a1a;
  padding: 12px;
  border: 1px solid ${props => props.$isScrolled ? 'rgba(255, 255, 255, 0.1)' : 'transparent'};
  transition: border-color 0.3s ease, width 0.3s ease;
`;

const NameWrapper = styled(NavLink)`
`;

const NameHeader = styled.h2`
  color: #a1a1a1;
  font-size: 16px;
  margin: 0;
`;

const LinksWrapper = styled.div`
  display: flex;
  gap: 1.5rem;
`;

const LinkItem = styled(NavLink)`
  font-size: 1rem;
  font-weight: 500;
  color: #cbd5e1;
`;

const LinkIcon = styled.img`
  width: 1.25rem;
`;

export default Navbar;
