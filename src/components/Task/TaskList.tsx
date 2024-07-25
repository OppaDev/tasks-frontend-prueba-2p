import React, { useEffect, useState } from 'react';
import { Task } from '../../models/Task';
import TaskController from '../../controllers/TaskController';
import TaskItem from './TaskItem';
import TaskForm from './TaskForm';

const TaskList: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const taskController = new TaskController();

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const fetchedTasks = await taskController.getTasks();
    setTasks(fetchedTasks);
  };

  const handleCreateTask = async (task: Task) => {
    const newTask = await taskController.createTask(task);
    setTasks([...tasks, newTask]);
  };

  const handleUpdateTask = async (task: Task) => {
    const updatedTask = await taskController.updateTask(task);
    setTasks(tasks.map(t => t.id === updatedTask.id ? updatedTask : t));
    setEditingTask(null);
  };

  const handleDeleteTask = async (id: number) => {
    await taskController.deleteTask(id);
    setTasks(tasks.filter(t => t.id !== id));
  };

  return (
    <div className="container mx-auto p-4 bg-gray-900 text-white rounded-lg shadow-md">
      <h1 className="text-3xl font-bold mb-6">Tareas</h1>
      <div className="bg-gray-800 p-6 rounded-lg shadow-inner">
        <TaskForm onSubmit={handleCreateTask} />
      </div>
      {editingTask && (
        <div className="mt-6 p-6 bg-gray-800 rounded-lg shadow-inner">
          <h2 className="text-xl font-semibold mb-4">Editar Tarea</h2>
          <TaskForm onSubmit={handleUpdateTask} initialTask={editingTask} />
          <button 
            onClick={() => setEditingTask(null)} 
            className="mt-4 p-2 w-auto bg-red-500 text-white rounded hover:bg-red-700 transition duration-200"
          >
            Cancelar
          </button>
        </div>
      )}
      <ul className="mt-6 space-y-4">
        {tasks.map((task) => (
          <TaskItem 
            key={task.id} 
            task={task} 
            onEdit={setEditingTask}
            onDelete={handleDeleteTask}
          />
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
