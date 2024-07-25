import React, { useState } from "react";
import { useRouter } from "next/router";
import AuthService from "../services/AuthService";

const Register: React.FC = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    password2: "",
    first_name: "",
    last_name: "",
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
      await authService.register(formData);
      router.push("/login"); // Redirige al login después del registro exitoso
    } catch (err) {
      setError("Error en el registro. Por favor, inténtalo de nuevo.");
      console.error(err);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-200">
      <div className="bg-gray-800 text-white rounded-lg shadow-md p-8 w-80">
        <h1 className="text-center text-2xl mb-4">Registro</h1>
        {error && <p className="text-red-500">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="username" className="block mb-2">Nombre:</label>
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
            <label htmlFor="email" className="block mb-2">Correo:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
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
          <div className="mb-4">
            <label htmlFor="password2" className="block mb-2">Confirmar Contraseña:</label>
            <input
              type="password"
              id="password2"
              name="password2"
              value={formData.password2}
              onChange={handleChange}
              required
              className="w-full p-2 rounded bg-gray-700 focus:outline-none"
            />
          </div>
          <button type="submit" className="w-full bg-green-500 p-2 rounded mt-4">Registro</button>
          <button type="button" onClick={() => router.push("/login")} className="w-full bg-gray-300 text-gray-800 p-2 rounded mt-2">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Register;
