import { getfeed } from '../services/post.api'
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
    return { loading, feed, post, getfeedhandler }
}