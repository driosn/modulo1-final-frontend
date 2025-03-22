import React from 'react';
import { useNavigate } from 'react-router-dom';

const NotFoundPage = () => {
    const navigate = useNavigate();

    const handleGoHome = () => {
        navigate('/tasks');
    };

    return (
        <div className="h-screen flex flex-col items-center justify-center bg-gray-100">
            <div className="text-center">
                <h1 className="text-6xl font-extrabold text-blue-500">404</h1>
                <p className="text-xl text-gray-600 mt-4">¡Vaya! La página que buscas no existe.</p>
                <p className="text-lg text-gray-500 mt-2">Parece que te has perdido por el camino.</p>
                <div className="mt-8">
                    <button
                        onClick={handleGoHome}
                        className="bg-blue-500 text-white px-6 py-3 rounded-full text-lg hover:bg-blue-600 transition duration-200"
                    >
                        Volver al inicio
                    </button>
                </div>
            </div>
        </div>
    );
};

export default NotFoundPage;
