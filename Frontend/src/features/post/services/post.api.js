import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:3000/api",
    withCredentials: true
})

export async function getfeed() {
    const response = await api.get("/post/get-feed");
    return response.data
}