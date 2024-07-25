import React, { useState } from "react";
import { useRouter } from "next/router";
import AuthService from "../services/AuthService";

const Login: React.FC = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");
  const router = useRouter();
  const authService = new AuthService();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    try {
      const token = await authService.login(
        formData.username,
        formData.password
      );
      localStorage.setItem("token", token);
      router.push("/userTasks"); // Redirige a la página principal después del login exitoso
    } catch (err) {
      setError(
        "Error en el inicio de sesión. Por favor, verifica tus credenciales."
      );
      console.error(err);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-200">
      <div className="bg-gray-800 text-white rounded-lg shadow-md p-8 w-80">
        <h1 className="text-center text-2xl mb-4">Iniciar Sesión</h1>
        {error && <p className="text-red-500">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="username" className="block mb-2">Usuario:</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              className="w-full p-2 rounded bg-gray-700 focus:outline-none"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block mb-2">Contraseña:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full p-2 rounded bg-gray-700 focus:outline-none"
            />
          </div>
          <button type="submit" className="w-full bg-green-500 p-2 rounded mt-4">Iniciar Sesión</button>
          <button type="button" onClick={() => router.push("/register")} className="w-full bg-gray-300 text-gray-800 p-2 rounded mt-2">Registro</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
