<script setup lang="ts">
import { ref } from 'vue'
import { useTaskStore } from '@/stores/tasks'
import TaskList from '@/components/TaskList.vue'
import TaskForm from '@/components/TaskForm.vue'
import TaskStats from '@/components/TaskStats.vue'
import TaskFilters from '@/components/TaskFilters.vue'

const taskStore = useTaskStore()
const showAddForm = ref(false)

const openAddForm = () => {
  showAddForm.value = true
}

const closeAddForm = () => {
  showAddForm.value = false
}
</script>

<template>
  <div class="home-view">
    <!-- Header with stats -->
    <div class="dashboard-header">
      <TaskStats />
      <button @click="openAddForm" class="add-task-btn">
        <i class="icon">➕</i>
        Add New Task
      </button>
    </div>

    <!-- Filters and search -->
    <TaskFilters />

    <!-- Task Form Modal -->
    <div v-if="showAddForm" class="modal-overlay" @click="closeAddForm">
      <div class="modal-content" @click.stop>
        <div class="modal-header">
          <h2>Add New Task</h2>
          <button @click="closeAddForm" class="close-btn">✕</button>
        </div>
        <TaskForm @task-added="closeAddForm" />
      </div>
    </div>

    <!-- Task List -->
    <TaskList />
  </div>
</template>

<style scoped>
.home-view {
  width: 100%;
  padding: 0 2rem;
  margin: 0 auto;
}

.dashboard-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 2rem;
  gap: 2rem;
  flex-wrap: wrap;
}

.add-task-btn {
  background: linear-gradient(135deg, #4CAF50, #45a049);
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(76, 175, 80, 0.3);
}

.add-task-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(76, 175, 80, 0.4);
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

@media (max-width: 768px) {
  .home-view {
    padding: 0 1rem;
  }
  
  .dashboard-header {
    flex-direction: column;
    align-items: stretch;
    gap: 1.5rem;
    margin-bottom: 1.5rem;
  }

  .add-task-btn {
    justify-content: center;
    padding: 1rem 2rem;
    font-size: 1.1rem;
  }
}

@media (max-width: 480px) {
  .home-view {
    padding: 0 0.75rem;
  }
  
  .dashboard-header {
    gap: 1rem;
    margin-bottom: 1rem;
  }
  
  .add-task-btn {
    padding: 0.875rem 1.5rem;
    font-size: 1rem;
  }
}
</style>