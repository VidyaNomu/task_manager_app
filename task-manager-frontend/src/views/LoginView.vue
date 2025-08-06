<script setup lang="ts">
import { RouterLink } from 'vue-router'
import LoginForm from '@/components/LoginForm.vue'
</script>

<template>
  <div class="auth-page">
    <div class="auth-container">
      <LoginForm />
      
      <div class="auth-footer">
        <p>Don't have an account? 
          <RouterLink to="/register" class="auth-link">
            Sign up here
          </RouterLink>
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.auth-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.auth-container {
  width: 100%;
  max-width: 500px;
}

.auth-footer {
  text-align: center;
  margin-top: 2rem;
}

.auth-footer p {
  color: rgba(255, 255, 255, 0.9);
  font-size: 1rem;
}

.auth-link {
  color: #ffffff;
  text-decoration: none;
  font-weight: 600;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  transition: all 0.3s ease;
}

.auth-link:hover {
  background: rgba(255, 255, 255, 0.1);
  text-decoration: underline;
}

@media (max-width: 768px) {
  .auth-page {
    padding: 1rem;
  }
}
</style>