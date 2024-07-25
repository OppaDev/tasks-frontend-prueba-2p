import React from "react";
import { useRouter } from "next/router";
import AuthService from "../services/AuthService";

const LogoutButton: React.FC = () => {
  const router = useRouter();
  const authService = new AuthService();

  const handleLogout = async () => {
    try {
      await authService.logout();
      router.push("/login");
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  return (
    <button 
      onClick={handleLogout}
      className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700 transition duration-200"
    >
      Cerrar sesión
    </button>
  );
};

export default LogoutButton;
