<script setup lang="ts">
import { useTaskStore } from '@/stores/tasks'
import TaskCard from './TaskCard.vue'

const taskStore = useTaskStore()
</script>

<template>
  <div class="task-list">
    <div v-if="taskStore.filteredTasks.length === 0" class="empty-state">
      <div class="empty-icon">📝</div>
      <h3>No tasks found</h3>
      <p>{{ taskStore.searchQuery ? 'Try adjusting your search terms' : 'Create your first task to get started!' }}</p>
    </div>

    <div v-else class="tasks-grid">
      <TaskCard
        v-for="task in taskStore.filteredTasks"
        :key="task.id"
        :task="task"
      />
    </div>
  </div>
</template>

<style scoped>
.task-list {
  margin-top: 1rem;
}

.empty-state {
  text-align: center;
  padding: 3rem 1rem;
  color: white;
  opacity: 0.8;
}

.empty-icon {
  font-size: 4rem;
  margin-bottom: 1rem;
}

.empty-state h3 {
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
}

.empty-state p {
  font-size: 1rem;
  opacity: 0.7;
}

.tasks-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 2rem;
  width: 100%;
}

@media (max-width: 1200px) {
  .tasks-grid {
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  }
}

@media (max-width: 768px) {
  .tasks-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
}

@media (max-width: 480px) {
  .tasks-grid {
    gap: 1rem;
  }
}
</style>