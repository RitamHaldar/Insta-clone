import React, { useEffect } from 'react'
import '../style/feed.scss'
import Post from '../components/Post'
import { usePost } from '../hooks/usePost'
import { Link } from 'react-router'
const FeedPage = () => {
    const { loading, feed, post, getfeedhandler, likehandler } = usePost();
    useEffect(() => {
        getfeedhandler()
    }, [])
    if (loading) {
        return (<main className='auth'>
            <p>feed is loading ....</p>
        </main>)
    }
    return (
        <main className='feedpage-page'>
            <div className="feed">
                <div className="options">
                    <Link to="/create-post">Post</Link>
                </div>
                <div className="posts">
                    {feed.map((post) => {
                        return <Post user={post.user} post={post} likehandler={likehandler} />
                    })}
                </div>

            </div>

        </main>
    )
}

export default FeedPage