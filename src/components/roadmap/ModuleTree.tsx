import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, ChevronRight, BookOpen, FolderOpen, Folder } from 'lucide-react'
import { Button } from '../ui/button'
import { Progress } from '../ui/progress'
import { Badge } from '../ui/badge'
import { useRoadmapStore } from '../../store/roadmapStore'
import { Module, Topic } from '../../data/types'
import { cn } from '../../lib/utils'

interface ModuleTreeProps {
  modules: Module[]
  onModuleSelect?: (moduleId: string) => void
  onTopicSelect?: (topicId: string) => void
  selectedModuleId?: string
  level?: number
}

interface ModuleNodeProps {
  module: Module
  onModuleSelect?: (moduleId: string) => void
  onTopicSelect?: (topicId: string) => void
  selectedModuleId?: string
  level: number
}

const ModuleNode = ({ 
  module, 
  onModuleSelect, 
  onTopicSelect, 
  selectedModuleId,
  level 
}: ModuleNodeProps) => {
  const [isExpanded, setIsExpanded] = useState(level === 0)
  const { getModuleProgress } = useRoadmapStore()
  
  const progress = getModuleProgress(module.id)
  const hasSubModules = module.subModules && module.subModules.length > 0
  const hasTopics = module.topics.length > 0
  const isSelected = selectedModuleId === module.id
  
  const handleToggle = () => {
    setIsExpanded(!isExpanded)
  }
  
  const handleModuleClick = () => {
    if (onModuleSelect) {
      onModuleSelect(module.id)
    }
  }

  const getModuleIcon = () => {
    if (hasSubModules) {
      return isExpanded ? <FolderOpen className="h-4 w-4" /> : <Folder className="h-4 w-4" />
    }
    return <BookOpen className="h-4 w-4" />
  }

  const indentationClass = level === 0 ? '' : `ml-${Math.min(level * 4, 16)}`

  return (
    <div className={cn("space-y-1", indentationClass)}>
      <div 
        className={cn(
          "flex items-center justify-between p-3 rounded-lg border transition-all duration-200 hover:bg-accent/50",
          isSelected && "bg-accent border-primary",
          "cursor-pointer"
        )}
        onClick={handleModuleClick}
      >
        <div className="flex items-center space-x-3 flex-1">
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6 p-0"
            onClick={(e) => {
              e.stopPropagation()
              handleToggle()
            }}
          >
            {hasSubModules || hasTopics ? (
              isExpanded ? <ChevronDown className="h-3 w-3" /> : <ChevronRight className="h-3 w-3" />
            ) : null}
          </Button>
          
          {getModuleIcon()}
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-2">
              <h3 className={cn(
                "font-medium text-sm truncate",
                level === 0 && "font-semibold text-base"
              )}>
                {module.title}
              </h3>
              <Badge variant="outline" className="text-xs">
                {progress}%
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground line-clamp-1 mt-1">
              {module.summary}
            </p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2 ml-4">
          <div className="text-xs text-muted-foreground">
            {module.topics.length + (module.subModules?.reduce((acc, sub) => acc + sub.topics.length, 0) || 0)} topics
          </div>
          <Progress value={progress} className="w-20" />
        </div>
      </div>

      <AnimatePresence>
        {isExpanded && (hasSubModules || hasTopics) && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="ml-6 space-y-1">
              {/* Render topics first */}
              {hasTopics && module.topics.map((topic) => (
                <TopicNode
                  key={topic.id}
                  topic={topic}
                  onTopicSelect={onTopicSelect}
                  level={level + 1}
                />
              ))}
              
              {/* Then render sub-modules */}
              {hasSubModules && (
                <ModuleTree
                  modules={module.subModules}
                  onModuleSelect={onModuleSelect}
                  onTopicSelect={onTopicSelect}
                  selectedModuleId={selectedModuleId}
                  level={level + 1}
                />
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

const TopicNode = ({ 
  topic, 
  onTopicSelect, 
  level 
}: { 
  topic: Topic
  onTopicSelect?: (topicId: string) => void
  level: number 
}) => {
  const { userProgress } = useRoadmapStore()
  const currentStatus = userProgress?.topicStatuses[topic.id] || topic.status

  const handleTopicClick = () => {
    if (onTopicSelect) {
      onTopicSelect(topic.id)
    }
  }

  const getStatusColor = () => {
    switch (currentStatus) {
      case 'Completed': return 'text-green-600'
      case 'Now': return 'text-blue-600'
      default: return 'text-muted-foreground'
    }
  }

  return (
    <div 
      className="flex items-center justify-between p-2 rounded border border-dashed hover:bg-accent/30 cursor-pointer transition-colors"
      onClick={handleTopicClick}
    >
      <div className="flex items-center space-x-2">
        <div className={cn("h-2 w-2 rounded-full", {
          'bg-green-500': currentStatus === 'Completed',
          'bg-blue-500': currentStatus === 'Now',
          'bg-muted-foreground': currentStatus === 'Future'
        })} />
        <span className="text-sm">{topic.title}</span>
        <Badge variant="secondary" className="text-xs">
          {topic.estimatedHours}h
        </Badge>
      </div>
      <Badge variant={currentStatus === 'Completed' ? 'default' : 'outline'} className="text-xs">
        {currentStatus}
      </Badge>
    </div>
  )
}

export const ModuleTree = ({ 
  modules, 
  onModuleSelect, 
  onTopicSelect, 
  selectedModuleId,
  level = 0 
}: ModuleTreeProps) => {
  return (
    <div className="space-y-2">
      {modules.map((module) => (
        <ModuleNode
          key={module.id}
          module={module}
          onModuleSelect={onModuleSelect}
          onTopicSelect={onTopicSelect}
          selectedModuleId={selectedModuleId}
          level={level}
        />
      ))}
    </div>
  )
}