export const Results = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Results</h1>
        <p className="text-muted-foreground">
          Track your achievements and certifications
        </p>
      </div>

      <div className="text-center py-12 border-2 border-dashed border-muted-foreground/25 rounded-lg">
        <p className="text-lg font-medium mb-2">Results & Achievements</p>
        <p className="text-muted-foreground mb-4">
          Complete topics and projects to unlock achievements
        </p>
        
        <div className="max-w-md mx-auto space-y-4">
          <div className="p-4 border rounded-lg">
            <div className="text-2xl mb-2">🎯</div>
            <h3 className="font-medium">First Steps</h3>
            <p className="text-sm text-muted-foreground">Complete your first topic</p>
          </div>
          
          <div className="p-4 border rounded-lg opacity-50">
            <div className="text-2xl mb-2">🏆</div>
            <h3 className="font-medium">Module Master</h3>
            <p className="text-sm text-muted-foreground">Complete an entire module</p>
          </div>
          
          <div className="p-4 border rounded-lg opacity-50">
            <div className="text-2xl mb-2">🚀</div>
            <h3 className="font-medium">Roadmap Complete</h3>
            <p className="text-sm text-muted-foreground">Finish the entire roadmap</p>
          </div>
        </div>
      </div>
    </div>
  )
}