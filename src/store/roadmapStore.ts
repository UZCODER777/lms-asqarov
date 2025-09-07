import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { Roadmap, User, UserProgress, TopicStatus, Topic, Module } from '../data/types'
import { initializeData } from '../data/generator'

interface RoadmapStore {
  roadmap: Roadmap | null
  user: User | null
  userProgress: UserProgress | null
  isLoading: boolean
  
  // Actions
  initializeStore: () => void
  updateTopicStatus: (topicId: string, status: TopicStatus) => void
  toggleWeightedProgress: () => void
  resetProgress: () => void
  exportData: () => string
  setTheme: (theme: 'light' | 'dark' | 'system') => void
  
  // Computed
  getRoadmapProgress: () => number
  getModuleProgress: (moduleId: string) => number
  getTopicProgress: (topics: Topic[]) => number
  getAllTopics: () => Topic[]
  getFilteredTopics: (status?: TopicStatus) => Topic[]
}

// Helper function to get all topics recursively
const getAllTopicsFromModules = (modules: Module[]): Topic[] => {
  const topics: Topic[] = []
  
  const extractTopics = (module: Module) => {
    topics.push(...module.topics)
    if (module.subModules) {
      module.subModules.forEach(extractTopics)
    }
  }
  
  modules.forEach(extractTopics)
  return topics
}

// Helper function to get topics from specific module
const getTopicsFromModule = (module: Module): Topic[] => {
  const topics = [...module.topics]
  if (module.subModules) {
    module.subModules.forEach(subModule => {
      topics.push(...getTopicsFromModule(subModule))
    })
  }
  return topics
}

