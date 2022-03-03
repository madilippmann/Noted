import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

import * as sessionActions from '../../store/session';

import './LoginForm.css'

export default function LoginFormPage() {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [formValidations, setFormValidations] = useState([]);
    const [errors, setErrors] = useState([]);


    if (sessionUser) return (
        <Redirect to="/" />
    );



    useEffect(() => {
        const errors = [];

        if (!email || email.length < 1) {
            errors.push("Email must not be empty");
        }

        if (!password || password.length < 1) {
            errors.push("Password must not be empty");
        }

        setFormValidations(errors)
    }, [email, password])


    const handleSubmit = async (e) => {
        e.preventDefault();

        setErrors([]);

        return dispatch(sessionActions.login({
            credential: email,
            password
        })).catch(async (res) => {
            const data = await res.json();

            if (data && data.errors) setErrors(data.errors)
        })
    }

    return (
        <div className='login-container'>
            <h1>Log In</h1>

            <form onSubmit={handleSubmit}>
                <ul>
                    {errors.map((error, idx) => <li key={idx}>{error}</li>)}
                </ul>
                <input
                    className='emailInput'
                    name='email'
                    type='email'
                    placeholder='Email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />

                <input
                    className='passwordInput'
                    name='password'
                    type='password'
                    placeholder='Password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />

                <button type='submit'>Submit</button>
            </form>

            <div>
                <button type='button'>Sign Up</button>
                <button type='button'>Demo</button>
            </div>
        </div>
    );
}
