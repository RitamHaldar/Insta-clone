import { createContext, useState, useEffect, useCallback } from "react";
import React from 'react'
import { getmeuser } from "./services/auth.api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setuser] = useState(null);
    const [loading, setloading] = useState(false)
    const [error, setError] = useState(null)

    const getme = useCallback(async () => {
        setloading(true);
        try {
            const response = await getmeuser();
            if (response && response.user) {
                setuser(response.user.username);
            }
        } catch (err) {
            console.error("Auth check failed:", err.message);
            setuser(null);
        } finally {
            setloading(false);
        }
    }, []);

    useEffect(() => {
        getme();
    }, [getme]);

    return (
        <AuthContext.Provider value={{ user, setuser, loading, setloading, error, setError, getme }}>
            {children}
        </AuthContext.Provider>
    )
}