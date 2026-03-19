import { useContext, useEffect } from "react";
import { AuthContext } from "../auth.context";
import { loginuser, registeruser, getmeuser } from "../services/auth.api";

export const useAuth = () => {
    const { user, setuser, loading, setloading, error, setError, getme } = useContext(AuthContext);

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

    return {
        user, loading, error, login, register, getme, clearError
    }
}