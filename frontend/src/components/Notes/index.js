import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, Link, useHistory } from 'react-router-dom';

import { UilPlusCircle, UilSearchAlt } from '@iconscout/react-unicons';
import * as notesActions from '../../store/notes';
import * as tagsActions from '../../store/tags';
import { loadSearchThunk, updateSearchThunk } from "../../store/search";

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
    const originalFormattedNotes = sortByUpdatedAt(formatNotes(notes));

    const search = useSelector(state => state.search);


    const [formattedNotes, setFormattedNotes] = useState(sortByUpdatedAt(formatNotes(notes)))
    const [formattedTags, setFormattedTags] = useState(formatTags(tags))

    const [searchInput, setSearchInput] = useState('');


    useEffect(() => {
        dispatch(notesActions.loadNotesThunk(sessionUser.id));
        dispatch(tagsActions.loadAllTagsThunk(sessionUser.id));
        dispatch(updateSearchThunk(''));
    }, [dispatch])


    const handleSearch = (e) => {
        setSearchInput(e.target.value)
        if (e.target.value.length > 0) {

            const noteIds = formattedTags.reduce((noteIds, tag) => {
                if (tag.name.toLowerCase().includes(e.target.value.toLowerCase())) {
                    noteIds.add(tag.noteId)
                }

                return noteIds;
            }, new Set())

            setFormattedNotes(originalFormattedNotes.filter(note => Array.from(noteIds).includes(note.id)))
        } else {
            setFormattedNotes(originalFormattedNotes)
        }
    }

    const newNote = async () => {
        const noteId = await dispatch(notesActions.createNoteThunk(userId))
        history.push(`/notes/${noteId}`)
        return <Redirect to={`/notes/${noteId}`} />
    }



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
        <OuterDiv className='main notes-page-outer-container'>
            <div className='notes-page-container'>
                <SC.TopDiv>
                    <h1 className='notes-title'>Notes</h1>
                    <SC.SearchBar className='rounded-container search-container'>
                        <div className='icon-container search'>
                            <UilSearchAlt size='25' />
                        </div>
                        <input
                            className='search-input'
                            type='text'
                            value={searchInput}
                            placeholder='Search by tag...'
                            onChange={(e) => handleSearch(e)}
                        />
                    </SC.SearchBar>
                </SC.TopDiv>
                <div className='notes-container'>
                    <button type='button' onClick={newNote}>
                        <div className='create-note-card square-card'>
                            <UilPlusCircle size='75' />
                            <h2 className='add-card-title'>New Note</h2>
                        </div>
                    </button>


                    {formattedNotes?.map(note => (
                        <Link to={`/notes/${note.id}`} >
                            <div key={note.id} className='square-card note-card'>
                                <h3 className='note-card-title'>{note.title}</h3>
                                <p className='note-card-content'>{note.content}</p>
                                {tagsElement(note.id)}
                                <p className='note-card-date'>{note.updatedAt}</p>
                            </div>
                        </Link>
                    ))}

                </div>
            </div>

        </OuterDiv>
    );
}
