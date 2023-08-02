<?php

namespace App\Http\Controllers;

use App\Http\Requests\TaskRequest;
use App\Models\Task;
use Illuminate\Support\Facades\Auth;

class TaskController extends Controller
{
    //
    public function index()
    {
        $user = Auth::user();
        $userTask = $user->task;

        return  response()->json($userTask, 200);
    }

    public function store(TaskRequest $request)
    {
        $validatedData = $request->validated();
        $task = Task::create($validatedData);

        $user = Auth::user();
        $user->task()->attach($task);

        return response()->json(['data'=> $task, 'message' => 'Task Successfully Added!'], 200);
    }
    public function update(TaskRequest $request, Task $task)
    {
        $validatedData = $request->validated();

        $task->update($validatedData);

        return response()->json(['message' => 'Task updated successfully!', 'task' => $task], 200);
    }

    public function destroy(Task $task)
    {
        $task->delete();
        return response()->json(['message' => 'Task deleted successfully!'], 200);
    }
}
