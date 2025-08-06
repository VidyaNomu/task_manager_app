<script setup lang="ts">
import { ref } from 'vue'
import type { Task } from '@/stores/tasks'
import { useTaskStore } from '@/stores/tasks'
import TaskForm from './TaskForm.vue'

interface Props {
  task: Task
}

const props = defineProps<Props>()
const taskStore = useTaskStore()
const showEditForm = ref(false)

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case 'high': return '#ff6b6b'
    case 'medium': return '#ffa726'
    case 'low': return '#66bb6a'
    default: return '#9e9e9e'
  }
}

const getCategoryIcon = (category: string) => {
  switch (category.toLowerCase()) {
    case 'work': return '💼'
    case 'personal': return '👤'
    case 'shopping': return '🛒'
    case 'health': return '💊'
    case 'education': return '📚'
    case 'finance': return '💰'
    case 'travel': return '✈️'
    case 'home': return '🏠'
    default: return '📝'
  }
}

const formatDate = (date: string | null) => {
  if (!date) return 'No due date'
  return new Date(date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  })
}

const toggleComplete = () => {
  taskStore.toggleTaskCompletion(props.task.id)
}

const deleteTask = () => {
  if (confirm('Are you sure you want to delete this task?')) {
    taskStore.deleteTask(props.task.id)
  }
}

const openEditForm = () => {
  showEditForm.value = true
}

const closeEditForm = () => {
  showEditForm.value = false
}
</script>

<template>
  <div 
    class="task-card" 
    :class="{ completed: task.completed }"
    :style="{ '--priority-color': getPriorityColor(task.priority) }"
  >
    <div class="task-header">
      <div class="task-priority" :style="{ backgroundColor: getPriorityColor(task.priority) }">
        {{ task.priority.toUpperCase() }}
      </div>
      <div class="task-actions">
        <button @click="openEditForm" class="action-btn edit-btn" title="Edit">
          ✏️
        </button>
        <button @click="deleteTask" class="action-btn delete-btn" title="Delete">
          🗑️
        </button>
      </div>
    </div>

    <div class="task-content">
      <div class="task-icon-wrapper">
        <div class="task-icon" :style="{ backgroundColor: getPriorityColor(task.priority) }">
          {{ getCategoryIcon(task.category) }}
        </div>
      </div>
      
      <h3 class="task-title" :class="{ completed: task.completed }">
        {{ task.title }}
      </h3>
      <p class="task-description">{{ task.description }}</p>
      
      <div class="task-meta">
        <div class="meta-item">
          <span class="meta-icon">📁</span>
          <span class="meta-text">{{ task.category }}</span>
        </div>
        <div class="meta-item">
          <span class="meta-icon">📅</span>
          <span class="meta-text">{{ formatDate(task.dueDate) }}</span>
        </div>
      </div>
    </div>

    <div class="task-footer">
      <button @click="toggleComplete" class="complete-btn" :class="{ completed: task.completed }">
        <span class="checkbox">{{ task.completed ? '✅' : '⬜' }}</span>
        {{ task.completed ? 'Completed' : 'Mark Complete' }}
      </button>
    </div>

    <!-- Edit Modal -->
    <div v-if="showEditForm" class="modal-overlay" @click="closeEditForm">
      <div class="modal-content" @click.stop>
        <div class="modal-header">
          <h2>Edit Task</h2>
          <button @click="closeEditForm" class="close-btn">✕</button>
        </div>
        <TaskForm :task="task" @task-updated="closeEditForm" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.task-card {
  background: rgba(255, 255, 255, 0.98);
  border-radius: 20px;
  padding: 0;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  border: 1px solid rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(10px);
  overflow: hidden;
  position: relative;
}

.task-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: var(--priority-color);
  opacity: 0.8;
}

.task-card:hover {
  transform: translateY(-8px) scale(1.02);
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
}

.task-card.completed {
  opacity: 0.8;
  background: rgba(248, 250, 252, 0.95);
}

.task-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.25rem 1.5rem 0;
  margin-bottom: 0;
}

.task-priority {
  background: linear-gradient(135deg, var(--priority-color), var(--priority-color)dd);
  color: white;
  padding: 0.4rem 1rem;
  border-radius: 25px;
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}

.task-actions {
  display: flex;
  gap: 0.5rem;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.task-card:hover .task-actions {
  opacity: 1;
}

.action-btn {
  background: rgba(255, 255, 255, 0.8);
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 12px;
  font-size: 1rem;
  transition: all 0.2s ease;
  backdrop-filter: blur(10px);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.action-btn:hover {
  background: rgba(255, 255, 255, 0.95);
  transform: scale(1.1);
}

.task-content {
  padding: 1.5rem;
  margin-bottom: 0;
}

.task-icon-wrapper {
  display: flex;
  justify-content: center;
  margin-bottom: 1rem;
}

.task-icon {
  width: 60px;
  height: 60px;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.8rem;
  color: white;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
  margin-bottom: 1rem;
}

.task-title {
  font-size: 1.4rem;
  font-weight: 700;
  margin-bottom: 0.75rem;
  color: #1a202c;
  text-align: center;
  transition: all 0.3s ease;
  line-height: 1.3;
}

.task-title.completed {
  text-decoration: line-through;
  color: #a0aec0;
}

.task-description {
  color: #4a5568;
  line-height: 1.6;
  margin-bottom: 1.5rem;
  text-align: center;
  font-size: 0.95rem;
}

.task-meta {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 1rem;
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 0.75rem;
  background: rgba(0, 0, 0, 0.05);
  border-radius: 12px;
  flex: 1;
  justify-content: center;
}

.meta-icon {
  font-size: 1rem;
}

.meta-text {
  font-size: 0.85rem;
  font-weight: 600;
  color: #4a5568;
}

.task-footer {
  padding: 0 1.5rem 1.5rem;
}

.complete-btn {
  background: linear-gradient(135deg, #10b981, #059669);
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 16px;
  cursor: pointer;
  font-weight: 700;
  font-size: 1rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  width: 100%;
  justify-content: center;
  box-shadow: 0 4px 20px rgba(16, 185, 129, 0.3);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.complete-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 30px rgba(16, 185, 129, 0.4);
  background: linear-gradient(135deg, #059669, #047857);
}

.complete-btn.completed {
  background: linear-gradient(135deg, #6b7280, #4b5563);
  box-shadow: 0 4px 20px rgba(107, 114, 128, 0.3);
}

.complete-btn.completed:hover {
  box-shadow: 0 8px 30px rgba(107, 114, 128, 0.4);
}

.checkbox {
  font-size: 1.3rem;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 1rem;
}

.modal-content {
  background: white;
  border-radius: 12px;
  width: 100%;
  max-width: 500px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  border-bottom: 1px solid #eee;
}

.modal-header h2 {
  margin: 0;
  color: #333;
}

.close-btn {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #666;
  padding: 0.25rem;
  border-radius: 4px;
}

.close-btn:hover {
  background: #f5f5f5;
  color: #333;
}
</style>