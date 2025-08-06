<script setup lang="ts">
import { ref, reactive } from 'vue'
import type { Task } from '@/stores/tasks'
import { useTaskStore } from '@/stores/tasks'

interface Props {
  task?: Task
}

interface Emits {
  (e: 'task-added'): void
  (e: 'task-updated'): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()
const taskStore = useTaskStore()

const formData = reactive({
  title: props.task?.title || '',
  description: props.task?.description || '',
  priority: props.task?.priority || 'medium' as const,
  dueDate: props.task?.dueDate || '',
  category: props.task?.category || 'Work'
})

const errors = ref<Record<string, string>>({})

const categories = ['Work', 'Personal', 'Shopping', 'Health', 'Education', 'Other']

const validateForm = () => {
  errors.value = {}
  
  if (!formData.title.trim()) {
    errors.value.title = 'Title is required'
  }
  
  if (!formData.description.trim()) {
    errors.value.description = 'Description is required'
  }
  
  return Object.keys(errors.value).length === 0
}

const handleSubmit = () => {
  if (!validateForm()) return
  
  if (props.task) {
    // Update existing task
    taskStore.updateTask(props.task.id, {
      title: formData.title.trim(),
      description: formData.description.trim(),
      priority: formData.priority,
      dueDate: formData.dueDate || null,
      category: formData.category
    })
    emit('task-updated')
  } else {
    // Add new task
    taskStore.addTask({
      title: formData.title.trim(),
      description: formData.description.trim(),
      priority: formData.priority,
      dueDate: formData.dueDate || null,
      category: formData.category,
      completed: false
    })
    emit('task-added')
  }
}
</script>

<template>
  <form @submit.prevent="handleSubmit" class="task-form">
    <div class="form-group">
      <label for="title" class="form-label">Title *</label>
      <input
        id="title"
        v-model="formData.title"
        type="text"
        class="form-input"
        :class="{ error: errors.title }"
        placeholder="Enter task title..."
      />
      <span v-if="errors.title" class="error-message">{{ errors.title }}</span>
    </div>

    <div class="form-group">
      <label for="description" class="form-label">Description *</label>
      <textarea
        id="description"
        v-model="formData.description"
        class="form-textarea"
        :class="{ error: errors.description }"
        placeholder="Enter task description..."
        rows="3"
      ></textarea>
      <span v-if="errors.description" class="error-message">{{ errors.description }}</span>
    </div>

    <div class="form-row">
      <div class="form-group">
        <label for="priority" class="form-label">Priority</label>
        <select id="priority" v-model="formData.priority" class="form-select">
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>

      <div class="form-group">
        <label for="category" class="form-label">Category</label>
        <select id="category" v-model="formData.category" class="form-select">
          <option v-for="category in categories" :key="category" :value="category">
            {{ category }}
          </option>
        </select>
      </div>
    </div>

    <div class="form-group">
      <label for="dueDate" class="form-label">Due Date</label>
      <input
        id="dueDate"
        v-model="formData.dueDate"
        type="date"
        class="form-input"
      />
    </div>

    <div class="form-actions">
      <button type="submit" class="submit-btn">
        {{ props.task ? 'Update Task' : 'Add Task' }}
      </button>
    </div>
  </form>
</template>

<style scoped>
.task-form {
  padding: 1.5rem;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.form-label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 600;
  color: #333;
}

.form-input,
.form-textarea,
.form-select {
  width: 100%;
  padding: 0.75rem;
  border: 2px solid #e1e5e9;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.3s ease;
}

.form-input:focus,
.form-textarea:focus,
.form-select:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.form-input.error,
.form-textarea.error {
  border-color: #ff6b6b;
}

.form-textarea {
  resize: vertical;
  min-height: 80px;
}

.error-message {
  display: block;
  color: #ff6b6b;
  font-size: 0.875rem;
  margin-top: 0.25rem;
}

.form-actions {
  margin-top: 2rem;
  text-align: center;
}

.submit-btn {
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
  border: none;
  padding: 0.75rem 2rem;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  min-width: 150px;
}

.submit-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
}

@media (max-width: 768px) {
  .form-row {
    grid-template-columns: 1fr;
  }
}
</style>