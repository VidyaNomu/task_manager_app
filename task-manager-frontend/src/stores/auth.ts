import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export interface User {
  id: string
  name: string
  email: string
  avatar?: string
  createdAt: string
}

export interface LoginCredentials {
  email: string
  password: string
}

export interface RegisterData {
  name: string
  email: string
  password: string
  confirmPassword: string
}

export const useAuthStore = defineStore('auth', () => {
  // State
  const user = ref<User | null>(null)
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  // Computed
  const isAuthenticated = computed(() => !!user.value)
  const userName = computed(() => user.value?.name || 'Guest')
  const userEmail = computed(() => user.value?.email || '')

  // Actions
  const login = async (credentials: LoginCredentials): Promise<boolean> => {
    isLoading.value = true
    error.value = null

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000))

      // Mock authentication - in real app, this would be an API call
      if (credentials.email && credentials.password) {
        // Mock user data
        const mockUser: User = {
          id: '1',
          name: credentials.email.split('@')[0],
          email: credentials.email,
          avatar: `https://ui-avatars.com/api/?name=${credentials.email.split('@')[0]}&background=667eea&color=fff`,
          createdAt: new Date().toISOString()
        }

        user.value = mockUser
        
        // Store in localStorage for persistence
        localStorage.setItem('user', JSON.stringify(mockUser))
        localStorage.setItem('isAuthenticated', 'true')
        
        return true
      } else {
        error.value = 'Invalid credentials'
        return false
      }
    } catch (err) {
      error.value = 'Login failed. Please try again.'
      return false
    } finally {
      isLoading.value = false
    }
  }

  const register = async (data: RegisterData): Promise<boolean> => {
    isLoading.value = true
    error.value = null

    try {
      // Validate passwords match
      if (data.password !== data.confirmPassword) {
        error.value = 'Passwords do not match'
        return false
      }

      // Validate password strength
      if (data.password.length < 6) {
        error.value = 'Password must be at least 6 characters'
        return false
      }

      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000))

      // Mock registration - in real app, this would be an API call
      const mockUser: User = {
        id: Date.now().toString(),
        name: data.name,
        email: data.email,
        avatar: `https://ui-avatars.com/api/?name=${data.name}&background=667eea&color=fff`,
        createdAt: new Date().toISOString()
      }

      user.value = mockUser
      
      // Store in localStorage for persistence
      localStorage.setItem('user', JSON.stringify(mockUser))
      localStorage.setItem('isAuthenticated', 'true')
      
      return true
    } catch (err) {
      error.value = 'Registration failed. Please try again.'
      return false
    } finally {
      isLoading.value = false
    }
  }

  const logout = () => {
    user.value = null
    error.value = null
    
    // Clear localStorage
    localStorage.removeItem('user')
    localStorage.removeItem('isAuthenticated')
  }

  const initializeAuth = () => {
    // Check if user is already logged in
    const storedUser = localStorage.getItem('user')
    const isAuth = localStorage.getItem('isAuthenticated')
    
    if (storedUser && isAuth === 'true') {
      user.value = JSON.parse(storedUser)
    }
  }

  const clearError = () => {
    error.value = null
  }

  // Initialize auth state on store creation
  initializeAuth()

  return {
    // State
    user,
    isLoading,
    error,
    
    // Computed
    isAuthenticated,
    userName,
    userEmail,
    
    // Actions
    login,
    register,
    logout,
    initializeAuth,
    clearError
  }
})