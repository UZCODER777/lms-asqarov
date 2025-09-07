export type TopicStatus = 'Future' | 'Now' | 'Completed'

export interface Topic {
  id: string
  title: string
  description: string
  keywords: string[]
  status: TopicStatus
  estimatedHours: number
  createdAt: string
  links?: Array<{
    title: string
    url: string
    type: 'docs' | 'github' | 'tutorial' | 'article'
  }>
}

export interface Module {
  id: string
  title: string
  description: string
  summary: string
  createdAt: string
  topics: Topic[]
  subModules?: Module[]
  estimatedHours?: number
  links?: Array<{
    title: string
    url: string
    type: 'docs' | 'github' | 'tutorial' | 'article'
  }>
}

export interface Roadmap {
  id: string
  title: string
  description: string
  version: string
  modules: Module[]
  createdAt: string
  updatedAt: string
}

export interface UserProgress {
  userId: string
  roadmapId: string
  completedTopics: Set<string>
  topicStatuses: Record<string, TopicStatus>
  lastUpdated: string
  settings: {
    useWeightedProgress: boolean
    theme: 'light' | 'dark' | 'system'
  }
}

export interface User {
  id: string
  name: string
  email: string
  role: 'student' | 'mentor'
  avatar?: string
  joinedAt: string
}