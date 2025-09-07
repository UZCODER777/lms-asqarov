import { StatsCards } from '../components/dashboard/StatsCards'
import { ProgressChart } from '../components/dashboard/ProgressChart'
import { RecentActivity } from '../components/dashboard/RecentActivity'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { Button } from '../components/ui/button'
import { Switch } from '../components/ui/switch'
import { useRoadmapStore } from '../store/roadmapStore'
import { Download, RotateCcw, Weight } from 'lucide-react'

export const Dashboard = () => {
  const { 
    userProgress, 
    toggleWeightedProgress, 
    resetProgress, 
    exportData,
    getRoadmapProgress 
  } = useRoadmapStore()

  const handleExport = () => {
    const data = exportData()
    const blob = new Blob([data], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `roadmap-progress-${new Date().toISOString().split('T')[0]}.json`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  const handleReset = () => {
    if (confirm('Are you sure you want to reset all progress? This action cannot be undone.')) {
      resetProgress()
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">
            Track your learning progress and achievements
          </p>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button variant="outline" onClick={handleExport}>
            <Download className="h-4 w-4 mr-2" />
            Export Data
          </Button>
          <Button variant="outline" onClick={handleReset}>
            <RotateCcw className="h-4 w-4 mr-2" />
            Reset Progress
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Weight className="h-5 w-5" />
            <span>Progress Calculation</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Weighted Progress by Hours</p>
              <p className="text-sm text-muted-foreground">
                Calculate progress based on estimated hours instead of topic count
              </p>
            </div>
            <Switch
              checked={userProgress?.settings.useWeightedProgress || false}
              onCheckedChange={toggleWeightedProgress}
            />
          </div>
        </CardContent>
      </Card>

      <StatsCards />
      <ProgressChart />
      <RecentActivity />
    </div>
  )
}