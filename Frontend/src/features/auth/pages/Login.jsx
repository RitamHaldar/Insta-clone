import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { useAuth } from '../hooks/useAuth'
import "../style/form.scss"
const Login = () => {
    const [Username, setUsername] = useState("");
    const [Password, setPassword] = useState("");
    const { user, loding, login, register } = useAuth();
    const navigate = useNavigate();
    const formsubmit = async (e) => {
        e.preventDefault();
        await login(Username, Password);
        navigate("/");
    }
    if (loding) {
        return <main>
            <h1>Loading.....</h1>
        </main>
    }
    return (
        <main>
            <div className="form-container">

                <h1>Login</h1>
                <form >
                    <input type="text" placeholder='Username' onInput={(e) => { setUsername(e.target.value) }} />
                    <input type="password" placeholder='Password' onInput={(e) => { setPassword(e.target.value) }} />
                    <button className='button primary-button' type='submit' onClick={formsubmit}>Login</button>
                    <p>Don't have an account?<Link>  register</Link></p>
                </form>
            </div>
        </main>

    )
}

export default Login