import * as assets from '@/assets'

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
  coverImage?: string
  slides: ProjectSlide[]
}

export const projects: Project[] = [
  {
    id: 1,
    name: "proj_1",
    category: "Hack The North",
    coverImage: assets.COVER_HTN,
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
    name: "proj_2",
    category: "UWBlueprint",
    coverImage: assets.COVER_UWBP,
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
    name: "proj_3",
    category: "For Fun",
    coverImage: assets.COVER_FUN,
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
