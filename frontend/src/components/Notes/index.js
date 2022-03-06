import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, Link, Switch, Route } from 'react-router-dom';

import * as notesActions from '../../store/notes';

import './Notes.css'
import Note from '../Note';

export default function Notes() {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const notes = useSelector(state => state.notes.notes);

    useEffect(() => {
        Object.entries(notes).forEach(note => console.log(note))
    }, [])

    const handleClick = async () => {
        const noteId = dispatch(notesActions.createNoteThunk(sessionUser.id))
        return <Redirect to={`/notes/${noteId}`} />
    }

    return (
        <div className='main notes-page-outer-container'>
            <div className='notes-page-container'>
                <h1>Notes</h1>
                <div className='notes-container'>
                    <button type='button' onClick={handleClick}>
                        <div className='create-note-card square-card'>
                            Create Note
                        </div>
                    </button>


                    {Object.entries(notes).map(note => (
                        <Link to={`/notes/${+note[0]}`} >
                            <div key={+note[0]} className='square-card note-card'>
                                <h3 className='note-card-title'>{note[1].title}</h3>
                                <p className='note-card-content'>{note[1].content}</p>
                                <p className='note-card-date'>{note[1].updatedAt}</p>
                            </div>
                        </Link>
                    ))}

                </div>
            </div>

            <Switch>
                <Route path={`/notes/:noteId`}>
                    <Note />
                </Route>
            </Switch>

        </div>
    );
}
