<script setup lang="ts">
import { RouterView } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()

const handleLogout = () => {
  authStore.logout()
}
</script>

<template>
  <div id="app">
    <header v-if="authStore.isAuthenticated" class="app-header">
      <div class="container">
        <div class="header-content">
          <h1 class="app-title">
            <i class="icon">📋</i>
            Task Manager
          </h1>
          
          <div class="user-menu">
            <div class="user-info">
              <img 
                :src="authStore.user?.avatar" 
                :alt="authStore.userName"
                class="user-avatar"
              />
              <span class="user-name">{{ authStore.userName }}</span>
            </div>
            <button @click="handleLogout" class="logout-btn">
              Logout 🚪
            </button>
          </div>
        </div>
      </div>
    </header>

    <main class="main-content">
      <div class="container">
        <RouterView />
      </div>
    </main>
  </div>
</template>

<style scoped>
#app {
  min-height: 100vh;
  width: 100%;
}

.app-header {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  padding: 1.5rem 0;
  position: sticky;
  top: 0;
  z-index: 100;
  width: 100%;
}

.container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 2rem;
  width: 100%;
}

.header-content {
  display: flex;
  align-items: center;
  width: 100%;
  position: relative;
}

.app-title {
  color: white;
  font-size: 2.5rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
}

.user-menu {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-left: auto;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: white;
}

.user-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 2px solid rgba(255, 255, 255, 0.3);
  object-fit: cover;
}

.user-name {
  font-weight: 600;
  font-size: 1rem;
}

.logout-btn {
  background: rgba(255, 255, 255, 0.1);
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.3);
  padding: 0.5rem 1rem;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
}

.logout-btn:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: translateY(-1px);
}

.icon {
  font-size: 3rem;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3));
}

.main-content {
  padding: 2rem 0;
  min-height: calc(100vh - 120px);
  width: 100%;
}

@media (max-width: 768px) {
  .container {
    padding: 0 1rem;
  }
  
  .header-content {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
  }
  
  .app-title {
    font-size: 2rem;
  }
  
  .icon {
    font-size: 2.5rem;
  }
  
  .user-menu {
    flex-direction: column;
    gap: 0.5rem;
  }
  
  .main-content {
    padding: 1rem 0;
  }
}

@media (max-width: 480px) {
  .container {
    padding: 0 0.75rem;
  }
  
  .app-title {
    font-size: 1.75rem;
  }
  
  .icon {
    font-size: 2rem;
  }
  
  .app-header {
    padding: 1rem 0;
  }
}
</style>