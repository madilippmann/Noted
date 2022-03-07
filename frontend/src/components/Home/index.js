import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, Link, useHistory } from 'react-router-dom';

import * as notesActions from '../../store/notes';
import { formattedDate, sortByUpdatedAt, shortenedContent } from '../utils/utils.js';

import { UilPlusCircle } from '@iconscout/react-unicons';


import * as SC from './StyledComponents.js';
import { OuterDiv } from '../utils/utils.js'
import './Home.css'

export default function Home() {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const notes = useSelector(state => state.notes.notes);
    const history = useHistory();

    useEffect(() => {
        dispatch(notesActions.loadNotesThunk(sessionUser.id))
    }, [dispatch])

    let formattedNotes = [];
    Object.entries(notes).forEach(rawNote => {
        let note = {};
        note.title = rawNote[1].title;
        note.notebookId = rawNote[1].notebookId;
        note.id = rawNote[1].id;
        note.userId = rawNote[1].userId;
        note.content = shortenedContent(rawNote[1].content);
        note.updatedAt = formattedDate(rawNote[1].updatedAt);
        formattedNotes.push(note);
    })

    formattedNotes = sortByUpdatedAt(formattedNotes).slice(0, 6);

    const addNote = async () => {
        const noteId = await dispatch(notesActions.createNoteThunk(sessionUser.id))
        history.push(`/notes/${noteId}`)
        return <Redirect to={`/notes/${noteId}`} />
    }

    return (
        <OuterDiv className='main' style={{ padding: '50px', display: 'flex', flexDirection: 'column' }}>
            <SC.Backdrop >
                <SC.H1>Recent Notes</SC.H1>
                <SC.NotesContainer>
                    {formattedNotes.map(note => (
                        <Link to={`/notes/${note.id}`} >
                            <div key={note.id} className='square-card note-card'>
                                <h3 className='note-card-title'>{note.title}</h3>
                                <p className='note-card-content'>{note.content}</p>
                                <p className='note-card-date'>{note.updatedAt}</p>
                            </div>
                        </Link>
                    ))}
                    <button type='button' onClick={addNote} style={{ border: 'none' }}>
                        <div className='create-note-card square-card home-page'>
                            <UilPlusCircle size='75' />
                            <h2 className='add-card-title'>New Note</h2>
                        </div>
                    </button>
                </SC.NotesContainer>
            </SC.Backdrop>

            <SC.CenteringDiv >
                {/* FOR STICKY NOTE */}
                {/* <SC.Backdrop>

                </SC.Backdrop> */}

                {/* FOR NOTEBOOKS */}
                {/* <SC.Backdrop>

                </SC.Backdrop> */}

            </SC.CenteringDiv>
        </OuterDiv>
    );
}
