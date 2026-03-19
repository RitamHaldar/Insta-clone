import React from 'react'
import { Heart, MessageCircle, Send, Bookmark } from 'lucide-react'
import { usePost } from '../hooks/usePost'

import { useAuth } from '../../auth/hooks/useAuth'

const Post = ({ user, post, likehandler }) => {
    const { user: currentUser } = useAuth();
    const { followUserHandler, outgoingFollows } = usePost();

    const isRequested = outgoingFollows.some(req => req.followee === user.username && req.status === "Pending");
    const isFollowing = outgoingFollows.some(req => req.followee === user.username && req.status === "Following");
    return (
        <article className='post'>
            <header className="post-header">
                <div className="user-info">
                    <div className="profileimagewrapper">
                        <img src={user.profileimage} alt="" />
                    </div>
                    <div className="user-text">
                        <div className="user-name-line">
                            <span className="username">{user.username}</span>
                            <span className="dot">•</span>
                            <span className="time">2h</span>
                        </div>
                        <span className="sub-text">Original Audio</span>
                    </div>
                </div>
                {currentUser?.username !== user.username && (
                    <button
                        className={`follow-btn ${(isRequested || isFollowing) ? 'requested' : ''}`}
                        onClick={() => !isRequested && !isFollowing && followUserHandler(user.username)}
                        disabled={isRequested || isFollowing}
                    >
                        {isFollowing ? 'Following' : isRequested ? 'Requested' : 'Follow'}
                    </button>
                )}
            </header>

            <div className="post-image">
                <img src={post.imageurl} alt="post content" />
            </div>

            <div className="post-actions">
                <div className="left-actions">
                    <button onClick={async () => { await likehandler(post._id) }} className={`action-btn ${post.isliked ? "liked" : ""}`}>
                        <Heart className={post.isliked ? "liked-icon" : "icon"} fill={post.isliked ? "currentColor" : "none"} />
                    </button>
                    <button className="action-btn">
                        <MessageCircle className="icon" />
                    </button>
                    <button className="action-btn">
                        <Send className="icon" />
                    </button>
                </div>
                <div className="right-actions">
                    <button className="action-btn">
                        <Bookmark className="icon" />
                    </button>
                </div>
            </div>

            <div className="post-likes">
                1,024 likes
            </div>

            <div className="post-caption-box">
                <span className="caption-username">{user.username}</span>
                <span className="caption-text"> {post.caption}</span>
            </div>

            <div className="post-comments-link">
                View all 24 comments
            </div>
        </article>
    )
}

export default Post