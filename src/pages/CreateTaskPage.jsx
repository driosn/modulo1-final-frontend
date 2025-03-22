import axios from "axios";
import { jwtDecode } from "jwt-decode";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const CreateTaskPage = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [dueDate, setDueDate] = useState("");
    const [status, setStatus] = useState("pendiente");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const navigate = useNavigate();
    
    //
    // Create
    //
    const handleCreateTask = async () => {
        try {
            setLoading(true);
            const token = localStorage.getItem("token");

            if (!token) {
                setError("No estás autenticado.");
                setLoading(false);
                return;
            }

            const decodedToken = jwtDecode(token);
            const userId = decodedToken.id;

            const newTask = {
                title,
                description,
                status,
                dueDate,
                userId,
            };

            await axios.post("https://modulo1-final-backend.onrender.com/api/tasks", newTask, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            setTitle("");
            setDescription("");
            setDueDate("");
            setStatus("pendiente");
            setLoading(false);

            navigate("/tasks");
        } catch (err) {
            setLoading(false);
            setError("Error al crear la tarea.");
        }
    };

    return (
        <div className="p-8">
            <h1 className="text-4xl font-bold mb-6">Crear Nueva Tarea</h1>

            {error && <div className="text-red-600">{error}</div>}

            <div className="mb-4">
                <input
                    type="text"
                    placeholder="Título de la tarea"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="p-2 border border-blue-300 rounded"
                />
            </div>

            <div className="mb-4">
                <textarea
                    placeholder="Descripción de la tarea"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="p-2 border border-blue-300 rounded w-full"
                />
            </div>

            <div className="mb-4">
                <input
                    type="date"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    className="p-2 border border-blue-300 rounded"
                />
            </div>

            <div className="mb-4">
                <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="p-2 border border-blue-300 rounded"
                >
                    <option value="pendiente">Pendiente</option>
                    <option value="en progreso">En progreso</option>
                    <option value="completado">Completado</option>
                </select>
            </div>

            <button
                onClick={handleCreateTask}
                disabled={loading}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
            >
                {loading ? "Creando..." : "Crear Tarea"}
            </button>
        </div>
    );
};

export default CreateTaskPage;
