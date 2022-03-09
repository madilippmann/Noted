import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, Link, useHistory } from 'react-router-dom';

import * as notesActions from '../../store/notes';
import * as notebooksActions from '../../store/notebooks';

import { formatNotebooks, formatNotes, formattedDate, sortByUpdatedAt, shortenedContent } from '../utils/utils.js';

import { UilPlusCircle, UilBook } from '@iconscout/react-unicons';


import * as SC from './StyledComponents.js';
import { OuterDiv } from '../utils/utils.js'
import './Home.css'

export default function Home() {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const notes = useSelector(state => state.notes.notes);
    const notebooks = useSelector(state => state.notebooks.notebooks);

    const history = useHistory();

    let storedScratch = localStorage.getItem('scratch-demo')
    console.log(storedScratch);

    const [scratchPad, setScratchPad] = useState(localStorage.getItem('scratch-pad') || '')

    useEffect(() => {
        console.log(scratchPad);
    }, [scratchPad])


    useEffect(() => {
        dispatch(notesActions.loadNotesThunk(sessionUser.id))
    }, [dispatch])

    let formattedNotes = sortByUpdatedAt(formatNotes(notes)).slice(0, 6);
    let formattedNotebooks = sortByUpdatedAt(formatNotebooks(notebooks)).slice(0, 6);

    const addNote = async () => {
        const noteId = await dispatch(notesActions.createNoteThunk(sessionUser.id))
        history.push(`/notes/${noteId}`)
        return <Redirect to={`/notes/${noteId}`} />
    }


    const addNotebook = async () => {
        const notebookId = await dispatch(notebooksActions.createNotebookThunk(sessionUser.id))
        history.push(`/notebooks/${notebookId}`)
        return <Redirect to={`/notes/${notebookId}`} />
    }

    return (
        <OuterDiv className='main' style={{ padding: '50px', display: 'flex', flexDirection: 'column' }}>
            <SC.Backdrop >
                <SC.H1>Recent Notes</SC.H1>
                <SC.NotesContainer>
                    {formattedNotes.map(note => (
                        <Link to={`/notes/${note.id}`} >
                            <div key={note.id} className='square-card note-card no-border'>
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

            <SC.BottomDiv >

                <SC.NotebooksContainer>
                    <SC.H1>Recent Notebooks</SC.H1>
                    <SC.NotesContainer>
                        {formattedNotebooks.map(notebook => (
                            <Link to={`/notebooks/${notebook.id}`} >
                                <div key={notebook.id} id='notebook-card' className='square-card note-card'>
                                    <UilBook size='50' />
                                    <h3 className='notebook-title note-card-title'>{notebook.title}</h3>
                                    {/* <p className='note-card-date'>{notebook.updatedAt}</p> */}
                                </div>
                            </Link>
                        ))}
                        <button type='button' onClick={addNotebook} style={{ border: 'none' }}>
                            <div className='create-note-card square-card home-page blue-card no-border'>
                                <UilPlusCircle size='75' />
                                <h2 className='add-card-title'>New Notebook</h2>
                            </div>
                        </button>
                    </SC.NotesContainer>
                </SC.NotebooksContainer>



                {/* FOR STICKY NOTE */}
                <SC.StickyNoteContainer>
                    <SC.ScratchPadTitle>SCRATCH PAD</SC.ScratchPadTitle>
                    <SC.StickyNote
                        placeholder='Start note here...'
                        value={scratchPad}
                        onChange={(e) => {
                            localStorage.setItem('scratch-pad', e.target.value)
                            setScratchPad(e.target.value)
                        }}
                    >

                    </SC.StickyNote>

                </SC.StickyNoteContainer>

                {/* FOR NOTEBOOKS */}

            </SC.BottomDiv>
        </OuterDiv >
    );
}
