import React, { useState } from "react";
import styled from "styled-components";

type ContactTypes = {
  scrolled: boolean;
};

const Contact = (props: ContactTypes) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const socials = [
    { label: "Email", link: "mailto:your.email@example.com" },
    { label: "LinkedIn", link: "https://www.linkedin.com/in/huang-jesse" },
    { label: "GitHub", link: "https://github.com/jeessh" },
    { label: "Twitter", link: "https://twitter.com/yourhandle" },
  ];

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Container>
      <ContentWrapper>
        <Heading
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onClick={handleClick}
        >
          let's get in touch {isOpen ? "📬" : isHovered ? "📭" : "📪"}
        </Heading>
        {isOpen && (
          <SocialsContainer>
            {socials.map((social, index) => (
              <SocialBubble
                key={index}
                href={social.link}
                target="_blank"
                rel="noopener noreferrer"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                {social.label}
              </SocialBubble>
            ))}
          </SocialsContainer>
        )}
      </ContentWrapper>
    </Container>
  );
};

const Container = styled.footer`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  margin: 4rem 2rem 10rem 2rem;
  min-height: 200px;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
`;

const Heading = styled.h2`
  margin: 0;
  cursor: pointer;
  transition: transform 0.2s ease;
  user-select: none;
  
  &:hover {
    transform: scale(1.05);
  }
`;

const SocialsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  justify-content: center;
  max-width: 500px;
`;

const SocialBubble = styled.a`
  padding: 0.75rem 1.5rem;
  background-color: #2a2a2a;
  border: 1px solid #3a3a3a;
  border-radius: 8px;
  color: #e5e7eb;
  text-decoration: none;
  font-size: 0.9375rem;
  font-weight: 500;
  animation: bubbleIn 0.3s ease-out forwards;
  transition: background-color 0.2s ease, border-color 0.2s ease;
  
  @media (prefers-reduced-motion: no-preference) {
    &:hover {
      background-color: #3a3a3a;
      border-color: #4a4a4a;
      animation: tiltIn 0.3s ease-out forwards;
    }
    
    &:not(:hover) {
      animation: tiltOut 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
    }
  }
  
  @keyframes bubbleIn {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  @keyframes tiltIn {
    0% {
      transform: rotate(0deg);
    }
    50% {
      transform: rotate(-6deg);
    }
    70% {
      transform: rotate(-3deg);
    }
    100% {
      transform: rotate(-4deg);
    }
  }
  
  @keyframes tiltOut {
    from {
      transform: rotate(-4deg);
    }
    to {
      transform: rotate(0deg);
    }
  }
`;

export default Contact;

// use a mailbox, and if they click, drop some options

// Leave me a message!
// Let's get in touch 