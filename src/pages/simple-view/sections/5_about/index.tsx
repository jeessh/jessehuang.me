import { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'
import * as frames from '@/assets'

const About = () => {
  const [currentFrame, setCurrentFrame] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  
  const frameImages = [
    frames.FRAME_0000, frames.FRAME_0001, frames.FRAME_0002, frames.FRAME_0003,
    frames.FRAME_0004, frames.FRAME_0005, frames.FRAME_0006, frames.FRAME_0007,
    frames.FRAME_0008, frames.FRAME_0009, frames.FRAME_0010, frames.FRAME_0011,
    frames.FRAME_0012, frames.FRAME_0013, frames.FRAME_0014, frames.FRAME_0015,
    frames.FRAME_0016, frames.FRAME_0017, frames.FRAME_0018, frames.FRAME_0019,
    frames.FRAME_0020, frames.FRAME_0021, frames.FRAME_0022, frames.FRAME_0023,
    frames.FRAME_0024, frames.FRAME_0025, frames.FRAME_0026, frames.FRAME_0027,
    frames.FRAME_0028, frames.FRAME_0029, frames.FRAME_0030, frames.FRAME_0031,
    frames.FRAME_0032, frames.FRAME_0033, frames.FRAME_0034, frames.FRAME_0035,
    frames.FRAME_0036, frames.FRAME_0037, frames.FRAME_0038, frames.FRAME_0039,
    frames.FRAME_0040, frames.FRAME_0041, frames.FRAME_0042, frames.FRAME_0043,
    frames.FRAME_0044, frames.FRAME_0045, frames.FRAME_0046, frames.FRAME_0047,
    frames.FRAME_0048, frames.FRAME_0049, frames.FRAME_0050, frames.FRAME_0051,
    frames.FRAME_0052, frames.FRAME_0053, frames.FRAME_0054, frames.FRAME_0055,
    frames.FRAME_0056, frames.FRAME_0057, frames.FRAME_0058, frames.FRAME_0059,
    frames.FRAME_0060, frames.FRAME_0061, frames.FRAME_0062, frames.FRAME_0063,
    frames.FRAME_0064, frames.FRAME_0065, frames.FRAME_0066, frames.FRAME_0067,
    frames.FRAME_0068, frames.FRAME_0069, frames.FRAME_0070, frames.FRAME_0071,
    frames.FRAME_0072
  ]

  const opaqueFrames = [
    frames.OPAQUE_0000, frames.OPAQUE_0001, frames.OPAQUE_0002, frames.OPAQUE_0003,
    frames.OPAQUE_0004, frames.OPAQUE_0005, frames.OPAQUE_0006, frames.OPAQUE_0007,
    frames.OPAQUE_0008, frames.OPAQUE_0009, frames.OPAQUE_0010, frames.OPAQUE_0011,
    frames.OPAQUE_0012, frames.OPAQUE_0013, frames.OPAQUE_0014, frames.OPAQUE_0015,
    frames.OPAQUE_0016, frames.OPAQUE_0017, frames.OPAQUE_0018, frames.OPAQUE_0019,
    frames.OPAQUE_0020, frames.OPAQUE_0021, frames.OPAQUE_0022, frames.OPAQUE_0023,
    frames.OPAQUE_0024, frames.OPAQUE_0025, frames.OPAQUE_0026, frames.OPAQUE_0027,
    frames.OPAQUE_0028, frames.OPAQUE_0029, frames.OPAQUE_0030, frames.OPAQUE_0031,
    frames.OPAQUE_0032, frames.OPAQUE_0033, frames.OPAQUE_0034, frames.OPAQUE_0035,
    frames.OPAQUE_0036, frames.OPAQUE_0037, frames.OPAQUE_0038, frames.OPAQUE_0039,
    frames.OPAQUE_0040, frames.OPAQUE_0041, frames.OPAQUE_0042, frames.OPAQUE_0043,
    frames.OPAQUE_0044, frames.OPAQUE_0045, frames.OPAQUE_0046, frames.OPAQUE_0047,
    frames.OPAQUE_0048, frames.OPAQUE_0049, frames.OPAQUE_0050, frames.OPAQUE_0051,
    frames.OPAQUE_0052, frames.OPAQUE_0053, frames.OPAQUE_0054, frames.OPAQUE_0055,
    frames.OPAQUE_0056, frames.OPAQUE_0057, frames.OPAQUE_0058, frames.OPAQUE_0059,
    frames.OPAQUE_0060, frames.OPAQUE_0061, frames.OPAQUE_0062, frames.OPAQUE_0063,
    frames.OPAQUE_0064, frames.OPAQUE_0065, frames.OPAQUE_0066, frames.OPAQUE_0067,
    frames.OPAQUE_0068, frames.OPAQUE_0069, frames.OPAQUE_0070, frames.OPAQUE_0071,
    frames.OPAQUE_0072
  ]

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return
      
      const container = containerRef.current
      const rect = container.getBoundingClientRect()
      const scrollHeight = container.offsetHeight
      const viewportHeight = window.innerHeight
      
      const scrollStart = -rect.top
      const scrollEnd = scrollHeight - viewportHeight
      const scrollProgress = Math.max(0, Math.min(1, scrollStart / scrollEnd))
      
      const frameIndex = Math.floor(scrollProgress * (frameImages.length - 1))
      setCurrentFrame(frameIndex)
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll()
    
    return () => window.removeEventListener('scroll', handleScroll)
  }, [frameImages.length])

  // Calculate smooth zoom transition
  const transitionStart = frameImages.length * 0.2
  const transitionEnd = frameImages.length * 0.8
  
  let zoomProgress = 0
  if (currentFrame >= transitionStart && currentFrame <= transitionEnd) {
    zoomProgress = (currentFrame - transitionStart) / (transitionEnd - transitionStart)
  } else if (currentFrame > transitionEnd) {
    zoomProgress = 1
  }

  // Calculate text fade out (starts at 50%, completes at 60%)
  const fadeStart = frameImages.length * 0.5
  const fadeEnd = frameImages.length * 0.6
  
  let textOpacity = 1
  if (currentFrame >= fadeStart && currentFrame <= fadeEnd) {
    textOpacity = 1 - ((currentFrame - fadeStart) / (fadeEnd - fadeStart))
  } else if (currentFrame > fadeEnd) {
    textOpacity = 0
  }

  // Calculate opaque layer opacity (fade during frames 40-50)
  const opaqueTransitionStart = 40
  const opaqueTransitionEnd = 50
  
  let opaqueOpacity = 1
  if (currentFrame >= opaqueTransitionStart && currentFrame <= opaqueTransitionEnd) {
    opaqueOpacity = 1 - ((currentFrame - opaqueTransitionStart) / (opaqueTransitionEnd - opaqueTransitionStart))
  } else if (currentFrame > opaqueTransitionEnd) {
    opaqueOpacity = 0
  }

  return (
    <Container ref={containerRef}>
      <StickyCanvas>
        <TextPanel $opacity={textOpacity}>
          <AboutText>
            <p>I'm just a guy that loves exploring.</p>
            <p>Whether it's diving into new technologies, building creative projects, or capturing moments through a lens, I'm always curious about what's next.</p>
            <p>My journey has taken me through full-stack development, IoT engineering, and everything in between.</p>
            <p>I believe in learning by doing, creating with purpose, and sharing the process along the way.</p>
            <p>Down to explore with me?</p>
            <p>(Or are you just as curious as me, about me?)</p>
          </AboutText>
        </TextPanel>
        <FrameImage 
          src={frameImages[currentFrame]} 
          alt={`Transparent frame ${currentFrame}`}
          $zoomProgress={zoomProgress}
        />
        <FrameImage 
          src={opaqueFrames[currentFrame]} 
          alt={`Opaque frame ${currentFrame}`}
          $zoomProgress={zoomProgress}
          $opacity={opaqueOpacity}
          style={{ zIndex: 101 }}
        />
      </StickyCanvas>
    </Container>
  )
}

