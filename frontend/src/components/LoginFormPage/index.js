import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';

import * as sessionActions from '../../store/session';
import * as notesActions from '../../store/notes';

import RubberBand from '../Animations/RubberBand';
import './LoginForm.css'
import logo from '../static/images/noted-logo.png';
import { Button } from './StyledComponents.js';

export default function LoginFormPage() {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState([]);
    const [errorsDisplay, setErrorsDisplay] = useState('none')

    useEffect(() => {
        if (errors.length > 0) setErrorsDisplay('block')
        else setErrorsDisplay('none')
    }, [errors])

    if (sessionUser) return (
        <Redirect to="/" />
    );

    const demoLogin = () => {
        dispatch(sessionActions.login({ credential: 'demo@user.io', password: 'password' }))
    }

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
        <div className='body'>
            <div className='login-container'>
                <div className='img-container'>
                    <RubberBand>
                        <img className='logo-image' src={logo} />
                    </RubberBand>
                </div>

                <h1>Log In</h1>

                <form onSubmit={handleSubmit}>
                    <ul className='errors-display' style={{ display: { errorsDisplay } }}>
                        {errors.map((error, idx) => <li className='list-errors' key={idx}>{error}</li>)}
                    </ul>
                    <input
                        className='emailInput'
                        name='email'
                        type='email'
                        placeholder='Email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        autocomplete='off'
                    />

                    <input
                        className='passwordInput'
                        name='password'
                        type='password'
                        placeholder='Password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        autocomplete='off'
                    />

                    <button className='submit-button' type='submit'>Submit</button>
                </form>

                <div className='sign-in-and-demo-buttons'>
                    <Link to='/signup'>
                        <button className='smaller-buttons' type='button'>Sign Up</button>
                    </Link>
                    <button onClick={demoLogin} className='smaller-buttons' type='button'>Demo</button>
                </div>
            </div>
        </div>
    );
}
