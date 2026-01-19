import { useState, useEffect } from 'react'
import styled from 'styled-components'
import { projects } from './projects'

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
    <Container>
      <ContactSheet>
        {projects.map(project => (
          <ContactFrame
            key={project.id}
            $active={project.id === selectedProjectId}
            onClick={() => handleProjectChange(project.id)}
          >
            <FrameContent>
              <ProjectName>{project.name}</ProjectName>
              <ProjectCategory>{project.category}</ProjectCategory>
            </FrameContent>
          </ContactFrame>
        ))}
      </ContactSheet>

      <MainDisplay>
        <SlideContent>
          <SlideTitle>{currentSlide?.title}</SlideTitle>
          <SlideDescription>{currentSlide?.description}</SlideDescription>
          <SlideBody>{currentSlide?.content}</SlideBody>
        </SlideContent>

        <ProgressIndicator>
          {currentProject?.slides.map(slide => (
            <Dot
              key={slide.id}
              $active={slide.id === selectedSlideId}
              onClick={() => setSelectedSlideId(slide.id)}
            />
          ))}
        </ProgressIndicator>
      </MainDisplay>
    </Container>
  )
}

const Container = styled.section`
  padding: 4rem 2rem;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  gap: 4rem;
`

const ContactSheet = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  max-width: 1000px;
  margin: 0 auto;
  width: 100%;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
`

const ContactFrame = styled.div<{ $active: boolean }>`
  background: transparent;
  border: 1px solid ${props => props.$active ? '#3a3a3a' : '#e0e0e0'};
  border-radius: 4px;
  padding: 2rem 1.5rem;
  cursor: pointer;
  transition: all 0.2s ease;
  position: relative;

  &:hover {
    border-color: #3a3a3a;
  }
`

const FrameContent = styled.div`
  position: relative;
  z-index: 1;
`

const ProjectName = styled.h3`
  margin: 0 0 0.25rem 0;
  font-size: 1.1rem;
  color: ${props => props.theme.$active ? '#1a1a1a' : '#4a4a4a'};
  font-weight: 600;
  transition: color 0.2s ease;

  ${ContactFrame}:hover & {
    color: #1a1a1a;
  }

  ${ContactFrame}[data-active="true"] &,
  ${props => props.theme.$active && `color: #1a1a1a;`}
`

const ProjectCategory = styled.p`
  margin: 0;
  font-size: 0.85rem;
  color: #999;
  font-weight: 400;
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

  @media (max-width: 768px) {
    padding: 2rem;
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

export default Projects