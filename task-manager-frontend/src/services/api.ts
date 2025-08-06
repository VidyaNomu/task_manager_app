import type { Task } from '@/stores/tasks'

// API service that connects to Laravel backend
class ApiService {
  private baseUrl = 'http://localhost:8000/api'
  private useMockData = false // Set to false to use Laravel API

  private delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

  // Check if Laravel API is available
  private async checkApiHealth(): Promise<boolean> {
    try {
      const response = await fetch(`${this.baseUrl}/tasks`)
      return response.ok
    } catch (error) {
      console.log('Laravel API not available, using localStorage')
      return false
    }
  }

  // Get tasks from Laravel API or localStorage fallback
  async getTasks(): Promise<Task[]> {
    if (this.useMockData || !(await this.checkApiHealth())) {
      // Fallback to localStorage
      await this.delay(500)
      const storedTasks = localStorage.getItem('tasks')
      return storedTasks ? JSON.parse(storedTasks) : []
    }

    try {
      const response = await fetch(`${this.baseUrl}/tasks`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      return data.data || []
    } catch (error) {
      console.error('Error fetching tasks from Laravel API:', error)
      // Fallback to localStorage
      const storedTasks = localStorage.getItem('tasks')
      return storedTasks ? JSON.parse(storedTasks) : []
    }
  }

  async createTask(task: Omit<Task, 'id' | 'createdAt'>): Promise<Task> {
    if (this.useMockData || !(await this.checkApiHealth())) {
      // Fallback to localStorage
      await this.delay(300)
      const newTask: Task = {
        ...task,
        id: Date.now().toString(),
        createdAt: new Date().toISOString().split('T')[0]
      }
      
      const tasks = await this.getTasks()
      tasks.unshift(newTask)
      localStorage.setItem('tasks', JSON.stringify(tasks))
      
      return newTask
    }

    try {
      const response = await fetch(`${this.baseUrl}/tasks`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          title: task.title,
          description: task.description,
          priority: task.priority,
          due_date: task.dueDate,
          category: task.category,
        }),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      return {
        id: data.data.id.toString(),
        title: data.data.title,
        description: data.data.description,
        completed: data.data.completed,
        priority: data.data.priority,
        dueDate: data.data.due_date,
        category: data.data.category,
        createdAt: data.data.created_at.split('T')[0]
      }
    } catch (error) {
      console.error('Error creating task via Laravel API:', error)
      // Fallback to localStorage
      return this.createTask(task)
    }
  }

  async updateTask(id: string, updates: Partial<Task>): Promise<Task> {
    if (this.useMockData || !(await this.checkApiHealth())) {
      // Fallback to localStorage
      await this.delay(300)
      const tasks = await this.getTasks()
      const index = tasks.findIndex(task => task.id === id)
      
      if (index === -1) {
        throw new Error('Task not found')
      }
      
      tasks[index] = { ...tasks[index], ...updates }
      localStorage.setItem('tasks', JSON.stringify(tasks))
      
      return tasks[index]
    }

    try {
      const response = await fetch(`${this.baseUrl}/tasks/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          title: updates.title,
          description: updates.description,
          completed: updates.completed,
          priority: updates.priority,
          due_date: updates.dueDate,
          category: updates.category,
        }),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      return {
        id: data.data.id.toString(),
        title: data.data.title,
        description: data.data.description,
        completed: data.data.completed,
        priority: data.data.priority,
        dueDate: data.data.due_date,
        category: data.data.category,
        createdAt: data.data.created_at.split('T')[0]
      }
    } catch (error) {
      console.error('Error updating task via Laravel API:', error)
      // Fallback to localStorage
      return this.updateTask(id, updates)
    }
  }

  async deleteTask(id: string): Promise<void> {
    if (this.useMockData || !(await this.checkApiHealth())) {
      // Fallback to localStorage
      await this.delay(300)
      const tasks = await this.getTasks()
      const filteredTasks = tasks.filter(task => task.id !== id)
      localStorage.setItem('tasks', JSON.stringify(filteredTasks))
      return
    }

    try {
      const response = await fetch(`${this.baseUrl}/tasks/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
    } catch (error) {
      console.error('Error deleting task via Laravel API:', error)
      // Fallback to localStorage
      await this.deleteTask(id)
    }
  }

  // Method to sync with actual Laravel API when available
  async syncWithLaravel(): Promise<void> {
    try {
      // This would be the actual API call to Laravel
      const response = await fetch(`${this.baseUrl}/tasks`)
      if (response.ok) {
        const tasks = await response.json()
        localStorage.setItem('tasks', JSON.stringify(tasks))
      }
    } catch (error) {
      console.log('Laravel API not available, using local storage')
    }
  }
}

export const apiService = new ApiService()

// Laravel API endpoints documentation
export const laravelEndpoints = {
  // GET /api/tasks - Get all tasks
  // POST /api/tasks - Create new task
  // PUT /api/tasks/{id} - Update task
  // DELETE /api/tasks/{id} - Delete task
  // GET /api/tasks/{id} - Get single task
  
  // Example Laravel controller methods:
  /*
  class TaskController extends Controller
  {
      public function index()
      {
          return Task::all();
      }
      
      public function store(Request $request)
      {
          $validated = $request->validate([
              'title' => 'required|string|max:255',
              'description' => 'required|string',
              'priority' => 'required|in:low,medium,high',
              'due_date' => 'nullable|date',
              'category' => 'required|string'
          ]);
          
          return Task::create($validated);
      }
      
      public function update(Request $request, Task $task)
      {
          $validated = $request->validate([
              'title' => 'string|max:255',
              'description' => 'string',
              'priority' => 'in:low,medium,high',
              'due_date' => 'nullable|date',
              'category' => 'string',
              'completed' => 'boolean'
          ]);
          
          $task->update($validated);
          return $task;
      }
      
      public function destroy(Task $task)
      {
          $task->delete();
          return response()->noContent();
      }
  }
  */
}