export type ProjectSlide = {
  id: number
  title: string
  description: string
  image?: string
  content: string
}

export type Project = {
  id: number
  name: string
  category: string
  slides: ProjectSlide[]
}

export const projects: Project[] = [
  {
    id: 1,
    name: "Project One",
    category: "Web Development",
    slides: [
      {
        id: 1,
        title: "Slide 1",
        description: "First part of the story",
        content: "Content for slide 1"
      },
      {
        id: 2,
        title: "Slide 2",
        description: "Second part of the story",
        content: "Content for slide 2"
      },
      {
        id: 3,
        title: "Slide 3",
        description: "Third part of the story",
        content: "Content for slide 3"
      },
      {
        id: 4,
        title: "Slide 4",
        description: "Fourth part of the story",
        content: "Content for slide 4"
      }
    ]
  },
  {
    id: 2,
    name: "Project Two",
    category: "Design",
    slides: [
      {
        id: 1,
        title: "Slide 1",
        description: "First part of the story",
        content: "Content for slide 1"
      },
      {
        id: 2,
        title: "Slide 2",
        description: "Second part of the story",
        content: "Content for slide 2"
      },
      {
        id: 3,
        title: "Slide 3",
        description: "Third part of the story",
        content: "Content for slide 3"
      },
      {
        id: 4,
        title: "Slide 4",
        description: "Fourth part of the story",
        content: "Content for slide 4"
      }
    ]
  },
  {
    id: 3,
    name: "Project Three",
    category: "Mobile App",
    slides: [
      {
        id: 1,
        title: "Slide 1",
        description: "First part of the story",
        content: "Content for slide 1"
      },
      {
        id: 2,
        title: "Slide 2",
        description: "Second part of the story",
        content: "Content for slide 2"
      },
      {
        id: 3,
        title: "Slide 3",
        description: "Third part of the story",
        content: "Content for slide 3"
      },
      {
        id: 4,
        title: "Slide 4",
        description: "Fourth part of the story",
        content: "Content for slide 4"
      }
    ]
  }
]
