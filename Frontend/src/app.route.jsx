import { createBrowserRouter } from 'react-router'
import Login from './features/auth/pages/Login'
import Register from './features/auth/pages/Register'
import FeedPage from './features/post/pages/FeedPage'
import CreatePost from './features/post/pages/CreatePost'
import FollowingPage from './features/post/pages/FollowingPage'
import ProfilePage from './features/post/pages/ProfilePage'
import ProtectedRoute from './features/auth/components/ProtectedRoute'

export const routes = createBrowserRouter([
    {
        path: "/",
        element: <ProtectedRoute><FeedPage /></ProtectedRoute>
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
        element: <ProtectedRoute><CreatePost /></ProtectedRoute>
    },
    {
        path: "/profile",
        element: <ProtectedRoute><ProfilePage /></ProtectedRoute>
    },
    {
        path: "/following",
        element: <ProtectedRoute><FollowingPage /></ProtectedRoute>
    }
])
