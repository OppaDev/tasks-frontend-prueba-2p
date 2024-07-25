import React from 'react';
import { Task } from '../../models/Task';

interface TaskItemProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (id: number) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onEdit, onDelete }) => {
  return (
    <li className="bg-gray-800 text-white rounded-lg shadow-md p-4 mb-4">
      <h2 className="text-xl mb-2">{task.title}</h2>
      <p className="mb-2">{task.description}</p>
      <p className={`mb-4 ${task.completed ? 'text-green-500' : 'text-yellow-500'}`}>
        {task.completed ? 'Completada' : 'Pendiente'}
      </p>
      <div className="flex justify-between">
        <button 
          onClick={() => onEdit(task)} 
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-700 transition duration-200"
        >
          Editar
        </button>
        <button 
          onClick={() => onDelete(task.id!)} 
          className="bg-red-500 text-white p-2 rounded hover:bg-red-700 transition duration-200"
        >
          Eliminar
        </button>
      </div>
    </li>
  );
};

export default TaskItem;
