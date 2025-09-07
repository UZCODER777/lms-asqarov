import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { Badge } from '../components/ui/badge'
import { Button } from '../components/ui/button'
import { useRoadmapStore } from '../store/roadmapStore'
import { User, Calendar, Trophy, Clock } from 'lucide-react'

export const Profile = () => {
  const { user, userProgress, getAllTopics, getFilteredTopics } = useRoadmapStore()

  if (!user) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-muted-foreground">Loading profile...</p>
      </div>
    )
  }

  const totalTopics = getAllTopics().length
  const completedTopics = getFilteredTopics('Completed').length
  const inProgressTopics = getFilteredTopics('Now').length
  
  const totalHours = getAllTopics().reduce((sum, topic) => sum + topic.estimatedHours, 0)
  const completedHours = getFilteredTopics('Completed').reduce((sum, topic) => sum + topic.estimatedHours, 0)

  const joinDate = new Date(user.joinedAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })

  const lastUpdate = userProgress?.lastUpdated ? 
    new Date(userProgress.lastUpdated).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }) : 'Never'

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Profile</h1>
        <p className="text-muted-foreground">
          Your learning journey and progress
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="md:col-span-1">
          <CardHeader className="text-center">
            <div className="mx-auto">
              {user.avatar ? (
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="h-20 w-20 rounded-full object-cover mx-auto"
                />
              ) : (
                <div className="h-20 w-20 rounded-full bg-muted flex items-center justify-center mx-auto">
                  <User className="h-8 w-8" />
                </div>
              )}
            </div>
            <CardTitle className="text-xl">{user.name}</CardTitle>
            <p className="text-sm text-muted-foreground">{user.email}</p>
            <Badge variant={user.role === 'mentor' ? 'default' : 'secondary'}>
              {user.role}
            </Badge>
          </CardHeader>
          
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-2 text-sm">
              <Calendar className="h-4 w-4" />
              <span>Joined {joinDate}</span>
            </div>
            
            <div className="text-center">
              <Button className="w-full">Edit Profile</Button>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Trophy className="h-5 w-5" />
              <span>Learning Statistics</span>
            </CardTitle>
          </CardHeader>
          
          <CardContent className="space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{completedTopics}</div>
                <div className="text-sm text-muted-foreground">Completed</div>
              </div>
              
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{inProgressTopics}</div>
                <div className="text-sm text-muted-foreground">In Progress</div>
              </div>
              
              <div className="text-center">
                <div className="text-2xl font-bold">{totalTopics}</div>
                <div className="text-sm text-muted-foreground">Total Topics</div>
              </div>
              
              <div className="text-center">
                <div className="text-2xl font-bold">{Math.round((completedTopics / totalTopics) * 100)}%</div>
                <div className="text-sm text-muted-foreground">Progress</div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t">
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4" />
                <div>
                  <div className="font-medium">Learning Hours</div>
                  <div className="text-sm text-muted-foreground">
                    {completedHours} of {totalHours} hours completed
                  </div>
                </div>
              </div>
              
              <div>
                <div className="font-medium">Last Activity</div>
                <div className="text-sm text-muted-foreground">{lastUpdate}</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Learning Preferences</CardTitle>
        </CardHeader>
        
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium">Weighted Progress</div>
                <div className="text-sm text-muted-foreground">
                  Calculate progress based on estimated hours
                </div>
              </div>
              <Badge variant={userProgress?.settings.useWeightedProgress ? 'default' : 'secondary'}>
                {userProgress?.settings.useWeightedProgress ? 'Enabled' : 'Disabled'}
              </Badge>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium">Theme</div>
                <div className="text-sm text-muted-foreground">
                  Current theme preference
                </div>
              </div>
              <Badge variant="secondary">
                {userProgress?.settings.theme || 'System'}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}