import { useState } from 'react'
import styled from 'styled-components'
import { projects } from './projects'

const Projects = () => {
  const [selectedProjectId, setSelectedProjectId] = useState(1)
  const [selectedSlideId, setSelectedSlideId] = useState(1)

  const currentProject = projects.find(p => p.id === selectedProjectId)
  const currentSlide = currentProject?.slides.find(s => s.id === selectedSlideId)

  return (
    <Container>
      <ProjectTabs>
        {projects.map(project => (
          <Tab
            key={project.id}
            $active={project.id === selectedProjectId}
            onClick={() => {
              setSelectedProjectId(project.id)
              setSelectedSlideId(1)
            }}
          >
            {project.name}
          </Tab>
        ))}
      </ProjectTabs>

      <ContentArea>
        <FilmRoll>
          <FilmRollHeader>Film Roll</FilmRollHeader>
          <FilmStrip>
            {currentProject?.slides.map(slide => (
              <FilmFrame
                key={slide.id}
                $active={slide.id === selectedSlideId}
                onClick={() => setSelectedSlideId(slide.id)}
              >
                <FrameNumber>{slide.id}</FrameNumber>
                <FramePreview>
                  <FrameTitle>{slide.title}</FrameTitle>
                </FramePreview>
              </FilmFrame>
            ))}
          </FilmStrip>
        </FilmRoll>

        <MainScreen>
          <ProjectInfo>
            <ProjectName>{currentProject?.name}</ProjectName>
            <ProjectCategory>{currentProject?.category}</ProjectCategory>
          </ProjectInfo>
          
          <SlideContent>
            <SlideTitle>{currentSlide?.title}</SlideTitle>
            <SlideDescription>{currentSlide?.description}</SlideDescription>
            <SlideBody>{currentSlide?.content}</SlideBody>
          </SlideContent>
        </MainScreen>
      </ContentArea>
    </Container>
  )
}

const Container = styled.section`
  padding: 4rem 2rem;
  min-height: 100vh;
`

const ProjectTabs = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
  margin-bottom: 2rem;
  flex-wrap: wrap;
`

const Tab = styled.button<{ $active: boolean }>`
  padding: 0.75rem 1.5rem;
  background: ${props => props.$active ? '#2a2a2a' : 'transparent'};
  color: ${props => props.$active ? '#fff' : '#6a6a6a'};
  border: 2px solid ${props => props.$active ? '#2a2a2a' : '#3a3a3a'};
  border-radius: 8px;
  cursor: pointer;
  font-size: 0.95rem;
  font-weight: 600;
  transition: all 0.3s ease;

  &:hover {
    background: ${props => props.$active ? '#2a2a2a' : '#1a1a1a'};
    color: #fff;
    border-color: #2a2a2a;
  }
`

const ContentArea = styled.div`
  display: grid;
  grid-template-columns: 250px 1fr;
  gap: 3rem;
  align-items: start;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`

const FilmRoll = styled.div`
  background: linear-gradient(180deg, #2a2a2a 0%, #1a1a1a 100%);
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
`

const FilmRollHeader = styled.h3`
  color: #fff;
  font-size: 1rem;
  margin: 0 0 1.5rem 0;
  text-align: center;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
`

const FilmStrip = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`

const FilmFrame = styled.div<{ $active: boolean }>`
  background: ${props => props.$active ? '#3a3a3a' : '#222'};
  border: 3px solid ${props => props.$active ? '#646cff' : '#333'};
  border-radius: 8px;
  padding: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;

  &:hover {
    background: #3a3a3a;
    border-color: #646cff;
    transform: translateX(4px);
  }

  &::before,
  &::after {
    content: '';
    position: absolute;
    width: 8px;
    height: 8px;
    background: #444;
    border-radius: 50%;
  }

  &::before {
    top: 50%;
    left: -16px;
    transform: translateY(-50%);
  }

  &::after {
    top: 50%;
    right: -16px;
    transform: translateY(-50%);
  }
`

const FrameNumber = styled.div`
  font-size: 0.75rem;
  color: #888;
  font-family: monospace;
  margin-bottom: 0.5rem;
`

const FramePreview = styled.div`
  aspect-ratio: 4/3;
  background: linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%);
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem;
`

const FrameTitle = styled.span`
  color: #fff;
  font-size: 0.85rem;
  font-weight: 500;
  text-align: center;
`

const MainScreen = styled.div`
  background: linear-gradient(135deg, #f5f5f5 0%, #e8e8e8 100%);
  border-radius: 12px;
  padding: 3rem;
  min-height: 500px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    padding: 2rem;
  }
`

const ProjectInfo = styled.div`
  margin-bottom: 2rem;
  padding-bottom: 1.5rem;
  border-bottom: 2px solid #d0d0d0;
`

const ProjectName = styled.h2`
  margin: 0 0 0.5rem 0;
  font-size: 2rem;
  color: #1a1a1a;
  font-weight: 700;
`

const ProjectCategory = styled.p`
  margin: 0;
  font-size: 1rem;
  color: #6a6a6a;
  font-weight: 500;
`

const SlideContent = styled.div`
  color: #1a1a1a;
`

const SlideTitle = styled.h3`
  margin: 0 0 1rem 0;
  font-size: 1.5rem;
  color: #2a2a2a;
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
  color: #3a3a3a;
  line-height: 1.8;
`

export default Projects