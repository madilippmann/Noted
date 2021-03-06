import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, Link, useHistory } from 'react-router-dom';

import * as notesActions from '../../store/notes';
import * as notebooksActions from '../../store/notebooks';
import * as tagsActions from '../../store/tags';

import { formatNotebooks, formatNotes, formatTags, formattedDate, sortByUpdatedAt, shortenedContent } from '../utils/utils.js';

import { UilNotes, UilBooks, UilPlus, UilBook } from '@iconscout/react-unicons';


import * as SC from './StyledComponents.js';
import { OuterDiv } from '../StyledComponents'
import './Home.css'

export default function Home() {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const notes = useSelector(state => state.notes.notes);
    const notebooks = useSelector(state => state.notebooks.notebooks);
    const tags = useSelector(state => state.tags.tags);

    const history = useHistory();

    const [scratchPad, setScratchPad] = useState(localStorage.getItem('scratch-pad') || '')


    useEffect(() => {
        dispatch(notesActions.loadNotesThunk(sessionUser.id));
        dispatch(notebooksActions.loadNotebooksThunk(sessionUser.id));
        dispatch(tagsActions.loadAllTagsThunk(sessionUser.id));

    }, [dispatch])

    let formattedNotes = sortByUpdatedAt(formatNotes(notes)).slice(0, 5);
    let formattedNotebooks = sortByUpdatedAt(formatNotebooks(notebooks)).slice(0, 3);
    const formattedTags = formatTags(tags)

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


    useEffect(() => {
        formattedNotes.forEach(note => {
            tagsElement(note.id)
        })
    }, [])

    const tagsElement = (noteId) => {

        const tags = formattedTags.filter(tag => tag.noteId === noteId)
        return (
            <SC.TagsOuterDiv>
                {tags.map((tag, i) => {
                    if (i < 5) {
                        return (
                            <SC.TagContainer key={tag.id}>
                                {tag.name}
                            </SC.TagContainer>
                        )
                    }
                })}
            </SC.TagsOuterDiv>
        )
    }


    return (
        <OuterDiv className='main' style={{ minWidth: '800px', padding: '50px', display: 'flex', flexDirection: 'column' }}>
            <SC.Backdrop >
                <SC.ContainerTopDiv>
                    <SC.H1>Recent Notes</SC.H1>
                    <SC.AddButton
                        type='button'
                        onClick={addNote}
                        // buttonColor='#65dba0'
                        buttonColor='rgb(121, 226, 156)'

                    >
                        <UilPlus size='25' />
                        New Note
                    </SC.AddButton>
                </SC.ContainerTopDiv>
                <SC.NotesContainer>
                    {formattedNotes.map(note => (
                        <Link to={`/notes/${note.id}`} key={note.id}>
                            <div key={note.id} className='square-card note-card no-border'>
                                <h3 className='note-card-title'>{note.title}</h3>
                                <p className='note-card-content'>{note.content}</p>
                                {tagsElement(note.id)}
                                <p className='note-card-date'>{note.updatedAt}</p>
                            </div>
                        </Link>
                    ))}
                    {/* <button type='button' onClick={addNote} style={{ border: 'none' }}> */}
                    <Link to='/notes'>
                        <div className='create-note-card square-card green-card home-page'>
                            <UilNotes size='75' />
                            <h2 className='add-card-title'>All Notes</h2>
                        </div>
                    </Link>
                    {/* </button> */}
                </SC.NotesContainer>
            </SC.Backdrop>

            <SC.BottomDiv >

                <SC.NotebooksContainer>
                    <SC.ContainerTopDiv>
                        <SC.H1>Recent Notebooks</SC.H1>
                        <SC.AddButton
                            type='button'
                            onClick={addNotebook}
                            buttonColor='rgb(108, 211, 245)'
                        // buttonColor='#13c8cf'
                        >
                            <UilPlus size='25' />
                            New Notebook
                        </SC.AddButton>
                    </SC.ContainerTopDiv>
                    <SC.NotesContainer>
                        {formattedNotebooks.map(notebook => (
                            <Link to={`/notebooks/${notebook.id}`} key={notebook.id}>
                                <div key={notebook.id} id='notebook-card' className='square-card note-card'>
                                    <UilBook size='50' />
                                    <h3 className='notebook-title note-card-title'>{notebook.title}</h3>
                                    {/* <p className='note-card-date'>{notebook.updatedAt}</p> */}
                                </div>
                            </Link>
                        ))}
                        {/* <button type='button' onClick={addNotebook} style={{ border: 'none' }}> */}
                        <Link to='/notebooks'>
                            <div className='create-note-card square-card home-page blue-card no-border'>
                                <UilBooks size='75' />
                                <h2 className='add-card-title'>All Notebooks</h2>
                            </div>
                        </Link>
                        {/* </button> */}
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
