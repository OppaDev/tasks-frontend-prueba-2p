import React, { useState, useEffect } from "react";
import TaskController from "../controllers/TaskController";
import { Task } from "../models/Task";

const TaskList: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const taskController = new TaskController();

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    const fetchedTasks = await taskController.getTasks();
    setTasks(fetchedTasks);
  };

  return (
    <div>
      <h1>Tareas</h1>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>{task.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
