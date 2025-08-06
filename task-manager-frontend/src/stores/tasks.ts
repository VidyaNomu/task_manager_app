import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export interface Task {
  id: string
  title: string
  description: string
  completed: boolean
  priority: 'low' | 'medium' | 'high'
  dueDate: string | null
  createdAt: string
  category: string
}

export const useTaskStore = defineStore('tasks', () => {
  const tasks = ref<Task[]>([
    {
      id: '1',
      title: 'Complete project documentation',
      description: 'Write comprehensive documentation for the task manager app',
      completed: false,
      priority: 'high',
      dueDate: '2025-01-15',
      createdAt: '2025-01-06',
      category: 'Work'
    },
    {
      id: '2',
      title: 'Review code changes',
      description: 'Review and approve pending pull requests',
      completed: true,
      priority: 'medium',
      dueDate: '2025-01-10',
      createdAt: '2025-01-05',
      category: 'Work'
    },
    {
      id: '3',
      title: 'Buy groceries',
      description: 'Get ingredients for weekend cooking',
      completed: false,
      priority: 'low',
      dueDate: '2025-01-08',
      createdAt: '2025-01-06',
      category: 'Personal'
    }
  ])

  const filter = ref<'all' | 'pending' | 'completed'>('all')
  const searchQuery = ref('')

  // Computed properties
  const filteredTasks = computed(() => {
    let filtered = tasks.value

    // Apply search filter
    if (searchQuery.value) {
      filtered = filtered.filter(task =>
        task.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        task.description.toLowerCase().includes(searchQuery.value.toLowerCase())
      )
    }

    // Apply status filter
    switch (filter.value) {
      case 'pending':
        return filtered.filter(task => !task.completed)
      case 'completed':
        return filtered.filter(task => task.completed)
      default:
        return filtered
    }
  })

  const taskStats = computed(() => ({
    total: tasks.value.length,
    completed: tasks.value.filter(task => task.completed).length,
    pending: tasks.value.filter(task => !task.completed).length,
    highPriority: tasks.value.filter(task => task.priority === 'high' && !task.completed).length
  }))

  // Actions
  const addTask = (taskData: Omit<Task, 'id' | 'createdAt'>) => {
    const newTask: Task = {
      ...taskData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString().split('T')[0]
    }
    tasks.value.unshift(newTask)
  }

  const updateTask = (id: string, updates: Partial<Task>) => {
    const index = tasks.value.findIndex(task => task.id === id)
    if (index !== -1) {
      tasks.value[index] = { ...tasks.value[index], ...updates }
    }
  }

  const deleteTask = (id: string) => {
    const index = tasks.value.findIndex(task => task.id === id)
    if (index !== -1) {
      tasks.value.splice(index, 1)
    }
  }

  const toggleTaskCompletion = (id: string) => {
    const task = tasks.value.find(task => task.id === id)
    if (task) {
      task.completed = !task.completed
    }
  }

  const setFilter = (newFilter: 'all' | 'pending' | 'completed') => {
    filter.value = newFilter
  }

  const setSearchQuery = (query: string) => {
    searchQuery.value = query
  }

  return {
    tasks,
    filter,
    searchQuery,
    filteredTasks,
    taskStats,
    addTask,
    updateTask,
    deleteTask,
    toggleTaskCompletion,
    setFilter,
    setSearchQuery
  }
})