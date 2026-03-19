import { useContext, useEffect } from "react";
import { AuthContext } from "../auth.context";
import { loginuser, registeruser, getmeuser } from "../services/auth.api";

export const useAuth = () => {
    const { user, setuser, loading, setloading, error, setError } = useContext(AuthContext);

    const clearError = () => setError(null);

    const login = async (username, password) => {
        setloading(true);
        setError(null);
        try {
            const response = await loginuser(username, password);
            setuser(response.user?.username || response.username);
        } catch (err) {
            setError(err.message);
        } finally {
            setloading(false);
        }
    }

    const register = async (username, email, password) => {
        setloading(true);
        setError(null);
        try {
            const response = await registeruser(username, email, password);
            setuser(response.user?.username || response.username);
        } catch (err) {
            setError(err.message);
        } finally {
            setloading(false);
        }
    }

    const getme = async () => {
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
    }

    useEffect(() => {
        getme();
    }, [])

    return {
        user, loading, error, login, register, getme, clearError
    }
}