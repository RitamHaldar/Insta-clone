import React, { useEffect } from 'react'
import { Link } from 'react-router'
import { Home, User, PlusSquare, Users, Aperture, Clock, Check, X, Send, UserCheck } from 'lucide-react'
import { usePost } from '../hooks/usePost'
import { useAuth } from '../../auth/hooks/useAuth'
import '../style/following.scss'

const FollowingPage = () => {
    const { user } = useAuth();
    const {
        loading,
        pendingFollows,
        outgoingFollows,
        getPendingFollowsHandler,
        getOutgoingFollowsHandler,
        approveFollowHandler,
        rejectFollowHandler,
        unfollowUserHandler
    } = usePost();

    useEffect(() => {
        getPendingFollowsHandler();
        getOutgoingFollowsHandler();
    }, []);

    // Filter outgoingFollows into pending and already following
    const pendingOutgoing = outgoingFollows.filter(r => r.status === "Pending");
    const activeFollowing = outgoingFollows.filter(r => r.status === "Following");

    return (
        <main className='feedpage-page'>
            {/* LEFT SIDEBAR */}
            <aside className="sidebar">
                <nav className="nav-links">
                    <Link to="/"><Home size={24} /> Home</Link>
                    <Link to="/profile"><User size={24} /> Profile</Link>
                    <Link to="/create-post"><PlusSquare size={24} /> Create Post</Link>
                    <Link to="/following" className="active"><Users size={24} /> Following</Link>
                </nav>
            </aside>

            {/* MAIN CONTENT AREA */}
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

                <div className="following-page">
                    <header className="following-header">
                        <h1>Network Management</h1>
                    </header>

                    <div className="following-container">
                        {/* INCOMING REQUESTS */}
                        <div className="section-group">
                            <h2 className="section-title">
                                <Clock size={18} /> Pending Incoming ({pendingFollows.length})
                            </h2>
                            {pendingFollows.length === 0 && <p className="empty-subtext">No pending incoming requests</p>}
                            <div className="requests-list">
                                {pendingFollows.map((req) => (
                                    <div className="request-card" key={req._id}>
                                        <div className="user-info">
                                            <div className="user-details">
                                                <span className="username">{req.follower}</span>
                                                <span className="timestamp">Wants to follow you</span>
                                            </div>
                                        </div>
                                        <div className="action-buttons">
                                            <button className="approve-btn" onClick={() => approveFollowHandler(req._id)}><Check size={16} /> Approve</button>
                                            <button className="reject-btn" onClick={() => rejectFollowHandler(req._id)}><X size={16} /> Reject</button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* OUTGOING REQUESTS */}
                        <div className="section-group" style={{ marginTop: '3rem' }}>
                            <h2 className="section-title">
                                <Send size={18} /> Outgoing Requests ({pendingOutgoing.length})
                            </h2>
                            {pendingOutgoing.length === 0 && <p className="empty-subtext">No outgoing requests sent</p>}
                            <div className="requests-list">
                                {pendingOutgoing.map((req) => (
                                    <div className="request-card" key={req._id}>
                                        <div className="user-info">
                                            <div className="user-details">
                                                <span className="username">{req.followee}</span>
                                                <span className="timestamp">Status: Requested</span>
                                            </div>
                                        </div>
                                        <div className="action-buttons">
                                            <button className="reject-btn" onClick={() => unfollowUserHandler(req.followee)}>Cancel</button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* FOLLOWING LIST */}
                        <div className="section-group" style={{ marginTop: '3rem' }}>
                            <h2 className="section-title">
                                <UserCheck size={18} /> Currently Following ({activeFollowing.length})
                            </h2>
                            {activeFollowing.length === 0 && <p className="empty-subtext">You are not following anyone yet</p>}
                            <div className="requests-list">
                                {activeFollowing.map((req) => (
                                    <div className="request-card" key={req._id}>
                                        <div className="user-info">
                                            <div className="user-details">
                                                <span className="username">{req.followee}</span>
                                                <span className="timestamp">You are following</span>
                                            </div>
                                        </div>
                                        <div className="action-buttons">
                                            <button className="reject-btn" onClick={() => unfollowUserHandler(req.followee)}>Unfollow</button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    )
}

export default FollowingPage
