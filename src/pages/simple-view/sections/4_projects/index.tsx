import { useState, useEffect } from 'react'
import styled from 'styled-components'
import { projects } from './projects'
import * as assets from '@/assets'

const Projects = () => {
  const [selectedProjectId, setSelectedProjectId] = useState(1)
  const [selectedSlideId, setSelectedSlideId] = useState(1)

  const currentProject = projects.find(p => p.id === selectedProjectId)
  const currentSlide = currentProject?.slides.find(s => s.id === selectedSlideId)
  const totalSlides = currentProject?.slides.length || 0

  // Auto-scroll every 10 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setSelectedSlideId(prev => {
        const nextSlide = prev >= totalSlides ? 1 : prev + 1
        return nextSlide
      })
    }, 10000)

    return () => clearInterval(interval)
  }, [totalSlides])

  // Reset to first slide when changing projects
  const handleProjectChange = (projectId: number) => {
    setSelectedProjectId(projectId)
    setSelectedSlideId(1)
  }

  return (
    <Container data-section="projects">
      <ContactSheet>
        {projects.map((project, index) => (
          <ContactFrame
            key={project.id}
            $active={project.id === selectedProjectId}
            onClick={() => handleProjectChange(project.id)}
          >
            {project.coverImage && (
              <CoverImage src={project.coverImage} alt={project.name} />
            )}
            <FrameContent>
              <ProjectNumber>{String(index + 1).padStart(2, '0')}</ProjectNumber>
              <ProjectName>{project.name}</ProjectName>
              <ProjectCategory>{project.category}</ProjectCategory>
              <ProjectDateRange>{project.dateRange || '2024-2025'}</ProjectDateRange>
            </FrameContent>
          </ContactFrame>
        ))}
      </ContactSheet>

      <MainDisplay>
        <NavButton 
          $position="left"
          onClick={() => setSelectedSlideId(prev => prev > 1 ? prev - 1 : totalSlides)}
          disabled={totalSlides === 0}
        >
          ←
        </NavButton>

        <SlideContent>
          <SlideTitle>{currentSlide?.title}</SlideTitle>
          <SlideDescription>{currentSlide?.description}</SlideDescription>
          <SlideBody>{currentSlide?.content}</SlideBody>
        </SlideContent>

        <NavButton 
          $position="right"
          onClick={() => setSelectedSlideId(prev => prev >= totalSlides ? 1 : prev + 1)}
          disabled={totalSlides === 0}
        >
          →
        </NavButton>

        <ProgressIndicator>
          {currentProject?.slides.map(slide => (
            <Dot
              key={slide.id}
              $active={slide.id === selectedSlideId}
              onClick={() => setSelectedSlideId(slide.id)}
            />
          ))}
        </ProgressIndicator>

        <FilmStrip>
          {currentProject?.slides.slice(0, 4).map(slide => (
            <FilmFrame
              key={slide.id}
              $active={slide.id === selectedSlideId}
              onClick={() => setSelectedSlideId(slide.id)}
            >
              <FrameNumber>{String(slide.id).padStart(2, '0')}</FrameNumber>
            </FilmFrame>
          ))}
        </FilmStrip>
      </MainDisplay>
    </Container>
  )
}

const Container = styled.section`
  padding: 8rem 0 8rem 0;
  display: flex;
  flex-direction: column;
  gap: 4rem;
  width: 100%;
`

const ContactSheet = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  width: 100%;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
`

const ContactFrame = styled.div<{ $active: boolean }>`
  background: transparent;
  border: 1px solid #2a2a2a;
  padding: 1.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  filter: grayscale(100%);

  &:hover {
    filter: grayscale(50%);
  }

  ${props => props.$active && `
    filter: grayscale(0%);
  `}
`

const CoverImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  margin-bottom: 1rem;
`

const FrameContent = styled.div`
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`

