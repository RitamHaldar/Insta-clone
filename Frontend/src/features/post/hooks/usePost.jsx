import { createpost, getfeed, managelike } from '../services/post.api'
import { useContext } from 'react'
import { PostContext } from '../post.context'
export const usePost = () => {
    const { loading, setloading, post, setpost, feed, setfeed } = useContext(PostContext);
    const getfeedhandler = async () => {
        setloading(true);
        const response = await getfeed()
        setloading(false)
        setfeed(response.posts)

    }
    const createposthandler = async (profileimage, caption) => {
        setloading(true);
        const response = await createpost(profileimage, caption);
        setloading(false)
        setfeed([response.post, ...feed]);
    }
    const likehandler = async (postid) => {
        await managelike(postid);
        await getfeedhandler();
    }
    return { loading, feed, post, getfeedhandler, createposthandler, likehandler }
}