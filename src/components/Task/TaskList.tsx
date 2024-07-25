import React, { useEffect, useState } from 'react';
import { Task } from '../../models/Task';
import TaskController from '../../controllers/TaskController';
import TaskItem from './TaskItem';
import TaskForm from './TaskForm';
import Modal from '../Modal';

const TaskList: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
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
    setIsModalOpen(false); // Close the modal after creating the task
  };

  const handleUpdateTask = async (task: Task) => {
    const updatedTask = await taskController.updateTask(task);
    setTasks(tasks.map(t => t.id === updatedTask.id ? updatedTask : t));
    setEditingTask(null);
    setIsModalOpen(false); // Close the modal after updating the task
  };

  const handleDeleteTask = async (id: number) => {
    await taskController.deleteTask(id);
    setTasks(tasks.filter(t => t.id !== id));
  };

  const openCreateModal = () => {
    setEditingTask(null);
    setIsModalOpen(true);
  };

  const openEditModal = (task: Task) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setEditingTask(null);
    setIsModalOpen(false);
  };

  return (
    <div className="container mx-auto p-4 bg-gray-900 text-white rounded-lg shadow-md">
      <h1 className="text-3xl font-bold mb-6">Tareas</h1>
      <button
        onClick={openCreateModal}
        className="mb-4 bg-green-500 text-white p-2 rounded hover:bg-green-700 transition duration-200"
      >
        Crear Nueva Tarea
      </button>
      <ul className="mt-6 space-y-4">
        {tasks.map((task) => (
          <TaskItem 
            key={task.id} 
            task={task} 
            onEdit={openEditModal}
            onDelete={handleDeleteTask}
          />
        ))}
      </ul>

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <h2 className="text-xl font-semibold mb-4 text-white">
          {editingTask ? 'Editar Tarea' : 'Crear Nueva Tarea'}
        </h2>
        <TaskForm 
          onSubmit={editingTask ? handleUpdateTask : handleCreateTask}
          initialTask={editingTask || undefined}
        />
      </Modal>
    </div>
  );
};

export default TaskList;
