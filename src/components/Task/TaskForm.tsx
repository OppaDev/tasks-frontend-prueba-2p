import React, { useState } from "react";
import { Task } from "../../models/Task";

interface TaskFormProps {
  onSubmit: (task: Task) => void;
  initialTask?: Task;
}

const TaskForm: React.FC<TaskFormProps> = ({ onSubmit, initialTask }) => {
  const [task, setTask] = useState<Task>(
    initialTask || new Task("", "", false)
  );

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    setTask((prevTask) => ({
      ...prevTask,
      [name]:
        type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(task);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-gray-800 text-white rounded-lg shadow-md p-8">
      <div className="mb-4">
        <input
          type="text"
          name="title"
          value={task.title}
          onChange={handleChange}
          placeholder="Título de la tarea"
          required
          className="w-full p-2 rounded bg-gray-700 focus:outline-none"
        />
      </div>
      <div className="mb-4">
        <textarea
          name="description"
          value={task.description}
          onChange={handleChange}
          placeholder="Descripción de la tarea"
          className="w-full p-2 rounded bg-gray-700 focus:outline-none"
        />
      </div>
      <div className="mb-4">
        <label className="inline-flex items-center">
          <input
            type="checkbox"
            name="completed"
            checked={task.completed}
            onChange={handleChange}
            className="form-checkbox h-5 w-5 text-green-500"
          />
          <span className="ml-2">Completada</span>
        </label>
      </div>
      <button
        type="submit"
        className="w-auto bg-green-500 p-2 rounded hover:bg-green-700 transition duration-200"
      >
        {initialTask ? "Actualizar" : "Crear"} Tarea
      </button>
    </form>
  );
};

export default TaskForm;
