import { nanoid } from 'nanoid'
import { Module, Roadmap, Topic, TopicStatus, User, UserProgress } from './types'

// Helper function to generate realistic creation dates
const generateDate = (daysAgo: number = 0): string => {
  const date = new Date()
  date.setDate(date.getDate() - daysAgo)
  return date.toISOString()
}

// Helper function to get random items from array
const getRandomItems = <T>(array: T[], count: number): T[] => {
  const shuffled = [...array].sort(() => 0.5 - Math.random())
  return shuffled.slice(0, count)
}

// Helper function to get random status with realistic distribution
const getRandomStatus = (): TopicStatus => {
  const rand = Math.random()
  if (rand < 0.3) return 'Completed'
  if (rand < 0.5) return 'Now'
  return 'Future'
}

const sampleLinks = {
  docs: [
    { title: 'MDN Web Docs', url: 'https://developer.mozilla.org', type: 'docs' as const },
    { title: 'W3C Specification', url: 'https://www.w3.org', type: 'docs' as const },
    { title: 'React Documentation', url: 'https://react.dev', type: 'docs' as const },
    { title: 'TypeScript Handbook', url: 'https://www.typescriptlang.org/docs', type: 'docs' as const }
  ],
  github: [
    { title: 'Awesome List', url: 'https://github.com/sindresorhus/awesome', type: 'github' as const },
    { title: 'Practice Repository', url: 'https://github.com/example/practice', type: 'github' as const },
    { title: 'Code Examples', url: 'https://github.com/example/examples', type: 'github' as const }
  ],
  tutorial: [
    { title: 'FreeCodeCamp Tutorial', url: 'https://www.freecodecamp.org', type: 'tutorial' as const },
    { title: 'Tutorial Series', url: 'https://example.com/tutorial', type: 'tutorial' as const }
  ]
}

export const generateTopic = (title: string, keywords: string[], description?: string): Topic => {
  const links = [
    ...getRandomItems(sampleLinks.docs, Math.floor(Math.random() * 2) + 1),
    ...getRandomItems(sampleLinks.github, Math.floor(Math.random() * 2)),
    ...getRandomItems(sampleLinks.tutorial, Math.floor(Math.random() * 2))
  ]

  return {
    id: nanoid(),
    title,
    description: description || `Master ${title.toLowerCase()} concepts and apply them effectively in real-world projects.`,
    keywords,
    status: getRandomStatus(),
    estimatedHours: Math.floor(Math.random() * 8) + 1,
    createdAt: generateDate(Math.floor(Math.random() * 365)),
    links: links.length > 0 ? links : undefined
  }
}

export const generateFoundationModule = (): Module => {
  const topics: Topic[] = [
    generateTopic('Computer Science Fundamentals', ['algorithms', 'data structures', 'complexity', 'problem solving']),
    generateTopic('Internet & Web Basics', ['http', 'dns', 'browsers', 'servers', 'protocols']),
    generateTopic('Development Environment', ['terminal', 'git', 'editors', 'debugging', 'workflow']),
    generateTopic('Version Control with Git', ['git', 'github', 'branching', 'merging', 'collaboration']),
    generateTopic('Command Line Fundamentals', ['bash', 'shell', 'commands', 'scripting', 'automation']),
    generateTopic('Software Development Lifecycle', ['planning', 'design', 'testing', 'deployment', 'maintenance'])
  ]

  return {
    id: nanoid(),
    title: 'Foundation',
    description: 'Essential programming and development fundamentals',
    summary: 'Build a strong foundation with core computer science concepts, development tools, and industry best practices.',
    createdAt: generateDate(300),
    topics,
    links: getRandomItems([...sampleLinks.docs, ...sampleLinks.tutorial], 3)
  }
}

export const generateHTMLModule = (): Module => {
  const semanticsTopics: Topic[] = [
    generateTopic('Document Structure', ['html5', 'doctype', 'head', 'body', 'metadata']),
    generateTopic('Semantic Elements', ['header', 'nav', 'main', 'article', 'section', 'aside']),
    generateTopic('Forms & Validation', ['form', 'input', 'validation', 'accessibility', 'ux'])
  ]

  const accessibilityTopics: Topic[] = [
    generateTopic('ARIA & Screen Readers', ['aria', 'roles', 'labels', 'screen readers', 'assistive tech']),
    generateTopic('Keyboard Navigation', ['tabindex', 'focus', 'keyboard', 'navigation', 'usability'])
  ]

  const semanticsModule: Module = {
    id: nanoid(),
    title: 'Semantic HTML',
    description: 'Modern HTML5 semantic elements and best practices',
    summary: 'Learn to write meaningful, accessible HTML using modern semantic elements.',
    createdAt: generateDate(250),
    topics: semanticsTopics
  }

  const accessibilityModule: Module = {
    id: nanoid(),
    title: 'Accessibility',
    description: 'Web accessibility standards and implementation',
    summary: 'Implement WCAG guidelines for inclusive web experiences.',
    createdAt: generateDate(240),
    topics: accessibilityTopics
  }

  const mainTopics: Topic[] = [
    generateTopic('HTML Fundamentals', ['tags', 'attributes', 'elements', 'syntax', 'structure']),
    generateTopic('Media Elements', ['img', 'video', 'audio', 'canvas', 'svg'])
  ]

  return {
    id: nanoid(),
    title: 'HTML',
    description: 'HyperText Markup Language - the foundation of web content',
    summary: 'Master HTML5 semantic markup, accessibility standards, and modern best practices for content structure.',
    createdAt: generateDate(280),
    topics: mainTopics,
    subModules: [semanticsModule, accessibilityModule],
    links: getRandomItems(sampleLinks.docs, 2)
  }
}

