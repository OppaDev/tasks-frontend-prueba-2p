import React from "react";
import TaskList from "../components/Task/TaskList";
import LogoutButton from "../components/LogoutButton";

const UserTasks: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">Tareas del Usuario</h1>
        <LogoutButton />
      </header>
      <main className="bg-gray-800 p-8 rounded-lg shadow-md">
        <TaskList />
      </main>
    </div>
  );
};

export default UserTasks;
