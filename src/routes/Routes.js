import { createBrowserRouter, RouterProvider } from "react-router-dom";
import CreateTaskPage from "../pages/CreateTaskPage";
import LoginPage from "../pages/LoginPage";
import NotFoundPage from "../pages/NotFoundPage";
import RegisterPage from "../pages/RegisterPage";
import TodoListPage from "../pages/TodoListPage";
import PrivateRoute from "./PrivateRoute";

const router = createBrowserRouter([
    { 
        path: "/", 
        element: <LoginPage />,
    },
    {
        path: 'register',
        element: <RegisterPage />
    },
    { 
        path: "/tasks", 
        element: (
            <PrivateRoute>
                <TodoListPage />
            </PrivateRoute>
        ),
    },
    { 
        path: "/tasks/create-task", 
        element: (
            <PrivateRoute>
                <CreateTaskPage />
            </PrivateRoute>
        ),
    },
    { 
        path: "*", 
        element: <NotFoundPage /> 
    }
]);

export default function AppRoutes() {
    return <RouterProvider router={router} />;
}