import { Search, Filter } from 'lucide-react'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { TopicStatus } from '../../data/types'

interface FilterControlsProps {
  searchTerm: string
  onSearchChange: (value: string) => void
  statusFilter: TopicStatus | 'all'
  onStatusFilterChange: (value: TopicStatus | 'all') => void
  onResetFilters: () => void
}

export const FilterControls = ({
  searchTerm,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
  onResetFilters
}: FilterControlsProps) => {
  return (
    <div className="flex items-center space-x-4 p-4 bg-muted/30 rounded-lg">
      <div className="flex-1 relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search modules and topics..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10"
        />
      </div>
      
      <Select value={statusFilter} onValueChange={onStatusFilterChange}>
        <SelectTrigger className="w-40">
          <Filter className="h-4 w-4 mr-2" />
          <SelectValue placeholder="Filter by status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Topics</SelectItem>
          <SelectItem value="Future">Future</SelectItem>
          <SelectItem value="Now">In Progress</SelectItem>
          <SelectItem value="Completed">Completed</SelectItem>
        </SelectContent>
      </Select>
      
      <Button variant="outline" onClick={onResetFilters}>
        Reset
      </Button>
    </div>
  )
}