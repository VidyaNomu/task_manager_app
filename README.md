# 📋 Task Manager App

A modern, responsive task management application built with **Vue.js 3**, **TypeScript**, and **Pinia**. Features a complete authentication system, beautiful UI with glassmorphism effects, and comprehensive task management capabilities.

![Task Manager](https://img.shields.io/badge/Vue.js-4FC08D?style=for-the-badge&logo=vue.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Pinia](https://img.shields.io/badge/Pinia-FFD859?style=for-the-badge&logo=vue.js&logoColor=black)

## ✨ Features

### 🔐 Authentication System
- **User Registration** with form validation
- **Secure Login** with email/password
- **Password visibility toggle**
- **Persistent sessions** (remembers login after refresh)
- **Auto-generated avatars** using UI Avatars API
- **Route protection** - authenticated routes only
- **Responsive auth forms** with glassmorphism effects

### 📝 Task Management
- **Create, Edit, Delete** tasks
- **Mark tasks as complete/incomplete**
- **Priority levels** (Low, Medium, High)
- **Categories** (Work, Personal, Shopping, Health, Finance, Education)
- **Due date tracking**
- **Search and filter** tasks
- **Statistics dashboard** with task counts
- **Beautiful card-based UI** with modern design

### 🎨 Modern UI/UX
- **Responsive design** - works on all devices
- **Glassmorphism effects** and modern styling
- **Smooth animations** and transitions
- **Gradient backgrounds** and beautiful color schemes
- **Widget-style cards** with hover effects
- **Mobile-first approach**

### 🏗️ Technical Features
- **Vue.js 3** with Composition API
- **TypeScript** for type safety
- **Pinia** for state management
- **Vue Router** with navigation guards
- **Vite** for fast development and building
- **ESLint** for code quality
- **Component-based architecture**
- **Mock API** with localStorage fallback
- **Ready for Laravel backend integration**

## 🚀 Quick Start

### Prerequisites
- **Node.js** 18.0.0 or higher
- **npm** or **yarn**

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd task-manager-app
   ```

2. **Install dependencies**
   ```bash
   cd task-manager-frontend
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   ```
   http://localhost:5173
   ```

## 🔧 Available Scripts

### Frontend (`task-manager-frontend/`)

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run tests
npm run test:unit

# Type checking
npm run type-check

# Lint and fix code
npm run lint
```

### Backend (`task-manager-backend/`)

```bash
# Install dependencies
composer install

# Generate application key
php artisan key:generate

# Run database migrations
php artisan migrate

# Start Laravel server
php artisan serve
```


## 🎯 Usage Guide

### 1. **Authentication**
- **Register**: Create a new account with name, email, and password
- **Login**: Use any email/password combination (demo mode)
- **Logout**: Click the logout button in the header

### 2. **Task Management**
- **Add Task**: Click "Add New Task" button
- **Edit Task**: Click edit icon on any task card
- **Delete Task**: Click delete icon on any task card
- **Complete Task**: Click the checkmark button
- **Filter Tasks**: Use the search bar and filter buttons

### 3. **Dashboard**
- **Statistics**: View total, pending, completed, and high-priority task counts
- **Task Grid**: Browse all tasks in a responsive grid layout
- **Search**: Find tasks by title or description
- **Filter**: Show all, pending, or completed tasks

## 🔐 Authentication Flow

1. **Unauthenticated users** are redirected to `/login`
2. **Registration** creates a new user account
3. **Login** authenticates and stores user session
4. **Protected routes** require authentication
5. **User avatar** and name displayed in header
6. **Logout** clears session and redirects to login

## 🎨 Design System

### Colors
- **Primary**: `#667eea` (Blue gradient)
- **Secondary**: `#764ba2` (Purple gradient)
- **Success**: `#48bb78` (Green)
- **Warning**: `#ed8936` (Orange)
- **Error**: `#e53e3e` (Red)
- **Background**: `#2c3e50` to `#34495e` (Dark gradient)

### Typography
- **Font Family**: `-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif`
- **Headings**: Bold, large sizes with proper hierarchy
- **Body**: Clean, readable with good contrast

### Components
- **Cards**: Glassmorphism effects with backdrop blur
- **Buttons**: Gradient backgrounds with hover animations
- **Forms**: Modern styling with floating labels and icons
- **Layout**: CSS Grid and Flexbox for responsive design

## 🚀 Deployment

### Vercel (Frontend)

1. **Build the project**
   ```bash
   npm run build
   ```

2. **Deploy to Vercel**
   ```bash
   npx vercel --prod
   ```

3. **Or connect your GitHub repository** to Vercel for automatic deployments

### Laravel Backend (Optional)

1. **Set up Laravel environment**
2. **Configure database connection**
3. **Run migrations**
4. **Deploy to your preferred hosting provider**

## 🔧 Configuration

### Environment Variables

Create `.env` file in the frontend directory:

```env
# API Configuration
VITE_API_BASE_URL=http://localhost:8000/api

# App Configuration
VITE_APP_NAME=Task Manager
VITE_APP_VERSION=1.0.0
```

### Backend Integration

The frontend is designed to work with a Laravel backend:

- **API endpoints** are ready in `src/services/api.ts`
- **Authentication flow** supports JWT/Sanctum tokens
- **CORS configuration** included for cross-origin requests
- **Fallback to localStorage** when backend is unavailable

## 🧪 Testing

```bash
# Run unit tests
npm run test:unit

# Run type checking
npm run type-check

# Run linting
npm run lint
```

## 📱 Browser Support

- **Chrome** 90+
- **Firefox** 88+
- **Safari** 14+
- **Edge** 90+

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

##  Acknowledgments

- **Vue.js** team for the amazing framework
- **Pinia** for excellent state management
- **Vite** for lightning-fast development experience
- **UI Avatars** for automatic avatar generation
- **Vercel** for seamless deployment

## 📞 Support

If you have any questions or need help, please:

1. Check the [Issues](../../issues) page
2. Create a new issue with detailed description
3. Include steps to reproduce any bugs

---



## 🎉 Demo Credentials

**For quick testing:**
- **Email**: Any valid email format (e.g., `demo@example.com`)
- **Password**: Any password (e.g., `password123`)

*The app uses mock authentication for demonstration purposes.*
