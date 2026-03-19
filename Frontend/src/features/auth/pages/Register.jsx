import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { useAuth } from '../hooks/useAuth'
import ErrorAlert from '../../shared/components/ErrorAlert'
import { useEffect } from 'react'

const Register = () => {
    const [username, setusername] = useState("");
    const [password, setpassword] = useState("");
    const [email, setemail] = useState("");
    const { user, loading, error, register, clearError } = useAuth();
    const navigate = useNavigate();
    const formsubmit = async (e) => {
        e.preventDefault();
        await register(username, email, password);
    }

    useEffect(() => {
        if (user) {
            navigate("/");
        }
    }, [user, navigate])
    if (loading) {
        return <main className='auth'>
            <h1>Loading.....</h1>
        </main>
    }
    return (
        <main className='auth'>
            <div className='form-container'>
                <h1>Register</h1>
                <ErrorAlert message={error} onClose={clearError} />
                <form onSubmit={formsubmit}>
                    <div className="input-group">
                        <input type="text" placeholder='Username' onInput={(e) => { setusername(e.target.value) }} required />
                    </div>
                    <div className="input-group">
                        <input type="email" placeholder='Email' onInput={(e) => { setemail(e.target.value) }} required />
                    </div>
                    <div className="input-group">
                        <input type="password" placeholder='Password' onInput={(e) => { setpassword(e.target.value) }} required />
                    </div>
                    <button className='button primary-button'>Register</button>
                    <p>Already have an account? <Link to="/login">Login</Link></p>
                </form>
            </div>
        </main>

    )
}

export default Register