<script setup lang="ts">
import { useTaskStore } from '@/stores/tasks'

const taskStore = useTaskStore()
</script>

<template>
  <div class="task-stats">
    <div class="stat-card total">
      <div class="stat-icon-bg total-bg">
        <div class="stat-icon-text">📋</div>
      </div>
      <div class="stat-number">{{ taskStore.taskStats.total }}</div>
      <div class="stat-label">Total Tasks</div>
    </div>
    <div class="stat-card pending">
      <div class="stat-icon-bg pending-bg">
        <div class="stat-icon-text">⏰</div>
      </div>
      <div class="stat-number">{{ taskStore.taskStats.pending }}</div>
      <div class="stat-label">Pending</div>
    </div>
    <div class="stat-card completed">
      <div class="stat-icon-bg completed-bg">
        <div class="stat-icon-text">✓</div>
      </div>
      <div class="stat-number">{{ taskStore.taskStats.completed }}</div>
      <div class="stat-label">Completed</div>
    </div>
    <div class="stat-card priority">
      <div class="stat-icon-bg priority-bg">
        <div class="stat-icon-text">!</div>
      </div>
      <div class="stat-number">{{ taskStore.taskStats.highPriority }}</div>
      <div class="stat-label">High Priority</div>
    </div>
  </div>
</template>

<style scoped>
.task-stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
  width: 100%;
}

.stat-card {
  background: linear-gradient(135deg, #a8edea, #fed6e3);  /* Cool gradient */
  padding: 1rem 1rem;
  border-radius: 10px;
  text-align: center;
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  border: 2px solid #ffffff;
  min-height: 100px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: hidden;
}

.stat-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 6px;
  background: linear-gradient(90deg, #667eea, #764ba2);
}

.stat-card:hover {
  transform: translateY(-8px) scale(1.02);
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
}

.stat-card.total::before {
  background: linear-gradient(90deg, #667eea, #764ba2);
}

.stat-card.pending::before {
  background: linear-gradient(90deg, #ffa726, #ff9800);
}

.stat-card.completed::before {
  background: linear-gradient(90deg, #66bb6a, #4caf50);
}

.stat-card.priority {
  background: linear-gradient(135deg, #ff6b6b, #ee5a52);
  color: rgb(255, 255, 255);
  box-shadow: 0 8px 32px rgba(255, 107, 107, 0.3);
}

.stat-card.priority .stat-number {
  color: white;
}

.stat-card.priority::before {
  background: linear-gradient(90deg, #ff5252, #f44336);
}

.stat-card.priority:hover {
  box-shadow: 0 20px 60px rgba(255, 107, 107, 0.4);
}

.stat-icon-bg {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1rem;
}

.stat-icon-text {
  font-size: 2rem;
  font-weight: bold;
  color: #333;
  text-shadow: none;
}

/* Background classes removed - no backgrounds needed */

.stat-number {
  font-size: 3rem;
  font-weight: 900;
  margin-bottom: 0.5rem;
  line-height: 1;
  color: #000000;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}

.stat-label {
  font-size: 1.1rem;
  opacity: 1;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.8px;
  color: #2d3748;
}

@media (max-width: 768px) {
  .task-stats {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>