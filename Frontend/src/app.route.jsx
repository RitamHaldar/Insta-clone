import { createBrowserRouter } from 'react-router'
import Login from './features/auth/pages/Login'
import Register from './features/auth/pages/Register'
import FeedPage from './features/post/pages/FeedPage'
import CreatePost from './features/post/pages/CreatePost'
import FollowingPage from './features/post/pages/FollowingPage'
import ProfilePage from './features/post/pages/ProfilePage'

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
    },
    {
        path: "/profile",
        element: <ProfilePage />
    },
    {
        path: "/following",
        element: <FollowingPage />
    }
])
