import axios from "axios";
import { Form } from "react-router";

const api = axios.create({
    baseURL: "http://localhost:3000/api",
    withCredentials: true
})

export async function getfeed() {
    const response = await api.get("/post/get-feed");
    return response.data
}
export async function createpost(caption, profileimage) {
    const form = new FormData();
    form.append('caption', caption);
    form.append('test', profileimage);


    const response = await api.post("/post", form);
    return response.data;
}
export async function managelike(postid) {
    const response = await api.post("/post/" + postid);
}