export const generateCSSModule = (): Module => {
  const layoutTopics: Topic[] = [
    generateTopic('CSS Grid', ['grid', 'fr-unit', 'grid-areas', 'auto-placement', 'responsive']),
    generateTopic('Flexbox', ['flex', 'alignment', 'distribution', 'direction', 'wrap']),
    generateTopic('Positioning', ['static', 'relative', 'absolute', 'fixed', 'sticky'])
  ]

  const stylingTopics: Topic[] = [
    generateTopic('Colors & Typography', ['color-theory', 'fonts', 'hierarchy', 'contrast', 'readability']),
    generateTopic('Animations & Transitions', ['keyframes', 'transitions', 'transforms', 'performance', 'easing'])
  ]

  const layoutModule: Module = {
    id: nanoid(),
    title: 'Layout Systems',
    description: 'Modern CSS layout techniques',
    summary: 'Master CSS Grid, Flexbox, and positioning for complex layouts.',
    createdAt: generateDate(220),
    topics: layoutTopics
  }

  const stylingModule: Module = {
    id: nanoid(),
    title: 'Advanced Styling',
    description: 'Visual design and interactive effects',
    summary: 'Create beautiful, animated interfaces with advanced CSS techniques.',
    createdAt: generateDate(210),
    topics: stylingTopics
  }

  const mainTopics: Topic[] = [
    generateTopic('CSS Fundamentals', ['selectors', 'cascade', 'specificity', 'inheritance', 'box-model']),
    generateTopic('Responsive Design', ['media-queries', 'mobile-first', 'breakpoints', 'fluid-layouts', 'viewport']),
    generateTopic('CSS Preprocessors', ['sass', 'less', 'variables', 'nesting', 'mixins'])
  ]

  return {
    id: nanoid(),
    title: 'CSS',
    description: 'Cascading Style Sheets - styling and layout for the web',
    summary: 'Learn modern CSS techniques including Grid, Flexbox, animations, and responsive design principles.',
    createdAt: generateDate(260),
    topics: mainTopics,
    subModules: [layoutModule, stylingModule],
    links: getRandomItems([...sampleLinks.docs, ...sampleLinks.github], 3)
  }
}

export const generateJavaScriptModule = (): Module => {
  const coreTopics: Topic[] = [
    generateTopic('Variables & Data Types', ['let', 'const', 'var', 'primitives', 'objects', 'arrays']),
    generateTopic('Functions & Scope', ['functions', 'arrow-functions', 'closures', 'scope', 'hoisting']),
    generateTopic('Objects & Prototypes', ['objects', 'prototypes', 'inheritance', 'classes', 'constructors'])
  ]

  const asyncTopics: Topic[] = [
    generateTopic('Promises & Async/Await', ['promises', 'async-await', 'error-handling', 'chaining']),
    generateTopic('Fetch API & HTTP', ['fetch', 'rest-api', 'json', 'cors', 'authentication'])
  ]

  const domTopics: Topic[] = [
    generateTopic('DOM Manipulation', ['selectors', 'events', 'dynamic-content', 'performance']),
    generateTopic('Event Handling', ['event-listeners', 'delegation', 'propagation', 'prevention'])
  ]

  const coreModule: Module = {
    id: nanoid(),
    title: 'Core JavaScript',
    description: 'Fundamental JavaScript language concepts',
    summary: 'Master JavaScript fundamentals including functions, objects, and modern ES6+ features.',
    createdAt: generateDate(200),
    topics: coreTopics
  }

  const asyncModule: Module = {
    id: nanoid(),
    title: 'Asynchronous JavaScript',
    description: 'Handling async operations and API communication',
    summary: 'Learn to work with promises, async/await, and API integration patterns.',
    createdAt: generateDate(190),
    topics: asyncTopics
  }

  const domModule: Module = {
    id: nanoid(),
    title: 'DOM & Browser APIs',
    description: 'Client-side JavaScript and browser interaction',
    summary: 'Manipulate the DOM, handle events, and utilize browser APIs effectively.',
    createdAt: generateDate(180),
    topics: domTopics
  }

  return {
    id: nanoid(),
    title: 'JavaScript',
    description: 'The programming language of the web',
    summary: 'Comprehensive JavaScript training from basics to advanced concepts including ES6+, async programming, and DOM manipulation.',
    createdAt: generateDate(240),
    topics: [],
    subModules: [coreModule, asyncModule, domModule],
    links: getRandomItems([...sampleLinks.docs, ...sampleLinks.tutorial], 4)
  }
}

