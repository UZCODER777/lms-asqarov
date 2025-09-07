import { User, Settings, Moon, Sun, Monitor } from 'lucide-react'
import { Button } from '../ui/button'
import { useRoadmapStore } from '../../store/roadmapStore'

export const Header = () => {
  const { user, userProgress, setTheme } = useRoadmapStore()
  const currentTheme = userProgress?.settings.theme || 'system'

  const cycleTheme = () => {
    const themes: ('light' | 'dark' | 'system')[] = ['light', 'dark', 'system']
    const currentIndex = themes.indexOf(currentTheme)
    const nextTheme = themes[(currentIndex + 1) % themes.length]
    setTheme(nextTheme)

    // Apply theme to document
    const root = document.documentElement
    if (nextTheme === 'dark') {
      root.classList.add('dark')
    } else if (nextTheme === 'light') {
      root.classList.remove('dark')
    } else {
      // System theme
      const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      root.classList.toggle('dark', systemDark)
    }
  }

  const getThemeIcon = () => {
    switch (currentTheme) {
      case 'light': return <Sun className="h-4 w-4" />
      case 'dark': return <Moon className="h-4 w-4" />
      default: return <Monitor className="h-4 w-4" />
    }
  }

  return (
    <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-14 items-center px-6">
        <div className="flex items-center space-x-2">
          <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
            <span className="text-white font-bold text-sm">LR</span>
          </div>
          <h1 className="text-lg font-semibold">Learning Roadmap</h1>
        </div>
        
        <div className="flex items-center space-x-2 ml-auto">
          <Button
            variant="ghost"
            size="icon"
            onClick={cycleTheme}
            className="h-8 w-8"
          >
            {getThemeIcon()}
          </Button>
          
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Settings className="h-4 w-4" />
          </Button>
          
          <div className="flex items-center space-x-2 pl-2 border-l">
            {user?.avatar && (
              <img
                src={user.avatar}
                alt={user.name}
                className="h-7 w-7 rounded-full object-cover"
              />
            )}
            {!user?.avatar && (
              <div className="h-7 w-7 rounded-full bg-muted flex items-center justify-center">
                <User className="h-4 w-4" />
              </div>
            )}
            <span className="text-sm font-medium">{user?.name || 'Guest'}</span>
          </div>
        </div>
      </div>
    </header>
  )
}