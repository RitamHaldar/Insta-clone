import axios from "axios";

const api = axios.create({
    baseURL: "https://linksy-hfe8.onrender.com/api",
    withCredentials: true
})

const handleError = (error, defaultMessage) => {
    const message = error.response?.data?.message || defaultMessage;
    throw new Error(message);
}

export async function getfeed() {
    try {
        const response = await api.get("/post/get-feed");
        return response.data
    } catch (error) {
        handleError(error, "Failed to fetch feed.");
    }
}

export async function getmyposts() {
    try {
        const response = await api.get("/post/");
        return response.data;
    } catch (error) {
        handleError(error, "Failed to fetch your posts.");
    }
}

export async function createpost(caption, profileimage) {
    try {
        const form = new FormData();
        form.append('caption', caption);
        form.append('test', profileimage);

        const response = await api.post("/post", form);
        return response.data;
    } catch (error) {
        handleError(error, "Failed to create post.");
    }
}

export async function managelike(postid) {
    try {
        await api.post("/post/" + postid);
    } catch (error) {
        handleError(error, "Failed to update like status.");
    }
}

export async function deletepost(postid) {
    try {
        const response = await api.delete("/post/" + postid);
        return response.data;
    } catch (error) {
        handleError(error, "Failed to delete post.");
    }
}

// FOLLOWER API
export async function followuser(username) {
    try {
        const response = await api.post("/users/follow/" + username);
        return response.data;
    } catch (error) {
        handleError(error, `Failed to follow ${username}.`);
    }
}

export async function unfollowuser(username) {
    try {
        const response = await api.post("/users/unfollow/" + username);
        return response.data;
    } catch (error) {
        handleError(error, `Failed to unfollow ${username}.`);
    }
}

export async function getpendingfollows() {
    try {
        const response = await api.get("/users/follow/pending");
        return response.data;
    } catch (error) {
        handleError(error, "Failed to fetch pending follow requests.");
    }
}

export async function getoutgoingfollows() {
    try {
        const response = await api.get("/users/follow/outgoing");
        return response.data;
    } catch (error) {
        handleError(error, "Failed to fetch outgoing follow requests.");
    }
}

export async function approvefollow(followid) {
    try {
        const response = await api.post("/users/follow/approve/" + followid);
        return response.data;
    } catch (error) {
        handleError(error, "Failed to approve follow request.");
    }
}

export async function rejectfollow(followid) {
    try {
        const response = await api.post("/users/follow/reject/" + followid);
        return response.data;
    } catch (error) {
        handleError(error, "Failed to reject follow request.");
    }
}