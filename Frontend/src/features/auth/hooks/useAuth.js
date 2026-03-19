import { useContext, useEffect } from "react";
import { AuthContext } from "../auth.context";
import { loginuser, registeruser, getmeuser } from "../services/auth.api";

export const useAuth = () => {
    const { user, setuser, loading, setloading } = useContext(AuthContext);
    const login = async (username, password) => {
        setloading(true);
        const response = await loginuser(username, password);
        setuser(response.username);
        setloading(false);
    }
    const register = async (username, email, password) => {
        setloading(true);
        const response = await registeruser(username, email, password);
        setuser(response.username);
        setloading(false);
    }
    const getme = async () => {
        setloading(true);
        const response = await getmeuser();
        setuser(response.user)
        setloading(false);
    }
    useEffect(() => {
        getme();
    }, [])

    return {
        user, loading, login, register, getme
    }
}