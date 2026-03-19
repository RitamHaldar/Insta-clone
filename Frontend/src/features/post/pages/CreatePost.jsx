import React, { useState, useRef } from 'react'
import { usePost } from '../hooks/usePost'
import "../style/createpost.scss"
import { useNavigate, Link } from 'react-router'
import { Aperture, Home, User, PlusSquare, Users, Image as ImageIcon } from 'lucide-react'
import { useAuth } from '../../auth/hooks/useAuth'

const CreatePost = () => {
    const { user } = useAuth();
    const { loading, createposthandler } = usePost();
    const navigate = useNavigate();
    const [caption, setcaption] = useState("");
    const postimage = useRef(null)

    const formsubmit = (e) => {
        e.preventDefault();
        createposthandler(caption, postimage.current.files[0]);
        navigate("/");
    }

    if (loading) {
        return <main className='auth'>
            <p>Loading....</p>
        </main>
    }

    return (
        <main className='feedpage-page'>
            {/* LEFT SIDEBAR */}
            <aside className="sidebar">
                <nav className="nav-links">
                    <Link to="/"><Home size={24} /> Home</Link>
                    <Link to="/profile"><User size={24} /> Profile</Link>
                    <Link to="/create-post" className="active"><PlusSquare size={24} /> Create Post</Link>
                    <Link to="/following"><Users size={24} /> Following</Link>
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

                <div className="createpostpage">
                    <header className="create-header">
                        <h1>Create New Post</h1>
                    </header>

                    <div className="createpost-container">
                        <form onSubmit={formsubmit}>
                            <div className="input-group">
                                <label htmlFor="image">Upload Image</label>
                                <div className="file-upload-box">
                                    <ImageIcon size={32} color="#94a3b8" style={{ marginBottom: '1rem' }} />
                                    <input ref={postimage} type="file" id='image' name='imageupload' required />
                                </div>
                            </div>

                            <div className="input-group">
                                <label htmlFor="caption">Caption</label>
                                <textarea
                                    value={caption}
                                    onInput={(e) => { setcaption(e.target.value) }}
                                    placeholder="What's on your mind?"
                                    id="caption"
                                    rows="4"
                                    required
                                />
                            </div>

                            <button className='primary-button'>Share Post</button>
                        </form>
                    </div>
                </div>
            </section>
        </main>
    )
}

export default CreatePost