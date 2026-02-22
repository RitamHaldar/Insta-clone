import React from 'react'
import { RouterProvider } from 'react-router'
import { routes } from './app.route'
import { AuthProvider } from './features/auth/auth.context'
const App = () => {
  return (
    <AuthProvider>
      <RouterProvider router={routes} />
    </AuthProvider>

  )
}

export default App