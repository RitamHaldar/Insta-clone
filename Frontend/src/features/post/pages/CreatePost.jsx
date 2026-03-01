import React, { useState, useRef } from 'react'
import { usePost } from '../hooks/usePost'
import "../style/createpost.scss"
import { useNavigate } from 'react-router'
const CreatePost = () => {
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
        <main className='createpostpage'>
            <div className="createpostwrapper">
                <h2>Create Post</h2>
                <form onSubmit={formsubmit}>
                    <input ref={postimage} type="file" id='image' name='imageupload' />
                    <input value={caption} onInput={(e) => { setcaption(e.target.value) }} type="text" name="caption" id="caption" />
                    <button className='button primary-button'>Submit</button>
                </form>
            </div>
        </main>
    )
}

export default CreatePost