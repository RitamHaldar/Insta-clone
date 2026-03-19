import React, { useEffect } from 'react'
import '../style/feed.scss'
import Post from '../components/Post'
import { usePost } from '../hooks/usePost'
import { Link } from 'react-router'
import { Home, User, PlusSquare, Users, Aperture, Search, Compass, Heart, MoreHorizontal } from 'lucide-react'
import { useAuth } from '../../auth/hooks/useAuth'

const FeedPage = () => {
    const { loading, feed, post, getfeedhandler, likehandler, getOutgoingFollowsHandler } = usePost();
    const { user, getme } = useAuth();
    async function load() {
        await getme();
        await getfeedhandler();
        await getOutgoingFollowsHandler();
    }
    useEffect(() => {
        load();
    }, [])

    if (loading) {
        return (<main className='auth'>
            <p>feed is loading ....</p>
        </main>)
    }

    return (
        <main className='feedpage-page'>
            <aside className="sidebar">
                <nav className="nav-links">
                    <Link to="/" className="active"><Home size={24} /> Home</Link>
                    <Link to="/profile"><User size={24} /> Profile</Link>
                    <Link to="/create-post"><PlusSquare size={24} /> Create Post</Link>
                    <Link to="/following"><Users size={24} /> Following</Link>
                </nav>
            </aside>

            <section className="main-content">
                <header className="top-bar">

                    <div className="logo">
                        <Aperture size={28} className="logo-icon" /> Linksy
                    </div>
                    <div className="top-actions">
                        <div className="profile-pic">
                            <img src={user?.profileimage || "https://i.pravatar.cc/150?u=fallback"} alt="profile" />
                        </div>
                    </div>
                </header>
                <div className="feed-container">
                    <div className="feed-content-wrapper">
                        <div className="posts">
                            {feed.map((post) => {
                                return <Post key={post._id} user={post.user} post={post} likehandler={likehandler} />
                            })}
                        </div>
                    </div>
                </div>
            </section>
        </main>
    )
}

export default FeedPage