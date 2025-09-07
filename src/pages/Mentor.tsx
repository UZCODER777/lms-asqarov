import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs'
import { Badge } from '../components/ui/badge'
import { useRoadmapStore } from '../store/roadmapStore'
import { Users, MessageSquare, BarChart3, Settings, User, Calendar } from 'lucide-react'

export const Mentor = () => {
  const { user, getAllTopics, getFilteredTopics } = useRoadmapStore()
  const [selectedStudent, setSelectedStudent] = useState<string>()

  // Mock mentor data - in real app this would come from backend
  const mentorStats = {
    totalStudents: 24,
    activeStudents: 18,
    completionRate: 78,
    averageProgress: 65
  }

  const mockStudents = [
    {
      id: '1',
      name: 'Alice Johnson',
      email: 'alice@example.com',
      progress: 85,
      status: 'Active',
      joinedAt: '2024-01-15',
      lastActivity: '2024-01-20'
    },
    {
      id: '2', 
      name: 'Bob Smith',
      email: 'bob@example.com',
      progress: 45,
      status: 'Active',
      joinedAt: '2024-01-10',
      lastActivity: '2024-01-19'
    },
    {
      id: '3',
      name: 'Charlie Brown',
      email: 'charlie@example.com', 
      progress: 92,
      status: 'Completed',
      joinedAt: '2023-12-01',
      lastActivity: '2024-01-18'
    }
  ]

  const mockMessages = [
    {
      id: '1',
      student: 'Alice Johnson',
      subject: 'Question about React Hooks',
      message: 'I\'m having trouble understanding useEffect dependencies...',
      timestamp: '2 hours ago',
      status: 'unread'
    },
    {
      id: '2',
      student: 'Bob Smith', 
      subject: 'CSS Grid Layout Help',
      message: 'Could you review my grid layout implementation?',
      timestamp: '5 hours ago',
      status: 'read'
    }
  ]

  if (user?.role !== 'mentor') {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Mentor Tools</h1>
          <p className="text-muted-foreground">
            Mentor dashboard and student management
          </p>
        </div>

        <Card>
          <CardContent className="pt-6">
            <div className="text-center py-8">
              <Users className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium mb-2">Mentor Access Required</h3>
              <p className="text-muted-foreground mb-4">
                You need mentor privileges to access these tools.
              </p>
              <Button>Request Mentor Access</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Mentor Dashboard</h1>
        <p className="text-muted-foreground">
          Manage and support your students' learning journey
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Students</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mentorStats.totalStudents}</div>
            <p className="text-xs text-muted-foreground">
              {mentorStats.activeStudents} active
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Progress</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mentorStats.averageProgress}%</div>
            <p className="text-xs text-muted-foreground">
              Across all students
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completion Rate</CardTitle>
            <Settings className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mentorStats.completionRate}%</div>
            <p className="text-xs text-muted-foreground">
              Module completion
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Messages</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {mockMessages.filter(m => m.status === 'unread').length}
            </div>
            <p className="text-xs text-muted-foreground">
              Unread messages
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="students" className="space-y-4">
        <TabsList>
          <TabsTrigger value="students">Students</TabsTrigger>
          <TabsTrigger value="messages">Messages</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="students" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Student Management</CardTitle>
              <div className="flex items-center space-x-2">
                <Input placeholder="Search students..." className="max-w-sm" />
                <Button>Add Student</Button>
              </div>
            </CardHeader>
            
            <CardContent>
              <div className="space-y-4">
                {mockStudents.map((student) => (
                  <div key={student.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
                        <User className="h-5 w-5" />
                      </div>
                      <div>
                        <div className="font-medium">{student.name}</div>
                        <div className="text-sm text-muted-foreground">{student.email}</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <div className="text-sm font-medium">{student.progress}% Complete</div>
                        <div className="text-xs text-muted-foreground">
                          Last active: {student.lastActivity}
                        </div>
                      </div>
                      
                      <Badge variant={student.status === 'Active' ? 'default' : 'secondary'}>
                        {student.status}
                      </Badge>
                      
                      <Button variant="outline" size="sm">View</Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="messages" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Student Messages</CardTitle>
            </CardHeader>
            
            <CardContent>
              <div className="space-y-4">
                {mockMessages.map((message) => (
                  <div key={message.id} className="p-4 border rounded-lg">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <span className="font-medium">{message.student}</span>
                        {message.status === 'unread' && (
                          <Badge variant="destructive" className="text-xs">New</Badge>
                        )}
                      </div>
                      <span className="text-sm text-muted-foreground">{message.timestamp}</span>
                    </div>
                    
                    <h4 className="font-medium mb-1">{message.subject}</h4>
                    <p className="text-sm text-muted-foreground mb-3">{message.message}</p>
                    
                    <div className="flex space-x-2">
                      <Button size="sm">Reply</Button>
                      <Button variant="outline" size="sm">Mark Read</Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="text-center py-8">
            <BarChart3 className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium mb-2">Advanced Analytics</h3>
            <p className="text-muted-foreground">
              Detailed student progress analytics and reporting tools coming soon
            </p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}