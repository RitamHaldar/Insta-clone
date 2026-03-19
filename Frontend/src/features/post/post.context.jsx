import { createContext, useState, useEffect } from "react";
import { 
    followuser, unfollowuser, getpendingfollows, approvefollow, rejectfollow, getoutgoingfollows,
    getfeed, getmyposts, createpost, managelike, deletepost 
} from './services/post.api';

export const PostContext = createContext();

export const PostContextProvider = ({ children }) => {
    const [loading, setloading] = useState(false);
    const [post, setpost] = useState(null);
    const [feed, setfeed] = useState([]);
    const [myPosts, setMyPosts] = useState([]);
    const [pendingFollows, setPendingFollows] = useState([]);
    const [outgoingFollows, setOutgoingFollows] = useState([]);

    const getfeedhandler = async () => {
        setloading(true);
        try {
            const response = await getfeed();
            setfeed(response.posts);
        } catch (error) {
            console.error("Failed to fetch feed:", error);
        } finally {
            setloading(false);
        }
    };

    const getMyPostsHandler = async () => {
        setloading(true);
        try {
            const response = await getmyposts();
            setMyPosts(response.posts);
        } catch (error) {
            console.error("Failed to fetch my posts:", error);
        } finally {
            setloading(false);
        }
    };

    const createposthandler = async (caption, profileimage) => {
        setloading(true);
        try {
            const response = await createpost(caption, profileimage);
            setfeed([response.post, ...feed]);
            await getMyPostsHandler(); // Refresh my posts
        } catch (error) {
            console.error("Failed to create post:", error);
        } finally {
            setloading(false);
        }
    };

    const likehandler = async (postid) => {
        try {
            await managelike(postid);
            await getfeedhandler();
        } catch (error) {
            console.error("Failed to like post:", error);
        }
    };

    const deletePostHandler = async (postid) => {
        setloading(true);
        try {
            await deletepost(postid);
            setMyPosts(prev => prev.filter(p => p._id !== postid));
            setfeed(prev => prev.filter(p => p._id !== postid));
        } catch (error) {
            console.error("Failed to delete post:", error);
        } finally {
            setloading(false);
        }
    };

    const getPendingFollowsHandler = async () => {
        setloading(true);
        try {
            const data = await getpendingfollows();
            setPendingFollows(data.records || []);
        } catch (error) {
            console.error("Failed to fetch pending follows:", error);
        } finally {
            setloading(false);
        }
    };

    const getOutgoingFollowsHandler = async () => {
        setloading(true);
        try {
            const data = await getoutgoingfollows();
            setOutgoingFollows(data.records || []);
        } catch (error) {
            console.error("Failed to fetch outgoing follows:", error);
        } finally {
            setloading(false);
        }
    };

    const followUserHandler = async (username) => {
        setloading(true);
        try {
            await followuser(username);
            await getOutgoingFollowsHandler();
        } catch (error) {
            console.error("Failed to follow user:", error);
        } finally {
            setloading(false);
        }
    };

    const unfollowUserHandler = async (username) => {
        setloading(true);
        try {
            await unfollowuser(username);
            await getOutgoingFollowsHandler();
        } catch (error) {
            console.error("Failed to unfollow user:", error);
        } finally {
            setloading(false);
        }
    };

    const approveFollowHandler = async (followid) => {
        setloading(true);
        try {
            await approvefollow(followid);
            setPendingFollows(prev => prev.filter(req => req._id !== followid));
        } catch (error) {
            console.error("Failed to approve follow:", error);
        } finally {
            setloading(false);
        }
    };

    const rejectFollowHandler = async (followid) => {
        setloading(true);
        try {
            await rejectfollow(followid);
            setPendingFollows(prev => prev.filter(req => req._id !== followid));
        } catch (error) {
            console.error("Failed to reject follow:", error);
        } finally {
            setloading(false);
        }
    };

    return (
        <PostContext.Provider value={{ 
            loading, setloading, post, setpost, feed, setfeed, myPosts,
            getfeedhandler, getMyPostsHandler, createposthandler, likehandler, deletePostHandler,
            pendingFollows, outgoingFollows, getPendingFollowsHandler, getOutgoingFollowsHandler, 
            followUserHandler, unfollowUserHandler, approveFollowHandler, rejectFollowHandler
        }}>
            {children}
        </PostContext.Provider>
    )
}