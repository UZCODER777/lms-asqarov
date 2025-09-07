import { useEffect, useState } from 'react'
import { Header } from './components/layout/Header'
import { Sidebar } from './components/layout/Sidebar'
import { Dashboard } from './pages/Dashboard'
import { Roadmap } from './pages/Roadmap'
import { Modules } from './pages/Modules'
import { Projects } from './pages/Projects'
import { Results } from './pages/Results'
import { Profile } from './pages/Profile'
import { Mentor } from './pages/Mentor'
import { useRoadmapStore } from './store/roadmapStore'

function App() {
  const [currentPage, setCurrentPage] = useState('dashboard')
  const { initializeStore, isLoading, userProgress } = useRoadmapStore()

  useEffect(() => {
    initializeStore()
  }, [initializeStore])

  useEffect(() => {
    // Apply theme on load and when it changes
    const theme = userProgress?.settings.theme || 'system'
    const root = document.documentElement

    if (theme === 'dark') {
      root.classList.add('dark')
    } else if (theme === 'light') {
      root.classList.remove('dark')
    } else {
      // System theme
      const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      root.classList.toggle('dark', systemDark)
    }
  }, [userProgress?.settings.theme])

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard />
      case 'roadmap':
        return <Roadmap />
      case 'modules':
        return <Modules />
      case 'projects':
        return <Projects />
      case 'results':
        return <Results />
      case 'profile':
        return <Profile />
      case 'mentor':
        return <Mentor />
      default:
        return <Dashboard />
    }
  }

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="text-center space-y-2">
          <div className="h-8 w-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-muted-foreground">Loading your learning roadmap...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="h-screen flex flex-col bg-background">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar currentPage={currentPage} onPageChange={setCurrentPage} />
        <main className="flex-1 overflow-auto p-6">
          {renderPage()}
        </main>
      </div>
    </div>
  )
}

export default App