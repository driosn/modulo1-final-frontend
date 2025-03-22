import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess(false);

        try {
            const response = await axios.post('https://modulo1-final-backend.onrender.com/api/auth/register', {
                name,
                email,
                password
            });

            if (response.status === 201) {
                setSuccess(true);  // Mostrar mensaje de éxito
            }
        } catch (err) {
            if (err.response) {
                setError('Error al registrar el usuario. Intenta nuevamente.');
            } else {
                setError('Error de conexión. Intenta nuevamente más tarde');
            }
        }
    };

    const handleGoToLogin = () => {
        navigate('/');  // Redirigir al login
    };

    return (
        <div className="h-screen flex justify-center items-center bg-blue-500">
            <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
                {success ? (
                    <div className="text-center">
                        <h2 className="text-2xl font-bold text-blue-600 mb-4">¡Registro Exitoso!</h2>
                        <p className="text-lg text-gray-700 mb-4">Tu cuenta ha sido creada correctamente. Ahora puedes iniciar sesión.</p>
                        <button
                            onClick={handleGoToLogin}
                            className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            Iniciar sesión
                        </button>
                    </div>
                ) : (
                    <div>
                        <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">Registrarse</h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nombre Completo</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                    className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Correo Electrónico</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700">Contraseña</label>
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            {error && <p className="text-red-600 text-sm text-center">{error}</p>} {}
                            <div>
                                <button
                                    type="submit"
                                    className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    Registrarse
                                </button>
                            </div>
                        </form>
                        <p className="mt-4 text-center text-sm text-gray-600">
                            ¿Ya tienes una cuenta? <a href="/" className="text-blue-600 hover:underline">Inicia sesión</a>
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default RegisterPage;