export const generateReactModule = (): Module => {
  const fundamentalsTopics: Topic[] = [
    generateTopic('Components & JSX', ['components', 'jsx', 'props', 'composition', 'reusability']),
    generateTopic('State Management', ['useState', 'useReducer', 'state-updates', 'immutability']),
    generateTopic('Effects & Lifecycle', ['useEffect', 'lifecycle', 'cleanup', 'dependencies', 'optimization'])
  ]

  const advancedTopics: Topic[] = [
    generateTopic('Context & Global State', ['context', 'providers', 'global-state', 'prop-drilling']),
    generateTopic('Performance Optimization', ['memo', 'useMemo', 'useCallback', 'profiling', 'lazy-loading']),
    generateTopic('Custom Hooks', ['custom-hooks', 'reusable-logic', 'abstraction', 'testing'])
  ]

  const routingTopics: Topic[] = [
    generateTopic('React Router', ['routing', 'navigation', 'parameters', 'guards', 'lazy-routes']),
    generateTopic('State Management Libraries', ['redux', 'zustand', 'context', 'patterns'])
  ]

  const fundamentalsModule: Module = {
    id: nanoid(),
    title: 'React Fundamentals',
    description: 'Core React concepts and patterns',
    summary: 'Learn React components, hooks, and state management fundamentals.',
    createdAt: generateDate(160),
    topics: fundamentalsTopics
  }

  const advancedModule: Module = {
    id: nanoid(),
    title: 'Advanced React',
    description: 'Performance optimization and advanced patterns',
    summary: 'Master advanced React patterns, optimization techniques, and custom hooks.',
    createdAt: generateDate(150),
    topics: advancedTopics
  }

  const ecosystemModule: Module = {
    id: nanoid(),
    title: 'React Ecosystem',
    description: 'Router, state management, and tooling',
    summary: 'Explore React Router, state management solutions, and the broader React ecosystem.',
    createdAt: generateDate(140),
    topics: routingTopics
  }

  return {
    id: nanoid(),
    title: 'React',
    description: 'A JavaScript library for building user interfaces',
    summary: 'Master React from components and hooks to advanced patterns, optimization, and ecosystem tools.',
    createdAt: generateDate(200),
    topics: [],
    subModules: [fundamentalsModule, advancedModule, ecosystemModule],
    links: getRandomItems([...sampleLinks.docs, ...sampleLinks.github], 3)
  }
}

export const generateToolingModule = (): Module => {
  const topics: Topic[] = [
    generateTopic('Module Bundlers', ['webpack', 'vite', 'rollup', 'bundling', 'optimization']),
    generateTopic('Package Management', ['npm', 'yarn', 'pnpm', 'dependencies', 'semver']),
    generateTopic('Linting & Formatting', ['eslint', 'prettier', 'code-quality', 'standards', 'automation']),
    generateTopic('Build Tools & Scripts', ['build-process', 'scripts', 'automation', 'ci-cd', 'deployment']),
    generateTopic('Development Servers', ['hot-reload', 'dev-servers', 'proxy', 'debugging', 'local-development']),
    generateTopic('Environment Configuration', ['env-variables', 'config', 'environments', 'secrets', 'deployment'])
  ]

  return {
    id: nanoid(),
    title: 'Development Tooling',
    description: 'Modern development tools and build processes',
    summary: 'Set up professional development workflows with modern tooling, build processes, and automation.',
    createdAt: generateDate(120),
    topics,
    links: getRandomItems([...sampleLinks.docs, ...sampleLinks.github], 2)
  }
}

export const generateTestingModule = (): Module => {
  const topics: Topic[] = [
    generateTopic('Unit Testing', ['jest', 'vitest', 'unit-tests', 'mocking', 'assertions']),
    generateTopic('Integration Testing', ['integration-tests', 'api-testing', 'database', 'end-to-end']),
    generateTopic('Component Testing', ['testing-library', 'component-tests', 'user-interactions', 'accessibility']),
    generateTopic('Test-Driven Development', ['tdd', 'red-green-refactor', 'design', 'quality']),
    generateTopic('Performance Testing', ['performance', 'load-testing', 'metrics', 'optimization', 'monitoring'])
  ]

  return {
    id: nanoid(),
    title: 'Testing',
    description: 'Testing strategies and frameworks',
    summary: 'Implement comprehensive testing strategies including unit, integration, and end-to-end testing.',
    createdAt: generateDate(100),
    topics,
    links: getRandomItems(sampleLinks.tutorial, 2)
  }
}

