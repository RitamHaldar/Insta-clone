import { createBrowserRouter } from 'react-router'
import Login from './features/auth/pages/Login'
import Register from './features/auth/pages/Register'
import FeedPage from './features/post/pages/FeedPage'
import CreatePost from './features/post/pages/CreatePost'

export const routes = createBrowserRouter([
    {
        path: "/",
        element: <FeedPage />
    },
    {
        path: "/login",
        element: <Login />
    },
    {
        path: "/register",
        element: <Register />
    },
    {
        path: "/create-post",
        element: <CreatePost />
    }
])
