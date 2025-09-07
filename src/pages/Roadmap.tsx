import { useState } from 'react'
import { ModuleTree } from '../components/roadmap/ModuleTree'
import { FilterControls } from '../components/roadmap/FilterControls'
import { useRoadmapStore } from '../store/roadmapStore'
import { TopicStatus } from '../data/types'

export const Roadmap = () => {
  const { roadmap } = useRoadmapStore()
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<TopicStatus | 'all'>('all')
  const [selectedModuleId, setSelectedModuleId] = useState<string>()

  const handleResetFilters = () => {
    setSearchTerm('')
    setStatusFilter('all')
  }

  const handleModuleSelect = (moduleId: string) => {
    setSelectedModuleId(moduleId)
  }

  const handleTopicSelect = (topicId: string) => {
    // TODO: Navigate to topic detail
    console.log('Selected topic:', topicId)
  }

  if (!roadmap) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-muted-foreground">Loading roadmap...</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">{roadmap.title}</h1>
        <p className="text-muted-foreground">
          {roadmap.description}
        </p>
      </div>

      <FilterControls
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        statusFilter={statusFilter}
        onStatusFilterChange={setStatusFilter}
        onResetFilters={handleResetFilters}
      />

      <div className="bg-background border rounded-lg p-6">
        <ModuleTree
          modules={roadmap.modules}
          onModuleSelect={handleModuleSelect}
          onTopicSelect={handleTopicSelect}
          selectedModuleId={selectedModuleId}
        />
      </div>
    </div>
  )
}