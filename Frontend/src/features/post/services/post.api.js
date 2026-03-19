import axios from "axios";
import { Form } from "react-router";

const api = axios.create({
    baseURL: "https://linksy-hfe8.onrender.com/api",
    withCredentials: true
})

export async function getfeed() {
    const response = await api.get("/post/get-feed");
    return response.data
}

export async function getmyposts() {
    const response = await api.get("/post/");
    return response.data;
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

export async function deletepost(postid) {
    const response = await api.delete("/post/" + postid);
    return response.data;
}

// FOLLOWER API
export async function followuser(username) {
    const response = await api.post("/users/follow/" + username);
    return response.data;
}

export async function unfollowuser(username) {
    const response = await api.post("/users/unfollow/" + username);
    return response.data;
}

export async function getpendingfollows() {
    const response = await api.get("/users/follow/pending");
    return response.data;
}

export async function getoutgoingfollows() {
    const response = await api.get("/users/follow/outgoing");
    return response.data;
}

export async function approvefollow(followid) {
    const response = await api.post("/users/follow/approve/" + followid);
    return response.data;
}

export async function rejectfollow(followid) {
    const response = await api.post("/users/follow/reject/" + followid);
    return response.data;
}