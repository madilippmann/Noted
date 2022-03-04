import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';

import * as sessionActions from '../../store/session';

import '../LoginFormPage/LoginForm.css'
import logo from '../static/images/noted-logo.png';
import { AttentionSeeker } from "react-awesome-reveal";

export default function SignupFormPage() {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);

    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errors, setErrors] = useState([]);
    const [errorsDisplay, setErrorsDisplay] = useState('none')

    useEffect(() => {
        if (errors.length > 0) setErrorsDisplay('block')
        else setErrorsDisplay('none')
    }, [errors])

    if (sessionUser) return (
        <Redirect to="/" />
    );


    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password === confirmPassword) {
            setErrors([]);
            return dispatch(sessionActions.signup({
                email,
                firstName,
                lastName,
                password
            })).catch(async (res) => {
                const data = await res.json();

                if (data && data.errors) setErrors(data.errors)
            })
        }
        return setErrors(['Passwords must match']);

    }

    return (
        <div className='login-container'>
            <div className='img-container'>
                <AttentionSeeker effect='rubberBand' triggerOnce>
                    <img src={logo} />
                </AttentionSeeker>
            </div>

            <h1>Log In</h1>

            <form onSubmit={handleSubmit}>
                <ul style={{ display: { errorsDisplay } }}>
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
                    autocomplete='off'
                />

                <input
                    className='firstNameInput'
                    name='firstName'
                    type='text'
                    placeholder='First name'
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                    autocomplete='off'
                />

                <input
                    className='lastNameInput'
                    name='lastName'
                    type='text'
                    placeholder='Last name'
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
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

                <input
                    className='confirmPasswordInput'
                    name='confirmPassword'
                    type='password'
                    placeholder='Confirm password'
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    autocomplete='off'
                />

                <button className='submit-button' type='submit'>Submit</button>
            </form>


            <div className='login-link'>
                <Link to='/login'>Log In</Link>
            </div>
        </div>
    );
}
