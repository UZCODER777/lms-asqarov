export const Projects = () => {
  const sampleProjects = [
    {
      id: '1',
      title: 'Personal Portfolio Website',
      description: 'Create a responsive portfolio showcasing your skills and projects',
      status: 'In Progress',
      technologies: ['HTML', 'CSS', 'JavaScript', 'React'],
      difficulty: 'Beginner',
      estimatedHours: 15
    },
    {
      id: '2',
      title: 'Task Management App',
      description: 'Build a full-featured task management application with CRUD operations',
      status: 'Not Started',
      technologies: ['React', 'TypeScript', 'Node.js', 'MongoDB'],
      difficulty: 'Intermediate',
      estimatedHours: 40
    },
    {
      id: '3',
      title: 'E-commerce Store',
      description: 'Develop a complete e-commerce solution with payment integration',
      status: 'Completed',
      technologies: ['React', 'Express', 'PostgreSQL', 'Stripe'],
      difficulty: 'Advanced',
      estimatedHours: 80
    }
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Projects</h1>
        <p className="text-muted-foreground">
          Apply your knowledge through hands-on projects
        </p>
      </div>

      <div className="text-center py-12 border-2 border-dashed border-muted-foreground/25 rounded-lg">
        <p className="text-lg font-medium mb-2">Projects Coming Soon</p>
        <p className="text-muted-foreground mb-4">
          We're working on an exciting project-based learning system
        </p>
        
        <div className="max-w-2xl mx-auto">
          <h3 className="font-medium mb-4">Preview: Upcoming Projects</h3>
          <div className="grid gap-4 md:grid-cols-2">
            {sampleProjects.map(project => (
              <div key={project.id} className="p-4 border rounded-lg text-left">
                <h4 className="font-medium mb-2">{project.title}</h4>
                <p className="text-sm text-muted-foreground mb-2">{project.description}</p>
                <div className="flex flex-wrap gap-1 text-xs">
                  {project.technologies.map(tech => (
                    <span key={tech} className="px-2 py-1 bg-muted rounded">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}