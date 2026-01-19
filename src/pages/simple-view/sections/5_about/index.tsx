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
  // Start transitioning at 20% (frame 15) and complete by 80% (frame 58)
  const transitionStart = frameImages.length * 0.2
  const transitionEnd = frameImages.length * 0.8
  
  let zoomProgress = 0
  if (currentFrame >= transitionStart && currentFrame <= transitionEnd) {
    zoomProgress = (currentFrame - transitionStart) / (transitionEnd - transitionStart)
  } else if (currentFrame > transitionEnd) {
    zoomProgress = 1
  }

  return (
    <Container ref={containerRef}>
      <StickyCanvas>
        <FrameImage 
          src={frameImages[currentFrame]} 
          alt={`Frame ${currentFrame}`}
          $zoomProgress={zoomProgress}
        />
      </StickyCanvas>
    </Container>
  )
}

const Container = styled.div`
  position: relative;
  height: 400vh;
  width: 100vw;
  left: 50%;
  right: 50%;
  margin-left: -50vw;
  margin-right: -50vw;
`

const StickyCanvas = styled.div`
  position: sticky;
  top: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`

const FrameImage = styled.img<{ $zoomProgress: number }>`
  width: 100%;
  height: 100%;
  object-fit: contain;
  object-position: center;
  user-select: none;
  transform: scale(${props => 1 + (props.$zoomProgress * 0.5)});
  transition: transform 0.1s ease-out;
`

export default About