export const useRoadmapStore = create<RoadmapStore>()(
  persist(
    (set, get) => ({
      roadmap: null,
      user: null,
      userProgress: null,
      isLoading: false,

      initializeStore: () => {
        set({ isLoading: true })
        
        try {
          const data = initializeData()
          set({
            roadmap: data.roadmap,
            user: data.user,
            userProgress: data.userProgress,
            isLoading: false
          })
        } catch (error) {
          console.error('Failed to initialize store:', error)
          set({ isLoading: false })
        }
      },

      updateTopicStatus: (topicId: string, status: TopicStatus) => {
        const state = get()
        if (!state.userProgress || !state.roadmap) return

        // Update the actual topic status in roadmap
        const updateTopicInModules = (modules: Module[]): Module[] => {
          return modules.map(module => ({
            ...module,
            topics: module.topics.map(topic => 
              topic.id === topicId ? { ...topic, status } : topic
            ),
            subModules: module.subModules ? updateTopicInModules(module.subModules) : undefined
          }))
        }

        const updatedRoadmap = {
          ...state.roadmap,
          modules: updateTopicInModules(state.roadmap.modules),
          updatedAt: new Date().toISOString()
        }

        // Update user progress
        const newCompletedTopics = new Set(state.userProgress.completedTopics)
        const newTopicStatuses = { ...state.userProgress.topicStatuses }

        if (status === 'Completed') {
          newCompletedTopics.add(topicId)
        } else {
          newCompletedTopics.delete(topicId)
        }

        newTopicStatuses[topicId] = status

        const updatedProgress = {
          ...state.userProgress,
          completedTopics: newCompletedTopics,
          topicStatuses: newTopicStatuses,
          lastUpdated: new Date().toISOString()
        }

        set({
          roadmap: updatedRoadmap,
          userProgress: updatedProgress
        })
      },

      toggleWeightedProgress: () => {
        const state = get()
        if (!state.userProgress) return

        set({
          userProgress: {
            ...state.userProgress,
            settings: {
              ...state.userProgress.settings,
              useWeightedProgress: !state.userProgress.settings.useWeightedProgress
            }
          }
        })
      },

      resetProgress: () => {
        const state = get()
        if (!state.roadmap || !state.user) return

        const { roadmap, user, userProgress: newProgress } = initializeData()
        
        set({
          roadmap,
          userProgress: {
            ...newProgress,
            userId: state.user.id,
            settings: state.userProgress?.settings || newProgress.settings
          }
        })
      },

      exportData: () => {
        const state = get()
        const exportData = {
          roadmap: state.roadmap,
          userProgress: state.userProgress,
          exportedAt: new Date().toISOString()
        }
        return JSON.stringify(exportData, null, 2)
      },

      setTheme: (theme: 'light' | 'dark' | 'system') => {
        const state = get()
        if (!state.userProgress) return

        set({
          userProgress: {
            ...state.userProgress,
            settings: {
              ...state.userProgress.settings,
              theme
            }
          }
        })
      },

      getRoadmapProgress: () => {
        const state = get()
        if (!state.roadmap || !state.userProgress) return 0

        const allTopics = getAllTopicsFromModules(state.roadmap.modules)
        if (allTopics.length === 0) return 0

        if (state.userProgress.settings.useWeightedProgress) {
          const totalHours = allTopics.reduce((sum, topic) => sum + topic.estimatedHours, 0)
          const completedHours = allTopics
            .filter(topic => state.userProgress!.completedTopics.has(topic.id))
            .reduce((sum, topic) => sum + topic.estimatedHours, 0)
          
          return totalHours > 0 ? Math.round((completedHours / totalHours) * 100) : 0
        }

        const completedCount = allTopics.filter(topic => 
          state.userProgress!.completedTopics.has(topic.id)
        ).length

        return Math.round((completedCount / allTopics.length) * 100)
      },

      getModuleProgress: (moduleId: string) => {
        const state = get()
        if (!state.roadmap || !state.userProgress) return 0

        const findModule = (modules: Module[]): Module | null => {
          for (const module of modules) {
            if (module.id === moduleId) return module
            if (module.subModules) {
              const found = findModule(module.subModules)
              if (found) return found
            }
          }
          return null
        }

        const module = findModule(state.roadmap.modules)
        if (!module) return 0

        const topics = getTopicsFromModule(module)
        if (topics.length === 0) return 0

        if (state.userProgress.settings.useWeightedProgress) {
          const totalHours = topics.reduce((sum, topic) => sum + topic.estimatedHours, 0)
          const completedHours = topics
            .filter(topic => state.userProgress!.completedTopics.has(topic.id))
            .reduce((sum, topic) => sum + topic.estimatedHours, 0)
          
          return totalHours > 0 ? Math.round((completedHours / totalHours) * 100) : 0
        }

        const completedCount = topics.filter(topic => 
          state.userProgress!.completedTopics.has(topic.id)
        ).length

        return Math.round((completedCount / topics.length) * 100)
      },

      getTopicProgress: (topics: Topic[]) => {
        const state = get()
        if (!state.userProgress || topics.length === 0) return 0

        if (state.userProgress.settings.useWeightedProgress) {
          const totalHours = topics.reduce((sum, topic) => sum + topic.estimatedHours, 0)
          const completedHours = topics
            .filter(topic => state.userProgress!.completedTopics.has(topic.id))
            .reduce((sum, topic) => sum + topic.estimatedHours, 0)
          
          return totalHours > 0 ? Math.round((completedHours / totalHours) * 100) : 0
        }

        const completedCount = topics.filter(topic => 
          state.userProgress!.completedTopics.has(topic.id)
        ).length

        return Math.round((completedCount / topics.length) * 100)
      },

      getAllTopics: () => {
        const state = get()
        if (!state.roadmap) return []
        return getAllTopicsFromModules(state.roadmap.modules)
      },

      getFilteredTopics: (status?: TopicStatus) => {
        const state = get()
        if (!state.roadmap) return []
        
        const allTopics = getAllTopicsFromModules(state.roadmap.modules)
        
        if (!status) return allTopics
        
        return allTopics.filter(topic => {
          const currentStatus = state.userProgress?.topicStatuses[topic.id] || topic.status
          return currentStatus === status
        })
      }
    }),
    {
      name: 'roadmap-storage',
      partialize: (state) => ({
        roadmap: state.roadmap,
        user: state.user,
        userProgress: state.userProgress
      })
    }
  )
)