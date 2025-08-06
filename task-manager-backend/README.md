# 🚀 Task Manager - Laravel Backend API

A robust REST API built with Laravel 10 for the Task Manager application.

## 📋 Features

- **RESTful API**: Complete CRUD operations for tasks
- **Advanced Filtering**: Filter by status, priority, category, and search
- **Database Optimization**: Indexed columns for better performance
- **CORS Support**: Configured for frontend integration
- **Validation**: Comprehensive request validation
- **Statistics Endpoint**: Get task statistics and analytics
- **SQLite Support**: Easy setup with SQLite database

## 🛠️ API Endpoints

### Tasks
- `GET /api/tasks` - Get all tasks (with filtering)
- `POST /api/tasks` - Create new task
- `GET /api/tasks/{id}` - Get single task
- `PUT /api/tasks/{id}` - Update task
- `DELETE /api/tasks/{id}` - Delete task
- `PATCH /api/tasks/{id}/toggle` - Toggle task completion

### Statistics
- `GET /api/tasks/stats` - Get task statistics

### Query Parameters for GET /api/tasks:
- `status` - Filter by status (completed, pending)
- `priority` - Filter by priority (low, medium, high)
- `category` - Filter by category
- `search` - Search in title and description

## 🚀 Quick Setup (When PHP/Composer is Available)

### Prerequisites
- PHP 8.1 or higher
- Composer
- SQLite (or MySQL/PostgreSQL)

### Installation Steps

1. **Install Dependencies**:
```bash
cd task-manager-backend
composer install
```

2. **Environment Setup**:
```bash
cp .env.example .env
php artisan key:generate
```

3. **Database Setup**:
```bash
# Create SQLite database
touch database/database.sqlite

# Run migrations
php artisan migrate
```

4. **Start Development Server**:
```bash
php artisan serve
```

The API will be available at `http://localhost:8000`

## 🐳 Docker Setup (Alternative)

If you prefer using Docker, create a `docker-compose.yml`:

```yaml
version: '3.8'
services:
  app:
    image: php:8.1-apache
    ports:
      - "8000:80"
    volumes:
      - .:/var/www/html
    environment:
      - DB_CONNECTION=sqlite
      - DB_DATABASE=/var/www/html/database/database.sqlite
```

## 📁 Project Structure

```
task-manager-backend/
├── app/
│   ├── Http/Controllers/Api/
│   │   └── TaskController.php      # Main API controller
│   └── Models/
│       └── Task.php                # Task model with relationships
├── database/
│   └── migrations/
│       └── create_tasks_table.php  # Database schema
├── routes/
│   └── api.php                     # API routes definition
├── config/
│   └── cors.php                    # CORS configuration
└── README.md
```

## 🔧 Configuration

### Database Schema

The tasks table includes:
- `id` - Primary key
- `title` - Task title (required)
- `description` - Task description (required)
- `completed` - Boolean completion status
- `priority` - Enum: low, medium, high
- `due_date` - Optional due date
- `category` - Task category
- `created_at` / `updated_at` - Timestamps

### CORS Configuration

The API is configured to accept requests from any origin. In production, update `config/cors.php` to restrict origins:

```php
'allowed_origins' => ['http://localhost:5173', 'https://yourdomain.com'],
```

## 📝 API Usage Examples

### Create a Task
```bash
curl -X POST http://localhost:8000/api/tasks \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Complete project",
    "description": "Finish the task manager app",
    "priority": "high",
    "category": "Work",
    "due_date": "2024-01-15"
  }'
```

### Get All Tasks
```bash
curl http://localhost:8000/api/tasks
```

### Filter Tasks
```bash
# Get pending high priority tasks
curl "http://localhost:8000/api/tasks?status=pending&priority=high"

# Search tasks
curl "http://localhost:8000/api/tasks?search=project"
```

### Update a Task
```bash
curl -X PUT http://localhost:8000/api/tasks/1 \
  -H "Content-Type: application/json" \
  -d '{"completed": true}'
```

### Get Statistics
```bash
curl http://localhost:8000/api/tasks/stats
```

## 🔗 Frontend Integration

The Vue.js frontend is automatically configured to connect to this Laravel API. The API service includes:

1. **Health Check**: Automatically detects if Laravel API is available
2. **Fallback Mode**: Uses localStorage if API is unavailable
3. **Error Handling**: Graceful error handling with fallbacks
4. **CORS Support**: Properly configured headers

## 🚀 Deployment

### Production Considerations

1. **Environment Variables**:
```bash
APP_ENV=production
APP_DEBUG=false
DB_CONNECTION=mysql  # Use MySQL/PostgreSQL in production
```

2. **Optimize for Production**:
```bash
php artisan config:cache
php artisan route:cache
php artisan view:cache
```

3. **Database Seeding** (Optional):
```bash
php artisan db:seed
```

## 🧪 Testing

Run the application tests:
```bash
php artisan test
```

## 📊 Performance

The API includes several optimizations:
- Database indexes on frequently queried columns
- Efficient query scopes
- Proper HTTP status codes
- JSON responses with consistent structure

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Add tests for new features
4. Ensure all tests pass
5. Submit a pull request

## 📄 License

MIT License - see LICENSE file for details.

---

**Ready to power your task management! ⚡**