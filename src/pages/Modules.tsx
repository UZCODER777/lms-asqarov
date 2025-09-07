import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { Badge } from '../components/ui/badge'
import { Progress } from '../components/ui/progress'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { useRoadmapStore } from '../store/roadmapStore'
import { Module } from '../data/types'
import { BookOpen, Clock, Search, ExternalLink } from 'lucide-react'

const ModuleCard = ({ module }: { module: Module }) => {
  const { getModuleProgress } = useRoadmapStore()
  const progress = getModuleProgress(module.id)
  
  const totalTopics = module.topics.length + 
    (module.subModules?.reduce((acc, sub) => acc + sub.topics.length, 0) || 0)
  
  const totalHours = module.topics.reduce((acc, topic) => acc + topic.estimatedHours, 0) +
    (module.subModules?.reduce((acc, sub) => 
      acc + sub.topics.reduce((subAcc, topic) => subAcc + topic.estimatedHours, 0), 0) || 0)

  return (
    <Card className="h-full">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="space-y-1 flex-1">
            <CardTitle className="text-lg">{module.title}</CardTitle>
            <p className="text-sm text-muted-foreground line-clamp-2">
              {module.summary}
            </p>
          </div>
          <Badge variant="outline">{progress}%</Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <Progress value={progress} className="w-full" />
        
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <BookOpen className="h-4 w-4" />
              <span>{totalTopics} topics</span>
            </div>
            <div className="flex items-center space-x-1">
              <Clock className="h-4 w-4" />
              <span>{totalHours}h</span>
            </div>
          </div>
          
          {module.subModules && (
            <Badge variant="secondary">
              {module.subModules.length} modules
            </Badge>
          )}
        </div>

        {module.links && module.links.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {module.links.slice(0, 2).map((link, index) => (
              <Button
                key={index}
                variant="ghost"
                size="sm"
                className="h-6 px-2 text-xs"
                onClick={() => window.open(link.url, '_blank')}
              >
                <ExternalLink className="h-3 w-3 mr-1" />
                {link.title}
              </Button>
            ))}
            {module.links.length > 2 && (
              <Badge variant="outline" className="text-xs">
                +{module.links.length - 2} more
              </Badge>
            )}
          </div>
        )}

        <div className="pt-2">
          <Button className="w-full" variant="outline">
            View Module
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

const getAllModules = (modules: Module[]): Module[] => {
  const allModules: Module[] = []
  
  const extractModules = (moduleList: Module[]) => {
    moduleList.forEach(module => {
      allModules.push(module)
      if (module.subModules) {
        extractModules(module.subModules)
      }
    })
  }
  
  extractModules(modules)
  return allModules
}

export const Modules = () => {
  const { roadmap } = useRoadmapStore()
  const [searchTerm, setSearchTerm] = useState('')

  if (!roadmap) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-muted-foreground">Loading modules...</p>
      </div>
    )
  }

  const allModules = getAllModules(roadmap.modules)
  
  const filteredModules = allModules.filter(module =>
    module.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    module.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    module.summary.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Modules</h1>
        <p className="text-muted-foreground">
          Browse all learning modules and track your progress
        </p>
      </div>

      <div className="flex items-center space-x-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search modules..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <div className="text-sm text-muted-foreground">
          {filteredModules.length} modules found
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredModules.map((module) => (
          <ModuleCard key={module.id} module={module} />
        ))}
      </div>

      {filteredModules.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No modules found matching your search.</p>
        </div>
      )}
    </div>
  )
}