import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, Link, useHistory } from 'react-router-dom';

import { UilPlusCircle } from '@iconscout/react-unicons';
import * as notesActions from '../../store/notes';
import * as tagsActions from '../../store/tags';

import * as SC from './StyledComponents';

import { formatNotes, formatTags, formatNotebooks, formattedDate, OuterDiv, shortenedContent, sortByUpdatedAt } from '../utils/utils.js';

import './Notes.css';
import Note from '../Note';

export default function Notes({ userId }) {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const history = useHistory();

    const notes = useSelector(state => state.notes.notes);
    const tags = useSelector(state => state.tags.tags);

    useEffect(() => {
        dispatch(notesActions.loadNotesThunk(sessionUser.id))
        dispatch(tagsActions.loadAllTagsThunk(sessionUser.id))

    }, [dispatch])


    let formattedNotes = sortByUpdatedAt(formatNotes(notes));

    const newNote = async () => {
        const noteId = await dispatch(notesActions.createNoteThunk(userId))
        history.push(`/notes/${noteId}`)
        return <Redirect to={`/notes/${noteId}`} />
    }

    const formattedTags = formatTags(tags);

    const tagsElement = (noteId) => {

        const tags = formattedTags.filter(tag => tag.noteId === noteId)
        console.log(tags);
        return (
            <SC.TagsOuterDiv>
                {tags.map(tag => (
                    <SC.TagContainer key={tag.id}>
                        {tag.name}
                    </SC.TagContainer>
                ))}
            </SC.TagsOuterDiv>
        )
    }

    return (
        <OuterDiv className='main notes-page-outer-container'>
            <div className='notes-page-container'>
                <h1 className='notes-title'>Notes</h1>
                <div className='notes-container'>
                    <button type='button' onClick={newNote}>
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
                                {tags[note.id] && tagsElement(note.id)}
                                <p className='note-card-date'>{note.updatedAt}</p>
                            </div>
                        </Link>
                    ))}

                </div>
            </div>

        </OuterDiv>
    );
}
