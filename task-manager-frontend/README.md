# 📋 Task Manager - Vue.js Frontend

A modern, responsive task management application built with Vue.js 3, TypeScript, and Pinia for state management.

## ✨ Features

- **Task Management**: Create, edit, delete, and mark tasks as complete
- **Priority Levels**: Set tasks as low, medium, or high priority
- **Categories**: Organize tasks by categories (Work, Personal, Shopping, etc.)
- **Search & Filter**: Search tasks and filter by status (All, Pending, Completed)
- **Due Dates**: Set and track task due dates
- **Responsive Design**: Works perfectly on desktop and mobile devices
- **Modern UI**: Beautiful gradient backgrounds and smooth animations

## 🚀 Getting Started

### Prerequisites

- Node.js 18.0 or higher
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd task-manager-frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## 🛠️ Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run type-check` - Run TypeScript type checking
- `npm run lint` - Run ESLint

## 📱 Usage

### Adding a Task
1. Click the "Add New Task" button
2. Fill in the task details:
   - Title (required)
   - Description (required)
   - Priority level
   - Category
   - Due date (optional)
3. Click "Add Task" to save

### Managing Tasks
- **Complete Task**: Click the "Mark Complete" button on any task card
- **Edit Task**: Click the pencil icon (✏️) to edit task details
- **Delete Task**: Click the trash icon (🗑️) to delete a task
- **Search**: Use the search box to find specific tasks
- **Filter**: Use the filter buttons to show All, Pending, or Completed tasks

## 🏗️ Project Structure

```
src/
├── components/          # Reusable Vue components
│   ├── TaskCard.vue    # Individual task display
│   ├── TaskForm.vue    # Task creation/editing form
│   ├── TaskList.vue    # Task list container
│   ├── TaskStats.vue   # Dashboard statistics
│   └── TaskFilters.vue # Search and filter controls
├── stores/             # Pinia state management
│   └── tasks.ts        # Task store with state and actions
├── services/           # API services
│   └── api.ts          # Mock API service (ready for Laravel integration)
├── views/              # Page components
│   └── HomeView.vue    # Main dashboard view
└── router/             # Vue Router configuration
    └── index.ts        # Route definitions
```

## 🌐 Deployment

### Vercel Deployment

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Deploy to Vercel:
```bash
vercel --prod
```

The application is configured with `vercel.json` for optimal deployment.

### Manual Deployment

1. Build the application:
```bash
npm run build
```

2. Deploy the `dist/` folder to your hosting provider

## 🔗 Laravel Backend Integration

This frontend is designed to work with a Laravel backend API. The mock API service (`src/services/api.ts`) includes:

- Sample API endpoints documentation
- Local storage fallback for development
- Ready-to-use methods for Laravel integration

### Expected Laravel API Endpoints:

- `GET /api/tasks` - Get all tasks
- `POST /api/tasks` - Create new task
- `PUT /api/tasks/{id}` - Update task
- `DELETE /api/tasks/{id}` - Delete task

## 🎨 Customization

### Styling
The application uses scoped CSS with CSS variables for easy customization. Main colors can be adjusted in the component styles.

### Adding Features
- Add new task properties in `src/stores/tasks.ts`
- Create new components in `src/components/`
- Extend the API service in `src/services/api.ts`

## 🐛 Troubleshooting

### Node.js Version Issues
If you encounter build errors, ensure you're using Node.js 18 or higher:
```bash
node --version
```

### Port Already in Use
If port 5173 is busy, Vite will automatically use the next available port.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

---

**Happy Task Managing! 🎉**