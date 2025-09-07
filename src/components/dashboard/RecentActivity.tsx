import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Badge } from '../ui/badge'
import { useRoadmapStore } from '../../store/roadmapStore'
import { Clock, CheckCircle2, Circle, PlayCircle } from 'lucide-react'

export const RecentActivity = () => {
  const { getAllTopics, userProgress } = useRoadmapStore()

  const recentTopics = getAllTopics()
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 8)

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Completed':
        return <CheckCircle2 className="h-4 w-4 text-green-500" />
      case 'Now':
        return <PlayCircle className="h-4 w-4 text-blue-500" />
      default:
        return <Circle className="h-4 w-4 text-muted-foreground" />
    }
  }

  const getStatusBadge = (status: string) => {
    const variant = status === 'Completed' ? 'default' : 
                   status === 'Now' ? 'secondary' : 'outline'
    return <Badge variant={variant}>{status}</Badge>
  }

  const announcements = [
    {
      id: '1',
      title: 'New React 18 Features Added',
      description: 'Explore the latest React 18 features including Suspense improvements and concurrent rendering.',
      date: '2 days ago',
      type: 'update'
    },
    {
      id: '2', 
      title: 'Weekly Mentoring Session',
      description: 'Join us for the weekly Q&A session every Friday at 3 PM EST.',
      date: '5 days ago',
      type: 'event'
    },
    {
      id: '3',
      title: 'New Testing Module Released',
      description: 'Comprehensive testing strategies and frameworks now available.',
      date: '1 week ago',
      type: 'release'
    }
  ]

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Recent Topics
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentTopics.map((topic) => {
              const currentStatus = userProgress?.topicStatuses[topic.id] || topic.status
              return (
                <div key={topic.id} className="flex items-start justify-between">
                  <div className="flex items-start space-x-3">
                    {getStatusIcon(currentStatus)}
                    <div className="space-y-1">
                      <p className="text-sm font-medium leading-none">{topic.title}</p>
                      <p className="text-xs text-muted-foreground line-clamp-1">
                        {topic.description}
                      </p>
                    </div>
                  </div>
                  {getStatusBadge(currentStatus)}
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Announcements</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {announcements.map((announcement) => (
              <div key={announcement.id} className="space-y-1">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium">{announcement.title}</p>
                  <span className="text-xs text-muted-foreground">{announcement.date}</span>
                </div>
                <p className="text-xs text-muted-foreground">{announcement.description}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}