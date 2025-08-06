<script setup lang="ts">
import { useTaskStore } from '@/stores/tasks'

const taskStore = useTaskStore()
</script>

<template>
  <div class="task-filters">
    <div class="search-box">
      <input
        v-model="taskStore.searchQuery"
        type="text"
        placeholder="Search tasks..."
        class="search-input"
      />
      <i class="search-icon">🔍</i>
    </div>

    <div class="filter-buttons">
      <button
        @click="taskStore.setFilter('all')"
        :class="['filter-btn', { active: taskStore.filter === 'all' }]"
      >
        All
      </button>
      <button
        @click="taskStore.setFilter('pending')"
        :class="['filter-btn', { active: taskStore.filter === 'pending' }]"
      >
        Pending
      </button>
      <button
        @click="taskStore.setFilter('completed')"
        :class="['filter-btn', { active: taskStore.filter === 'completed' }]"
      >
        Completed
      </button>
    </div>
  </div>
</template>

<style scoped>
.task-filters {
  display: flex;
  gap: 1.5rem;
  margin-bottom: 2rem;
  align-items: center;
  width: 100%;
  flex-wrap: wrap;
}

.search-box {
  position: relative;
  flex: 1;
  min-width: 300px;
}

.search-input {
  width: 100%;
  padding: 0.75rem 1rem 0.75rem 2.5rem;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.9);
  font-size: 1rem;
  transition: all 0.3s ease;
}

.search-input:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.search-icon {
  position: absolute;
  left: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  color: #666;
}

.filter-buttons {
  display: flex;
  gap: 0.5rem;
}

.filter-btn {
  padding: 0.75rem 1rem;
  border: 2px solid rgba(255, 255, 255, 0.3);
  background: rgba(255, 255, 255, 0.7);
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s ease;
}

.filter-btn:hover {
  background: rgba(255, 255, 255, 0.9);
}

.filter-btn.active {
  background: #667eea;
  color: white;
  border-color: #667eea;
}

@media (max-width: 768px) {
  .task-filters {
    flex-direction: column;
    align-items: stretch;
  }

  .search-box {
    max-width: none;
  }

  .filter-buttons {
    justify-content: center;
  }
}
</style>