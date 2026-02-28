import React, { useEffect } from 'react'
import '../style/feed.scss'
import Post from '../components/Post'
import { usePost } from '../hooks/usePost'
const FeedPage = () => {
    const { loading, feed, post, getfeedhandler } = usePost();
    useEffect(() => {
        getfeedhandler()
    }, [])
    if (loading) {
        return (<main>
            <p>feed is loading ....</p>
        </main>)
    }
    return (
        <main className='feedpage-page'>
            <div className="feed">
                <div className="posts">
                    {feed.map((post) => {
                        return <Post user={post.user} post={post} />
                    })}
                </div>

            </div>

        </main>
    )
}

export default FeedPage