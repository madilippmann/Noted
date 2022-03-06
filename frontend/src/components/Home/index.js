import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';

import * as notesActions from '../../store/notes';

import './Home.css'

export default function Home() {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const notes = useSelector(state => state.notes.notes);

    useEffect(() => {
        dispatch(notesActions.loadNotesThunk(sessionUser.id))
    }, [dispatch])


    return (
        <div className='main'>
            Hello from the home page
        </div>
    );
}
