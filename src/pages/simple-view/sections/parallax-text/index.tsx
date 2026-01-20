import { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import { PARALLAX_CONFIG } from "./config";

const ParallaxText = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [staticTextProgress, setStaticTextProgress] = useState(0);
  const [textOffset, setTextOffset] = useState(0);
  const [spaceWidth, setSpaceWidth] = useState(0);
  const [professionalOffset, setProfessionalOffset] = useState(0);
  const [forFunOffset, setForFunOffset] = useState(0);
  const [containerTop, setContainerTop] = useState(50);
  const previousPhaseRef = useRef<number>(0);
  const phase3StartScrollRef = useRef<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const staticTextRef = useRef<HTMLHeadingElement>(null);
  const heroSectionRef = useRef<HTMLElement | null>(null);
  const experienceSectionRef = useRef<HTMLElement | null>(null);
  const projectsSectionRef = useRef<HTMLElement | null>(null);
  const aboutSectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    // Calculate the width of "just some" and a space character
    if (staticTextRef.current) {
      const rect = staticTextRef.current.getBoundingClientRect();
      setTextOffset(rect.width);
      
      // Measure the width of a space character
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      if (context) {
        const computedStyle = window.getComputedStyle(staticTextRef.current);
        context.font = `${computedStyle.fontWeight} ${computedStyle.fontSize} ${computedStyle.fontFamily}`;
        const spaceMetrics = context.measureText(' ');
        setSpaceWidth(spaceMetrics.width);
      }
    }
  }, []);

  useEffect(() => {
    // Delay to ensure DOM is ready
    const timeout = setTimeout(() => {
      // Find the hero, experience, projects and about sections
      heroSectionRef.current = document.querySelector(
        'section[data-section="hero"]'
      );
      experienceSectionRef.current = document.querySelector(
        'section[data-section="experience"]'
      );
      projectsSectionRef.current = document.querySelector(
        'section[data-section="projects"]'
      );
      // About section doesn't have data-section, so we'll use a different selector
      aboutSectionRef.current = document.querySelector(
        'section[data-section="about"]'
      ) || document.querySelectorAll('section')[3]; // Fallback to 4th section

      console.log('Hero section:', heroSectionRef.current);
      console.log('Experience section:', experienceSectionRef.current);
      console.log('Projects section:', projectsSectionRef.current);
      console.log('About section:', aboutSectionRef.current);
    }, 100);

    const handleScroll = () => {
      // Calculate static text fade based on hero section
      if (heroSectionRef.current) {
        const heroRect = heroSectionRef.current.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        
        // Start fading in earlier and faster
        const fadeStartPoint = viewportHeight * PARALLAX_CONFIG.HERO_FADE.START_POINT;
        if (heroRect.bottom > fadeStartPoint) {
          const fadeProgress = Math.max(0, 1 - (heroRect.bottom - fadeStartPoint) / (viewportHeight * PARALLAX_CONFIG.HERO_FADE.DURATION));
          setStaticTextProgress(fadeProgress);
        } else {
          setStaticTextProgress(1);
        }
      }
      
      if (!experienceSectionRef.current || !projectsSectionRef.current) {
        console.log('Sections not found yet');
        return;
      }

      const experienceRect = experienceSectionRef.current.getBoundingClientRect();
      const projectsRect = projectsSectionRef.current.getBoundingClientRect();
      const aboutRect = aboutSectionRef.current?.getBoundingClientRect();

      const viewportHeight = window.innerHeight;
      const viewportCenter = viewportHeight / 2;
      
      let progress = 0;
      let profYOffset = professionalOffset; // Start with current offset
      let funYOffset = forFunOffset; // Start with current offset
      let currentPhase = 0;
      
      // Phase 1 (0-1): "professionally" scrolls in
      const experienceScrollInStart = viewportHeight + PARALLAX_CONFIG.EXPERIENCE.SCROLL_IN_START_OFFSET;
      const experienceScrollInEnd = viewportCenter;
      
      if (experienceRect.top > experienceScrollInEnd && experienceRect.top < experienceScrollInStart) {
        currentPhase = 1;
        progress = 1 - ((experienceRect.top - experienceScrollInEnd) / (experienceScrollInStart - experienceScrollInEnd));
        profYOffset = (1 - progress) * PARALLAX_CONFIG.VERTICAL_OFFSET.OFF_SCREEN;
        funYOffset = PARALLAX_CONFIG.VERTICAL_OFFSET.OFF_SCREEN;
      }
      // Phase 2 (1): "professionally" stays at 0 while in experience section
      else if (experienceRect.bottom > viewportCenter) {
        currentPhase = 2;
        progress = 1;
        profYOffset = PARALLAX_CONFIG.VERTICAL_OFFSET.ON_SCREEN;
        funYOffset = PARALLAX_CONFIG.VERTICAL_OFFSET.OFF_SCREEN;
      }
      // Phase 3 (1-2): "professionally" transitions out, "for fun" transitions in
      else if (experienceRect.bottom <= viewportCenter && projectsRect.top > viewportCenter) {
        currentPhase = 3;
        const transitionStartPoint = viewportCenter;
        const transitionEndPoint = viewportCenter;
        const transitionDistance = projectsRect.top - experienceRect.bottom;
        const scrolledDistance = transitionStartPoint - experienceRect.bottom;
        const transitionProgress = Math.min(1, scrolledDistance / Math.max(transitionDistance, 1));
        
        progress = 1 + transitionProgress;
        profYOffset = transitionProgress * PARALLAX_CONFIG.VERTICAL_OFFSET.OFF_SCREEN_TOP;
        funYOffset = PARALLAX_CONFIG.VERTICAL_OFFSET.OFF_SCREEN - (transitionProgress * PARALLAX_CONFIG.VERTICAL_OFFSET.OFF_SCREEN);
      }
      // Phase 4 (2): "for fun" stays at 0 while in projects section
      else if (aboutRect && projectsRect.bottom > viewportCenter && aboutRect.top > viewportCenter) {
        currentPhase = 4;
        progress = 2;
        profYOffset = -50;
        funYOffset = 0;
      }
      else if (!aboutRect && projectsRect.bottom > viewportCenter) {
        // Fallback if about section not found - stay in phase 4
        currentPhase = 4;
        progress = 2;
        profYOffset = -50;
        funYOffset = 0;
      }
      // Phase 5 (2-3): "for fun" transitions out, "and life" transitions in
      else if (aboutRect && projectsRect.bottom <= viewportCenter && aboutRect.top > viewportCenter) {
        currentPhase = 5;
        const transitionDistance = aboutRect.top - projectsRect.bottom;
        const scrolledDistance = viewportCenter - projectsRect.bottom;
        const transitionProgress = Math.min(1, scrolledDistance / Math.max(transitionDistance, 1));
        
        progress = 2 + transitionProgress;
        profYOffset = PARALLAX_CONFIG.VERTICAL_OFFSET.OFF_SCREEN_TOP;
        funYOffset = transitionProgress * PARALLAX_CONFIG.VERTICAL_OFFSET.OFF_SCREEN_TOP;
      }
      // Phase 6 (3+): "and life" is fully visible and stays until about section text fades
      else if (aboutRect && aboutRect.top <= viewportCenter) {
        currentPhase = 6;
        // Calculate scroll progress within about section
        const aboutScrollStart = viewportCenter - aboutRect.top;
        const aboutHeight = aboutRect.height;
        const aboutScrollProgress = aboutScrollStart / aboutHeight;
        
        // Progress 3.0 when about reaches center, up to 4.0 as you scroll through
        progress = 3 + Math.min(1, aboutScrollProgress);
        profYOffset = PARALLAX_CONFIG.VERTICAL_OFFSET.OFF_SCREEN_TOP;
        funYOffset = PARALLAX_CONFIG.VERTICAL_OFFSET.OFF_SCREEN_TOP;
        
        // Smoothly scroll container based on config
        const viewportHeight = window.innerHeight;
        const scrollAmount = aboutScrollStart;
        const targetScrollDistance = viewportHeight * PARALLAX_CONFIG.ABOUT.CONTAINER.SCROLL_DISTANCE;
        
        if (scrollAmount < targetScrollDistance) {
          const scrollRatio = scrollAmount / targetScrollDistance;
          const positionDelta = PARALLAX_CONFIG.ABOUT.CONTAINER.START_POSITION - PARALLAX_CONFIG.ABOUT.CONTAINER.END_POSITION;
          setContainerTop(PARALLAX_CONFIG.ABOUT.CONTAINER.START_POSITION - (scrollRatio * positionDelta));
        } else {
          setContainerTop(PARALLAX_CONFIG.ABOUT.CONTAINER.END_POSITION);
        }
      }
      else {
        // Keep at center for all other sections
        setContainerTop(PARALLAX_CONFIG.ABOUT.CONTAINER.START_POSITION);
      }

      previousPhaseRef.current = currentPhase;
      console.log('Scroll progress:', progress.toFixed(2), 'Prof Offset:', profYOffset.toFixed(1), 'ForFun Offset:', funYOffset.toFixed(1), 'Phase:', currentPhase);
      setScrollProgress(progress);
      setProfessionalOffset(profYOffset);
      setForFunOffset(funYOffset);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial calculation

    return () => {
      clearTimeout(timeout);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Calculate positions based on scroll progress
  const getProfessionallyTransform = () => {
    return `translateY(${professionalOffset}vh)`;
  };

  const getForFunTransform = () => {
    return `translateY(${forFunOffset}vh)`;
  };

  const getAndLifeTransform = () => {
    if (scrollProgress < 2) {
      return `translateY(${PARALLAX_CONFIG.VERTICAL_OFFSET.OFF_SCREEN}vh)`;
    }
    const adjustedProgress = scrollProgress - 2;
    const offset = Math.max(0, (1 - adjustedProgress) * PARALLAX_CONFIG.VERTICAL_OFFSET.OFF_SCREEN);
    return `translateY(${offset}vh)`;
  };

  const getProfessionallyOpacity = () => {
    // Base opacity from hero fade
    const baseFadeOpacity = staticTextProgress * PARALLAX_CONFIG.OPACITY.BASE;
    
    // Additional fade based on scroll progress
    if (scrollProgress < PARALLAX_CONFIG.EXPERIENCE.FADE_IN_PROGRESS) {
      return Math.min(baseFadeOpacity, (scrollProgress / PARALLAX_CONFIG.EXPERIENCE.FADE_IN_PROGRESS) * PARALLAX_CONFIG.OPACITY.BASE);
    }
    // Keep fully visible until transition starts
    if (scrollProgress > PARALLAX_CONFIG.EXPERIENCE.FADE_OUT_START) {
      return Math.max(0, (1 - (scrollProgress - PARALLAX_CONFIG.EXPERIENCE.FADE_OUT_START) / PARALLAX_CONFIG.EXPERIENCE.FADE_OUT_DURATION) * PARALLAX_CONFIG.OPACITY.BASE);
    }
    return baseFadeOpacity;
  };

  const getForFunOpacity = () => {
    // Start fading in once "professionally" starts fading out
    if (scrollProgress < PARALLAX_CONFIG.PROJECTS.FADE_IN_START) return 0;
    // Keep visible until starting to fade out for "and life"
    if (scrollProgress > PARALLAX_CONFIG.PROJECTS.FADE_OUT_START) {
      return Math.max(0, (1 - (scrollProgress - PARALLAX_CONFIG.PROJECTS.FADE_OUT_START) / PARALLAX_CONFIG.PROJECTS.FADE_OUT_DURATION) * PARALLAX_CONFIG.OPACITY.BASE);
    }
    const fadeProgress = Math.min(1, (scrollProgress - PARALLAX_CONFIG.PROJECTS.FADE_IN_START) / PARALLAX_CONFIG.PROJECTS.FADE_IN_DURATION);
    return fadeProgress * PARALLAX_CONFIG.OPACITY.BASE;
  };

  const getAndLifeOpacity = () => {
    // Start fading in once "for fun" starts fading out
    if (scrollProgress < PARALLAX_CONFIG.ABOUT.FADE_IN_START) return 0;
    // Fade out in sync with about section text
    if (scrollProgress >= PARALLAX_CONFIG.ABOUT.FADE_OUT_START && scrollProgress <= PARALLAX_CONFIG.ABOUT.FADE_OUT_END) {
      const fadeOutDuration = PARALLAX_CONFIG.ABOUT.FADE_OUT_END - PARALLAX_CONFIG.ABOUT.FADE_OUT_START;
      return (1 - ((scrollProgress - PARALLAX_CONFIG.ABOUT.FADE_OUT_START) / fadeOutDuration)) * PARALLAX_CONFIG.OPACITY.BASE;
    }
    if (scrollProgress > PARALLAX_CONFIG.ABOUT.FADE_OUT_END) return 0;
    const fadeProgress = Math.min(1, (scrollProgress - PARALLAX_CONFIG.ABOUT.FADE_IN_START) / PARALLAX_CONFIG.ABOUT.FADE_IN_DURATION);
    return fadeProgress * PARALLAX_CONFIG.OPACITY.BASE;
  };

  return (
    <Container ref={containerRef} style={{ 
      top: `${containerTop}%`,
      transform: 'translateY(-50%)',
      opacity: scrollProgress >= PARALLAX_CONFIG.ABOUT.FADE_OUT_START && scrollProgress <= PARALLAX_CONFIG.ABOUT.FADE_OUT_END 
        ? 1 - ((scrollProgress - PARALLAX_CONFIG.ABOUT.FADE_OUT_START) / (PARALLAX_CONFIG.ABOUT.FADE_OUT_END - PARALLAX_CONFIG.ABOUT.FADE_OUT_START))
        : scrollProgress > PARALLAX_CONFIG.ABOUT.FADE_OUT_END ? 0 : 1,
      transition: 'opacity 0.1s ease-out' 
    }}>
      <StaticText 
        ref={staticTextRef}
        style={{
          opacity: staticTextProgress * PARALLAX_CONFIG.OPACITY.BASE,
          transform: `translateX(${(1 - staticTextProgress) * -50}px)`,
        }}
      >
        some
      </StaticText>
      <MovingText
        style={{
          transform: getProfessionallyTransform(),
          opacity: getProfessionallyOpacity(),
          left: `calc(10% + ${textOffset}px + ${spaceWidth}px)`,
        }}
      >
        experiences
      </MovingText>
      <MovingText
        style={{
          transform: getForFunTransform(),
          opacity: getForFunOpacity(),
          left: `calc(10% + ${textOffset}px + ${spaceWidth}px)`,
        }}
      >
        projects
      </MovingText>
      <MovingText
        style={{
          transform: getAndLifeTransform(),
          opacity: getAndLifeOpacity(),
          left: `calc(10% + ${textOffset}px)`,
        }}
      >
        things about me
      </MovingText>
      {/* Debug overlay */}
      <div style={{ 
        position: 'fixed', 
        top: '10px', 
        left: '10px', 
        background: 'rgba(0,0,0,0.8)', 
        color: 'white', 
        padding: '10px',
        fontSize: '12px',
        zIndex: 9999,
        pointerEvents: 'all'
      }}>
        Progress: {scrollProgress.toFixed(2)}
        <br/>
        Prof Transform: {getProfessionallyTransform()}
        <br/>
        Prof Opacity: {getProfessionallyOpacity().toFixed(3)}
        <br/>
        ForFun Transform: {getForFunTransform()}
        <br/>
        ForFun Opacity: {getForFunOpacity().toFixed(3)}
      </div>
    </Container>
  );
};

const Container = styled.div`
  position: fixed;
  left: 0;
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding-left: 10%;
  pointer-events: none;
  z-index: -1;
  overflow: hidden;
`;

const StaticText = styled.h2`
  font-size: clamp(2.5rem, 8vw, 6rem);
  font-weight: 800;
  color: white;
  text-transform: lowercase;
  white-space: nowrap;
  user-select: none;
  position: absolute;
  left: 10%;
  margin: 0;
  transition: opacity 0.3s ease-out, transform 0.3s ease-out;
`;

const MovingText = styled.h2`
  font-size: clamp(2.5rem, 8vw, 6rem);
  font-weight: 700;
  color: white;
  text-transform: lowercase;
  white-space: nowrap;
  user-select: none;
  position: absolute;
  left: 10%;
  margin: 0;
  transition: none;
`;

export default ParallaxText;
