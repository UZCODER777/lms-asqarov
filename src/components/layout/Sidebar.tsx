import { useState } from 'react'
import { 
  Home, 
  Map, 
  BookOpen, 
  FolderOpen, 
  Target, 
  User, 
  Users,
  ChevronLeft,
  ChevronRight
} from 'lucide-react'
import { Button } from '../ui/button'
import { cn } from '../../lib/utils'

interface SidebarProps {
  currentPage: string
  onPageChange: (page: string) => void
}

const navigation = [
  { id: 'dashboard', label: 'Dashboard', icon: Home },
  { id: 'roadmap', label: 'Roadmap', icon: Map },
  { id: 'modules', label: 'Modules', icon: BookOpen },
  { id: 'projects', label: 'Projects', icon: FolderOpen },
  { id: 'results', label: 'Results', icon: Target },
  { id: 'profile', label: 'Profile', icon: User },
  { id: 'mentor', label: 'Mentor Tools', icon: Users }
]

export const Sidebar = ({ currentPage, onPageChange }: SidebarProps) => {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <div className={cn(
      "border-r bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 transition-all duration-300",
      collapsed ? "w-16" : "w-64"
    )}>
      <div className="flex flex-col h-full">
        <div className="p-4 border-b">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setCollapsed(!collapsed)}
            className="w-full flex justify-center"
          >
            {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </Button>
        </div>
        
        <nav className="flex-1 p-4">
          <div className="space-y-2">
            {navigation.map((item) => {
              const Icon = item.icon
              const isActive = currentPage === item.id
              
              return (
                <Button
                  key={item.id}
                  variant={isActive ? 'default' : 'ghost'}
                  onClick={() => onPageChange(item.id)}
                  className={cn(
                    "w-full justify-start",
                    collapsed && "justify-center px-2"
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {!collapsed && <span className="ml-2">{item.label}</span>}
                </Button>
              )
            })}
          </div>
        </nav>
      </div>
    </div>
  )
}