import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';

const TodoListPage = () => {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [search, setSearch] = useState("");
    const [dueDate, setDueDate] = useState("");
    const [status, setStatus] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const token = localStorage.getItem("token");
                
                if (!token) {
                    setError("No estás autenticado.");
                    setLoading(false);
                    return;
                }

                let url = "https://modulo1-final-backend.onrender.com/api/tasks?";
                if (search) url += `search=${search}&`;
                if (dueDate) url += `dueDate=${dueDate}T18:30:00.000Z&`;
                if (status) url += `status=${status}&`;

                if (url.endsWith("&")) {
                    url = url.slice(0, -1);
                }

                const response = await axios.get(url, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                setTasks(response.data);
            } catch (err) {
                setError("Error al cargar las tareas");
            } finally {
                setLoading(false);
            }
        };

        fetchTasks();
    }, [search, dueDate, status]);

    if (loading) {
        return <div className="text-center text-xl">Cargando tareas...</div>;
    }

    if (error) {
        return <div className="text-center text-xl text-red-600">{error}</div>;
    }

    const handleCreateNewTask = () => {
        navigate('create-task');
    };

    const handleStatusChange = async (taskId, newStatus) => {
        try {
            const token = localStorage.getItem("token");

            const task = tasks.find((task) => task._id === taskId);

            const response = await axios.put(
                `https://modulo1-final-backend.onrender.com/api/tasks/${taskId}`,
                {
                    title: task.title,
                    description: task.description,
                    status: newStatus,
                    dueDate: task.dueDate,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setTasks((prevTasks) =>
                prevTasks.map((task) =>
                    task._id === taskId ? { ...task, status: newStatus } : task
                )
            );
        } catch (err) {
            setError("Error al actualizar el estado de la tarea.");
        }
    };

    const handleDelete = async (taskId) => {
        try {
            const token = localStorage.getItem("token");
            await axios.delete(`https://modulo1-final-backend.onrender.com/api/tasks/${taskId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            setTasks((prevTasks) => prevTasks.filter((task) => task._id !== taskId));
        } catch (err) {
            setError("Error al eliminar la tarea.");
        }
    };

    return (
        <div className="p-8 bg-blue-50 min-h-screen">
            <h1 className="text-4xl font-bold text-center text-blue-700 mb-6">
                Lista de Tareas
            </h1>
            
            <button
                onClick={handleCreateNewTask}
                className="bg-blue-500 text-white px-4 mb-4 py-2 rounded-lg hover:bg-yellow-600"
            >
                Crear una nueva tarea
            </button>

            <br />
                            
            {}
            <div className="flex justify-between items-center mb-6">
                <div className="flex space-x-4">
                    {}
                    <input
                        type="text"
                        placeholder="Buscar por título o descripción"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="p-2 border border-blue-300 rounded"
                    />
                    {}
                    <input
                        type="date"
                        value={dueDate}
                        onChange={(e) => setDueDate(e.target.value)}
                        className="p-2 border border-blue-300 rounded"
                    />
                    {}
                    <select
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        className="p-2 border border-blue-300 rounded"
                    >
                        <option value="">Filtrar por estado</option>
                        <option value="pendiente">Pendiente</option>
                        <option value="en progreso">En progreso</option>
                        <option value="completado">Completado</option>
                    </select>
                </div>
            </div>
            
            {tasks.length === 0 ? (
                <p className="text-center text-xl text-blue-700">No hay tareas disponibles.</p>
            ) : (
                <ul className="space-y-4">
                    {tasks.map((task) => (
                        <li
                            key={task._id}
                            className="bg-white p-4 rounded-lg shadow-md border border-blue-200"
                        >
                            <div className="font-semibold text-xl text-blue-700">{task.title}</div>
                            <div className="text-gray-600">{task.description}</div>
                            <div className="text-sm text-gray-500">
                                Due Date: {new Date(task.dueDate).toLocaleString()}
                            </div>

                            {}
                            <div className="mt-4">
                                <span className="font-semibold text-blue-600">Estado: </span>
                                <span
                                    className={`${
                                        task.status === "completado"
                                            ? "text-green-500"
                                            : task.status === "en progreso"
                                            ? "text-yellow-500"
                                            : "text-red-500"
                                    }`}
                                >
                                    {task.status.charAt(0).toUpperCase() + task.status.slice(1)}
                                </span>
                            </div>

                            {}
                            <div className="mt-4">
                                {task.status === "pendiente" && (
                                    <button
                                        onClick={() => handleStatusChange(task._id, "en progreso")}
                                        className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600"
                                    >
                                        Marcar como En Progreso
                                    </button>
                                )}
                                {task.status === "en progreso" && (
                                    <button
                                        onClick={() => handleStatusChange(task._id, "completado")}
                                        className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
                                    >
                                        Marcar como Completado
                                    </button>
                                )}
                            </div>

                            {}
                            <div className="mt-4">
                                <button
                                    onClick={() => handleDelete(task._id)}
                                    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                                >
                                    Eliminar
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default TodoListPage;
