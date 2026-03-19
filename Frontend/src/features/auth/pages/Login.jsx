import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { useAuth } from '../hooks/useAuth'
import "../style/form.scss"
const Login = () => {
    const [Username, setUsername] = useState("");
    const [Password, setPassword] = useState("");
    const { user, loading, login } = useAuth();
    const navigate = useNavigate();
    const formsubmit = async (e) => {
        e.preventDefault();
        await login(Username, Password);
        navigate("/");
    }
    if (loading) {
        return <main className='auth'>
            <h1>Loading.....</h1>
        </main>
    }
    return (
        <main className='auth'>
            <div className="form-container">
                <h1>Login</h1>
                <form onSubmit={formsubmit}>
                    <div className="input-group">
                        <input type="text" placeholder='Username' onInput={(e) => { setUsername(e.target.value) }} required />
                    </div>
                    <div className="input-group">
                        <input type="password" placeholder='Password' onInput={(e) => { setPassword(e.target.value) }} required />
                    </div>
                    <button className='button primary-button' type='submit'>Login</button>
                    <p>Don't have an account? <Link to="/register">Register</Link></p>
                </form>
            </div>
        </main>
    )
}

export default Login