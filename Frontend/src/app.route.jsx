import { createBrowserRouter } from 'react-router'
import Login from './features/auth/pages/Login'
import Register from './features/auth/pages/Register'

export const routes = createBrowserRouter([
    {
        path: "/",
        element: <h4>Wlecome To Our App</h4>
    },
    {
        path: "/login",
        element: <Login />
    },
    {
        path: "/register",
        element: <Register />
    }
])
