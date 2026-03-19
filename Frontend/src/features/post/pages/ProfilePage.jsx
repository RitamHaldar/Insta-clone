import React, { useEffect } from 'react'
import { Link } from 'react-router'
import { Home, User, PlusSquare, Users, Aperture, Grid, Trash2 } from 'lucide-react'
import { usePost } from '../hooks/usePost'
import { useAuth } from '../../auth/hooks/useAuth'
import '../style/profile.scss'

const ProfilePage = () => {
    const { user } = useAuth();
    const { myPosts, getMyPostsHandler, deletePostHandler, loading } = usePost();

    useEffect(() => {
        getMyPostsHandler();
    }, []);

    const handleDelete = async (e, postId) => {
        e.stopPropagation();
        if (window.confirm("Are you sure you want to delete this post?")) {
            await deletePostHandler(postId);
        }
    }

    return (
        <main className='feedpage-page'>
            {/* LEFT SIDEBAR */}
            <aside className="sidebar">
                <nav className="nav-links">
                    <Link to="/"><Home size={24} /> Home</Link>
                    <Link to="/profile" className="active"><User size={24} /> Profile</Link>
                    <Link to="/create-post"><PlusSquare size={24} /> Create Post</Link>
                    <Link to="/following"><Users size={24} /> Following</Link>
                </nav>
            </aside>

            {/* MAIN CONTENT AREA */}
            <section className="main-content">
                <header className="top-bar">
                    <div className="logo">
                        <Aperture size={28} className="logo-icon" /> Linksy
                    </div>
                </header>

                <div className="profile-page">
                    <header className="profile-header">
                        <div className="profile-info">
                            <div className="profile-avatar">
                                <img src={user?.profileimage || "https://i.pravatar.cc/150?u=fallback"} alt="profile" />
                            </div>
                            <div className="profile-details">
                                <div className="user-line">
                                    <h2>{user?.username}</h2>
                                    <button className="edit-profile-btn">Edit Profile</button>
                                </div>
                                <div className="stats-line">
                                    <div className="stat"><span>{myPosts.length}</span> posts</div>
                                    <div className="stat"><span>0</span> followers</div>
                                    <div className="stat"><span>0</span> following</div>
                                </div>
                                <div className="bio-line">
                                    <div className="full-name">{user?.username}</div>
                                    <div className="bio-text">{user?.bio || "No bio yet."}</div>
                                </div>
                            </div>
                        </div>
                    </header>

                    <div className="profile-content">
                        <div className="content-tabs">
                            <div className="tab active">
                                <Grid size={14} /> POSTS
                            </div>
                        </div>

                        {loading && <p style={{ textAlign: 'center', padding: '2rem' }}>Loading posts...</p>}

                        {!loading && myPosts.length === 0 ? (
                            <div className="empty-posts">
                                <PlusSquare size={48} className="icon" />
                                <h3>Share Photos</h3>
                                <p>When you share photos, they will appear on your profile.</p>
                                <Link to="/create-post" style={{ color: '#8b5cf6', fontWeight: 'bold', marginTop: '1rem', display: 'inline-block' }}>
                                    Create your first post
                                </Link>
                            </div>
                        ) : (
                            <div className="posts-grid">
                                {myPosts.map((post) => (
                                    <div className="grid-item" key={post._id}>
                                        <img src={post.imageurl} alt="post" />
                                        <div className="overlay">
                                            <button
                                                className="delete-overlay-btn"
                                                onClick={(e) => handleDelete(e, post._id)}
                                                title="Delete Post"
                                            >
                                                <Trash2 size={20} />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </section>
        </main>
    )
}

export default ProfilePage
