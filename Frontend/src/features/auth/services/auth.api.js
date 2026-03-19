import axios from "axios"
const api = axios.create({
    baseURL: "https://linksy-hfe8.onrender.com/api/auth",
    withCredentials: true
})
export async function loginuser(username, password) {
    const response = await api.post("/login", {
        username, password
    })
    return response.data
}
export async function registeruser(username, email, password) {
    const response = await api.post("/register", {
        username, email, password
    })
    return response.data
}
export async function getmeuser() {
    const response = await api.get("/get-me")
    return response.data
}