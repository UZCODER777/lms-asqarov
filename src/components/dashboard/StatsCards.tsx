import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Progress } from '../ui/progress'
import { useRoadmapStore } from '../../store/roadmapStore'
import { BookOpen, Target, Clock, TrendingUp } from 'lucide-react'

export const StatsCards = () => {
  const { 
    getRoadmapProgress, 
    getAllTopics, 
    getFilteredTopics,
    userProgress 
  } = useRoadmapStore()

  const totalTopics = getAllTopics().length
  const completedTopics = getFilteredTopics('Completed').length
  const inProgressTopics = getFilteredTopics('Now').length
  const totalProgress = getRoadmapProgress()

  const totalHours = getAllTopics().reduce((sum, topic) => sum + topic.estimatedHours, 0)
  const completedHours = getFilteredTopics('Completed').reduce((sum, topic) => sum + topic.estimatedHours, 0)

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Overall Progress</CardTitle>
          <TrendingUp className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalProgress}%</div>
          <Progress value={totalProgress} className="mt-2" />
          <p className="text-xs text-muted-foreground mt-2">
            {completedTopics} of {totalTopics} topics completed
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Topics Completed</CardTitle>
          <BookOpen className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{completedTopics}</div>
          <p className="text-xs text-muted-foreground">
            out of {totalTopics} total topics
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Currently Learning</CardTitle>
          <Target className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{inProgressTopics}</div>
          <p className="text-xs text-muted-foreground">
            topics in progress
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            {userProgress?.settings.useWeightedProgress ? 'Hours Completed' : 'Estimated Hours'}
          </CardTitle>
          <Clock className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {userProgress?.settings.useWeightedProgress ? completedHours : totalHours}
          </div>
          <p className="text-xs text-muted-foreground">
            {userProgress?.settings.useWeightedProgress 
              ? `of ${totalHours} total hours`
              : 'estimated learning time'
            }
          </p>
        </CardContent>
      </Card>
    </div>
  )
}