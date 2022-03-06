import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, Link, Switch, Route } from 'react-router-dom';

import * as notesActions from '../../store/notes';

import './Notes.css'
import Note from '../Note';


function formattedDate(date) {
    let yearMonthDay = date.split('T')[0].split('-');
    let year = yearMonthDay[0];
    let month = yearMonthDay[1];
    let day = yearMonthDay[2];

    let time = date.split('T')[1].split('.')[0].split(':');

    let ampm = '';

    let minute = time[1];
    let hour = time[0];

    if (Number(hour) > 12) {
        hour = `${Number(hour) - 12}`;
        ampm = 'PM';
    } else {
        hour = `${Number(hour)}`;
        ampm = 'AM';
    }

    return `${month}-${day}-${year} ${hour}:${minute} ${ampm}`


}

function shortedContent(content) {
    if (content < 100) return content;

    let newContent = content;
    while (newContent.length >= 100) {
        newContent = newContent.split(' ')
        newContent.pop()
        newContent = newContent.join(' ')
    }

    return newContent;
}

export default function Notes() {
    const dispatch = useDispatch();

    const sessionUser = useSelector(state => state.session.user);
    const rawNotes = useSelector(state => state.notes.notes);

    const notes = []

    Object.entries(rawNotes).map(rawNote => {
        let note = {}
        note.title = rawNote[1].title
        note.notebookId = rawNote[1].notebookId
        note.id = rawNote[1].id
        note.content = shortedContent(rawNote[1].content)
        note.updatedAt = formattedDate(rawNote[1].updatedAt)
        notes.push(note)
    })

    console.log(notes);
    useEffect(() => {
        // Object.entries(notes).forEach(note => console.log(note))
    }, [])

    const handleClick = async () => {
        const noteId = dispatch(notesActions.createNoteThunk(sessionUser.id))
        return <Redirect to={`/notes/${noteId}`} />
    }

    return (
        <div className='main notes-page-outer-container'>
            <div className='notes-page-container'>
                <h1 className='notes-title'>Notes</h1>
                <div className='notes-container'>
                    <button type='button' onClick={handleClick}>
                        <div className='create-note-card square-card'>
                            Create Note
                        </div>
                    </button>


                    {notes.map(note => (
                        <Link to={`/notes/${note.id}`} >
                            <div key={note.id} className='square-card note-card'>
                                <h3 className='note-card-title'>{note.title}</h3>
                                <p className='note-card-content'>{note.content}</p>
                                <p className='note-card-date'>{note.updatedAt}</p>
                            </div>
                        </Link>
                    ))}

                </div>
            </div>

            <Switch>
                <Route path={`/notes/:noteId`}>
                    {/* <Note /> */}
                </Route>
            </Switch>

        </div>
    );
}
