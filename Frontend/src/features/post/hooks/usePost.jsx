import { useContext } from 'react'
import { PostContext } from '../post.context'

export const usePost = () => {
    return useContext(PostContext);
}