const ProjectNumber = styled.div`
  font-size: 0.75rem;
  font-weight: 700;
  color: #1a1a1a;
  letter-spacing: 0.05em;
  font-family: 'Courier New', monospace;
`

const ProjectName = styled.h3`
  margin: 0;
  font-size: 1rem;
  color: #1a1a1a;
  font-weight: 600;
  line-height: 1.3;
`

const ProjectCategory = styled.p`
  margin: 0;
  font-size: 0.8rem;
  color: #4a4a4a;
  font-weight: 400;
`

const ProjectDateRange = styled.div`
  font-size: 0.75rem;
  color: #6a6a6a;
  font-family: 'Courier New', monospace;
  margin-top: 0.25rem;
`

const MainDisplay = styled.div`
  background: transparent;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  padding: 3rem;
  max-width: 1000px;
  margin: 0 auto;
  width: 100%;
  min-height: 400px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;

  @media (max-width: 768px) {
    padding: 2rem;
  }
`

const NavButton = styled.button<{ $position: 'left' | 'right' }>`
  position: absolute;
  top: 50%;
  ${props => props.$position}: 1rem;
  transform: translateY(-50%);
  background: transparent;
  border: 1px solid #d0d0d0;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  color: #3a3a3a;
  transition: all 0.2s ease;
  z-index: 10;

  &:hover:not(:disabled) {
    border-color: #3a3a3a;
    background: #f5f5f5;
  }

  &:disabled {
    opacity: 0.3;
    cursor: not-allowed;
  }

  @media (max-width: 768px) {
    ${props => props.$position}: 0.5rem;
    width: 36px;
    height: 36px;
    font-size: 1rem;
  }
`

const SlideContent = styled.div`
  color: #1a1a1a;
  flex: 1;
`

const SlideTitle = styled.h3`
  margin: 0 0 1rem 0;
  font-size: 1.75rem;
  color: #1a1a1a;
  font-weight: 600;
`

const SlideDescription = styled.p`
  margin: 0 0 1.5rem 0;
  font-size: 1rem;
  color: #4a4a4a;
  line-height: 1.6;
`

const SlideBody = styled.div`
  font-size: 0.95rem;
  color: #6a6a6a;
  line-height: 1.8;
`

const ProgressIndicator = styled.div`
  display: flex;
  gap: 0.5rem;
  justify-content: center;
  align-items: center;
  margin-top: 2.5rem;
`

const Dot = styled.button<{ $active: boolean }>`
  width: ${props => props.$active ? '24px' : '8px'};
  height: 8px;
  background: ${props => props.$active ? '#3a3a3a' : '#d0d0d0'};
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s ease;
  padding: 0;

  &:hover {
    background: #3a3a3a;
  }
`

const FilmStrip = styled.div`
  position: absolute;
  bottom: 0;
  transform: translateY(50%) translateX(-25%);
  left: 0;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0.25rem;
  background: #1a1a1a;
  padding: 0.5rem;
  border: 2px solid #1a1a1a;

  &::before {
    content: '';
    position: absolute;
    top: -4px;
    left: -4px;
    right: -4px;
    bottom: -4px;
    border: 1px solid #4a4a4a;
    pointer-events: none;
  }

  @media (max-width: 768px) {
    bottom: 0.5rem;
  }
`

const FilmFrame = styled.button<{ $active: boolean }>`
  width: 60px;
  height: 60px;
  background: ${props => props.$active ? '#f5f5f5' : '#2a2a2a'};
  border: 1px solid ${props => props.$active ? '#1a1a1a' : '#4a4a4a'};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  position: relative;

  &:hover {
    background: #3a3a3a;
  }

  @media (max-width: 768px) {
    width: 48px;
    height: 48px;
  }
`

const FrameNumber = styled.span`
  font-size: 0.65rem;
  font-family: 'Courier New', monospace;
  color: #8a8a8a;
  font-weight: 700;
`

export default Projects