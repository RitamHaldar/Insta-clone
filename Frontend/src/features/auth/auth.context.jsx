import { createContext, useState } from "react";
import React from 'react'

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setuser] = useState(null);
    const [loading, setloading] = useState(false)
    const [error, setError] = useState(null)
    return (
        <AuthContext.Provider value={{ user, setuser, loading, setloading, error, setError }}>
            {children}
        </AuthContext.Provider>
    )
}