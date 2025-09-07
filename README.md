# Student Learning Roadmap Dashboard

A comprehensive React + TypeScript dashboard for tracking student learning progress through structured roadmaps with nested modules and topics.

## ✨ Features

- **📚 Interactive Roadmap**: Collapsible tree structure supporting infinite nesting of modules and sub-modules
- **📊 Progress Tracking**: Real-time progress updates with both simple and weighted calculation modes
- **🎯 Topic Management**: Complete status tracking (Future → Now → Completed) for all topics
- **📈 Analytics Dashboard**: Visual progress charts and statistics using Recharts
- **🎨 Modern UI**: Professional design with dark/light mode support using shadcn/ui
- **💾 Data Persistence**: Local storage with export/import capabilities
- **🔍 Advanced Filtering**: Search and filter across nested structures
- **👥 Multi-role Support**: Student and mentor views with different capabilities

## 🛠 Tech Stack

- **Framework**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS + shadcn/ui components
- **State Management**: Zustand with localStorage persistence
- **Animations**: Framer Motion for smooth transitions
- **Charts**: Recharts for progress visualization
- **Forms**: React Hook Form + Zod validation
- **Data Generation**: Programmatic mock data with nanoid

## 🚀 Getting Started

### Prerequisites

- Node.js 16+ 
- npm, yarn, or pnpm

### Installation

1. Clone and install dependencies:
```bash
git clone <repository-url>
cd student-roadmap-dashboard
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser to `http://localhost:5173`

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # shadcn/ui base components
│   ├── layout/         # Header, Sidebar components
│   ├── dashboard/      # Dashboard-specific components
│   └── roadmap/        # Roadmap tree and filters
├── pages/              # Page components
├── store/              # Zustand state management
├── data/               # Data types and generator
├── lib/                # Utility functions
└── App.tsx            # Main application component
```

## 🗄 Data Structure

The roadmap supports recursive nesting:

```typescript
interface Module {
  id: string
  title: string
  topics: Topic[]
  subModules?: Module[]  // Infinite nesting support
}

interface Topic {
  id: string
  title: string
  status: 'Future' | 'Now' | 'Completed'
  estimatedHours: number
  keywords: string[]
}
```

## 📊 Data Generation

The app includes a sophisticated data generator (`src/data/generator.ts`) that creates:

- **9 top-level modules**: Foundation → HTML → CSS → JavaScript → React → Tooling → Testing → Deployment → Advanced
- **Nested sub-modules**: Up to 3 levels deep with realistic learning paths
- **Rich topic data**: 150+ topics with keywords, descriptions, and estimated hours
- **Realistic metadata**: Links, creation dates, and professional descriptions

### Regenerating Data

To reset and regenerate all mock data:
1. Go to Dashboard
2. Click "Reset Progress" button
3. Confirm the action

## 🎮 Key Features

### Roadmap Navigation
- **Collapsible Tree**: Smooth expand/collapse animations for module hierarchy
- **Smart Filtering**: Search across all nested content with status filters
- **Progress Indicators**: Visual progress bars for each module and overall completion

### Progress Calculation
- **Simple Mode**: Percentage based on completed topic count
- **Weighted Mode**: Percentage based on estimated hours (toggle in Dashboard)
- **Real-time Updates**: Progress updates immediately when topic status changes

### Dashboard Analytics
- **Statistics Cards**: Overview of progress, topics, and learning hours  
- **Progress Charts**: Historical learning trends and module completion rates
- **Recent Activity**: Latest topic updates and system announcements

### Multi-role Support
- **Student View**: Full learning dashboard with progress tracking
- **Mentor View**: Student management, messaging, and analytics (role-based access)

## 🔧 Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production  
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

## 💾 Data Management

### Local Storage
- Progress data persists automatically
- Settings and preferences saved
- Survives browser refreshes

### Export/Import
- Export progress as JSON file
- Import data to restore or transfer progress
- Full backup of roadmap state and user progress

### Reset Options
- Reset all progress while keeping roadmap structure
- Regenerate fresh mock data
- Maintain user preferences

## 🎨 Theming

Supports three theme modes:
- **Light**: Clean, professional appearance
- **Dark**: Eye-friendly dark mode
- **System**: Follows OS preference

Theme persists across sessions and applies immediately.

## 📱 Responsive Design

- **Mobile-first**: Optimized for all screen sizes
- **Tablet Support**: Responsive grid layouts
- **Desktop**: Full-featured experience

## 🧪 Development

The application uses modern React patterns:

- **Hooks**: Custom hooks for data management
- **TypeScript**: Full type safety throughout
- **Component Composition**: Reusable, modular components
- **Performance**: Optimized rendering and state updates

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make changes following the existing patterns
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.