import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, Link, useHistory } from 'react-router-dom';

import { UilPlusCircle } from '@iconscout/react-unicons'
import * as notesActions from '../../store/notes';

import { formattedDate, OuterDiv, shortenedContent, sortByUpdatedAt } from '../utils/utils.js'

import './Notes.css'
import Note from '../Note';

export default function Notes() {
    const dispatch = useDispatch();
    const history = useHistory();

    const notes = useSelector(state => state.notes.notes);

    let formattedNotes = []

    Object.entries(notes).map(rawNote => {
        let note = {}
        note.title = rawNote[1].title
        note.notebookId = rawNote[1].notebookId
        note.id = rawNote[1].id
        note.userId = rawNote[1].userId
        note.content = shortenedContent(rawNote[1].content)
        note.updatedAt = formattedDate(rawNote[1].updatedAt)
        formattedNotes.push(note)
    })

    formattedNotes = sortByUpdatedAt(formattedNotes)


    // useEffect(() => {
    // }, [])


    const handleClick = async () => {
        const noteId = await dispatch(notesActions.createNoteThunk(formattedNotes[1].userId))
        history.push(`/notes/${noteId}`)
        return <Redirect to={`/notes/${noteId}`} />
    }

    return (
        <OuterDiv className='main notes-page-outer-container'>
            <div className='notes-page-container'>
                <h1 className='notes-title'>Notes</h1>
                <div className='notes-container'>
                    <button type='button' onClick={handleClick}>
                        <div className='create-note-card square-card'>
                            <UilPlusCircle size='75' />
                            <h2 className='add-card-title'>New Note</h2>
                        </div>
                    </button>


                    {formattedNotes.map(note => (
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

        </OuterDiv>
    );
}
