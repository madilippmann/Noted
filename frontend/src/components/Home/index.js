import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';

import Navigation from '../Navigation';

import './Home.css'

export default function Home() {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);

    useEffect(() => {
        console.log('Home page component loaded');
    }, [])

    if (!sessionUser) return (
        <Redirect to="/login" />
    );


    return (
        <div className='main'>
            <Navigation />
            Hello from the home page

        </div>
    );
}
