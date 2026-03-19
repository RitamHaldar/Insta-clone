import axios from "axios"
const api = axios.create({
    baseURL: "https://linksy-hfe8.onrender.com/api/auth",
    withCredentials: true
})
export async function loginuser(username, password) {
    try {
        const response = await api.post("/login", {
            username, password
        })
        return response.data
    } catch (error) {
        const message = error.response?.data?.message || "Login failed. Please try again.";
        throw new Error(message);
    }
}
export async function registeruser(username, email, password) {
    try {
        const response = await api.post("/register", {
            username, email, password
        })
        return response.data
    } catch (error) {
        const message = error.response?.data?.message || "Registration failed. Please check your details.";
        throw new Error(message);
    }
}
export async function getmeuser() {
    try {
        const response = await api.get("/get-me")
        return response.data
    } catch (error) {
        // We don't necessarily want to throw a loud error here as it's used for auth checking
        console.error("Error fetching current user:", error.response?.data?.message || error.message);
        return null;
    }
}