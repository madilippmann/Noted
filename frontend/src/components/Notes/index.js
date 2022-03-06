import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';


import './Notes.css'

export default function Notes() {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);

    if (!sessionUser) return (
        <Redirect to="/login" />
    );


    return (
        <div className='main'>
            Hello from the home page
        </div>
    );
}
