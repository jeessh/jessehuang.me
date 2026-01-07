import { NavLink } from "react-router-dom";
import styled from "styled-components";
import GH from "../assets/gh.png";
import LI from "../assets/linkedin.png";

const Navbar = () => {
  return (
    <Container>
      <NameWrapper to="/">
        <NameHeader>Jesse Huang</NameHeader>
      </NameWrapper>
      <LinksWrapper>
      <LinkItem to="github.com/jessejhuang" target="_blank" rel="noopener noreferrer">
          <LinkIcon src={GH} alt="GitHub" />
        </LinkItem>
        <LinkItem to="linkedin.com/in/jessejhuang" target="_blank" rel="noopener noreferrer">
          <LinkIcon src={LI} alt="LinkedIn" />
        </LinkItem>
        <LinkItem to="/story">Story View</LinkItem>
      </LinksWrapper>
    </Container>
  );
};

const Container = styled.nav`
  min-width: 100dvw;
  justify-content: space-between;
  display: flex;
  position: sticky;
`;

const NameWrapper = styled(NavLink)`
  font-size: 1.25rem;
  font-weight: 600;
`;

const NameHeader = styled.span`
  color: #f8fafc;
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
