<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Task;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Validation\Rule;

class TaskController extends Controller
{
    /**
     * Display a listing of tasks.
     */
    public function index(Request $request): JsonResponse
    {
        $query = Task::query();

        // Filter by status
        if ($request->has('status')) {
            match ($request->status) {
                'completed' => $query->completed(),
                'pending' => $query->pending(),
                default => null
            };
        }

        // Filter by priority
        if ($request->has('priority')) {
            $query->byPriority($request->priority);
        }

        // Filter by category
        if ($request->has('category')) {
            $query->byCategory($request->category);
        }

        // Search in title and description
        if ($request->has('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('title', 'like', "%{$search}%")
                  ->orWhere('description', 'like', "%{$search}%");
            });
        }

        // Sort by created_at desc by default
        $tasks = $query->orderBy('created_at', 'desc')->get();

        return response()->json([
            'data' => $tasks,
            'message' => 'Tasks retrieved successfully'
        ]);
    }

    /**
     * Store a newly created task.
     */
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'priority' => ['required', Rule::in(['low', 'medium', 'high'])],
            'due_date' => 'nullable|date|after_or_equal:today',
            'category' => 'required|string|max:100',
        ]);

        $validated['completed'] = false;

        $task = Task::create($validated);

        return response()->json([
            'data' => $task,
            'message' => 'Task created successfully'
        ], 201);
    }

    /**
     * Display the specified task.
     */
    public function show(Task $task): JsonResponse
    {
        return response()->json([
            'data' => $task,
            'message' => 'Task retrieved successfully'
        ]);
    }

    /**
     * Update the specified task.
     */
    public function update(Request $request, Task $task): JsonResponse
    {
        $validated = $request->validate([
            'title' => 'sometimes|string|max:255',
            'description' => 'sometimes|string',
            'completed' => 'sometimes|boolean',
            'priority' => ['sometimes', Rule::in(['low', 'medium', 'high'])],
            'due_date' => 'nullable|date',
            'category' => 'sometimes|string|max:100',
        ]);

        $task->update($validated);

        return response()->json([
            'data' => $task,
            'message' => 'Task updated successfully'
        ]);
    }

    /**
     * Remove the specified task.
     */
    public function destroy(Task $task): JsonResponse
    {
        $task->delete();

        return response()->json([
            'message' => 'Task deleted successfully'
        ], 204);
    }

    /**
     * Toggle task completion status.
     */
    public function toggleComplete(Task $task): JsonResponse
    {
        $task->update(['completed' => !$task->completed]);

        return response()->json([
            'data' => $task,
            'message' => 'Task status updated successfully'
        ]);
    }

    /**
     * Get task statistics.
     */
    public function stats(): JsonResponse
    {
        $stats = [
            'total' => Task::count(),
            'completed' => Task::completed()->count(),
            'pending' => Task::pending()->count(),
            'high_priority' => Task::pending()->byPriority('high')->count(),
            'overdue' => Task::pending()->where('due_date', '<', now())->count(),
        ];

        return response()->json([
            'data' => $stats,
            'message' => 'Statistics retrieved successfully'
        ]);
    }
}