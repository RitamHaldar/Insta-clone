import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import "../style/form.scss"
import { useAuth } from '../hooks/useAuth'
const Register = () => {
    const [username, setusername] = useState("");
    const [password, setpassword] = useState("");
    const [email, setemail] = useState("");
    const { user, loding, login, register } = useAuth();
    const navigate = useNavigate();
    const formsubmit = async (e) => {
        e.preventDefault();
        await register(username, email, password);
        navigate("/");
    }
    if (loding) {
        return <main className='auth'>
            <h1>Loading.....</h1>
        </main>
    }
    return (
        <main className='auth'>
            <div className='form-container'>
                <h1>Register</h1>
                <form onSubmit={formsubmit}>
                    <input type="text" placeholder='Enter Username' onInput={(e) => { setusername(e.target.value) }} />
                    <input type="text" placeholder='Enter Email' onInput={(e) => { setemail(e.target.value) }} />
                    <input type="password" placeholder='Enter Password' onInput={(e) => { setpassword(e.target.value) }} />
                    <button className='button primary-button'>Register</button>
                    <p>Already have an account? <Link>  login</Link></p>
                </form>
            </div>
        </main>

    )
}

export default Register