const Container = styled.div`
  position: relative;
  width: 100vw;
  left: 50%;
  right: 50%;
  margin-left: -50vw;
  margin-right: -50vw;

  @media (min-width: 769px) {
    height: 400vh;
  }

  @media (max-width: 768px) {
    height: auto;
    min-height: 100vh;
  }
`

const StickyCanvas = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  overflow: hidden;

  @media (min-width: 769px) {
    position: sticky;
    top: 0;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    position: relative;
  }
`

const TextPanel = styled.div<{ $opacity: number }>`
  position: absolute;
  left: 0;
  width: 50%;
  padding: 4rem;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  z-index: 50;
  transition: opacity 0.1s ease-out;

  @media (min-width: 769px) {
    opacity: ${props => props.$opacity};
  }

  @media (max-width: 768px) {
    position: relative;
    width: 100%;
    padding: 2rem;
    background: rgba(255, 255, 255, 0.95);
    opacity: 1;
  }
`

const AboutText = styled.div`
  max-width: 500px;
  
  p {
    margin: 0 0 1.5rem 0;
    font-size: 1.1rem;
    color: #2a2a2a;
    line-height: 1.7;

    &:last-child {
      margin-bottom: 0;
      font-style: italic;
      color: #6a6a6a;
    }
  }
`

const FrameImage = styled.img<{ $zoomProgress: number; $opacity?: number }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: contain;
  object-position: center;
  user-select: none;
  transform: scale(${props => 1 + (props.$zoomProgress * 0.5)});
  transition: transform 0.1s ease-out, opacity 0.1s ease-out;
  opacity: ${props => props.$opacity !== undefined ? props.$opacity : 1};
  z-index: 100;

  @media (max-width: 768px) {
    display: none;
  }
`

export default About