export const generateDeploymentModule = (): Module => {
  const topics: Topic[] = [
    generateTopic('Cloud Platforms', ['aws', 'vercel', 'netlify', 'heroku', 'cloud-deployment']),
    generateTopic('CI/CD Pipelines', ['github-actions', 'ci-cd', 'automation', 'testing', 'deployment']),
    generateTopic('Domain & DNS', ['domains', 'dns', 'ssl', 'certificates', 'custom-domains']),
    generateTopic('Performance Monitoring', ['analytics', 'monitoring', 'performance', 'errors', 'optimization']),
    generateTopic('Security Best Practices', ['https', 'cors', 'csp', 'authentication', 'vulnerabilities']),
    generateTopic('Containerization', ['docker', 'containers', 'images', 'orchestration', 'production'])
  ]

  return {
    id: nanoid(),
    title: 'Deployment & DevOps',
    description: 'Deploying and maintaining web applications',
    summary: 'Learn to deploy, monitor, and maintain web applications using modern cloud platforms and DevOps practices.',
    createdAt: generateDate(80),
    topics,
    links: getRandomItems([...sampleLinks.docs, ...sampleLinks.github], 3)
  }
}

export const generateAdvancedModule = (): Module => {
  const topics: Topic[] = [
    generateTopic('TypeScript', ['typescript', 'types', 'interfaces', 'generics', 'type-safety']),
    generateTopic('Web Performance', ['performance', 'optimization', 'core-web-vitals', 'caching', 'lazy-loading']),
    generateTopic('PWA Development', ['pwa', 'service-workers', 'offline', 'web-app-manifest', 'push-notifications']),
    generateTopic('Web Security', ['owasp', 'xss', 'csrf', 'security-headers', 'authentication']),
    generateTopic('Micro-frontends', ['micro-frontends', 'module-federation', 'architecture', 'scalability'])
  ]

  return {
    id: nanoid(),
    title: 'Advanced Topics',
    description: 'Cutting-edge web development concepts',
    summary: 'Explore advanced topics including TypeScript, performance optimization, PWAs, and modern architecture patterns.',
    createdAt: generateDate(60),
    topics,
    links: getRandomItems([...sampleLinks.docs, ...sampleLinks.tutorial], 3)
  }
}

export const generateRoadmap = (): Roadmap => {
  const modules: Module[] = [
    generateFoundationModule(),
    generateHTMLModule(),
    generateCSSModule(),
    generateJavaScriptModule(),
    generateReactModule(),
    generateToolingModule(),
    generateTestingModule(),
    generateDeploymentModule(),
    generateAdvancedModule()
  ]

  return {
    id: nanoid(),
    title: 'Full-Stack Web Development Roadmap',
    description: 'A comprehensive learning path from beginner to advanced web developer',
    version: '2.0.0',
    modules,
    createdAt: generateDate(365),
    updatedAt: generateDate(1)
  }
}

export const generateUser = (): User => {
  return {
    id: nanoid(),
    name: 'Guest Student',
    email: 'guest@example.com',
    role: 'student',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400',
    joinedAt: generateDate(30)
  }
}

export const generateUserProgress = (roadmap: Roadmap, user: User): UserProgress => {
  const getAllTopics = (modules: Module[]): Topic[] => {
    const topics: Topic[] = []
    
    const extractTopics = (module: Module) => {
      topics.push(...module.topics)
      if (module.subModules) {
        module.subModules.forEach(extractTopics)
      }
    }
    
    modules.forEach(extractTopics)
    return topics
  }

  const allTopics = getAllTopics(roadmap.modules)
  const topicStatuses: Record<string, TopicStatus> = {}
  const completedTopics = new Set<string>()

  allTopics.forEach(topic => {
    topicStatuses[topic.id] = topic.status
    if (topic.status === 'Completed') {
      completedTopics.add(topic.id)
    }
  })

  return {
    userId: user.id,
    roadmapId: roadmap.id,
    completedTopics,
    topicStatuses,
    lastUpdated: new Date().toISOString(),
    settings: {
      useWeightedProgress: false,
      theme: 'system'
    }
  }
}

// Initialize data if not exists
export const initializeData = () => {
  const roadmap = generateRoadmap()
  const user = generateUser()
  const userProgress = generateUserProgress(roadmap, user)

  return {
    roadmap,
    user,
    userProgress
  }
}