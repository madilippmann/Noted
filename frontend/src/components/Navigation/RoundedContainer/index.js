import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import * as notesActions from '../../../store/notes';
import * as notebooksActions from '../../../store/notebooks';

import './RoundedContainer.css';
import { UilPlus, UilSearchAlt } from '@iconscout/react-unicons'
import { formatNotes, formatTags, formatNotebooks, sortByUpdatedAt, sortByTitle } from '../../utils/utils.js';

const RoundedContainer = ({ userId, type }) => {

    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);

    const notes = useSelector(state => state.notes.notes);
    const notebooks = useSelector(state => state.notebooks.notebooks);

    const originalFormattedNotes = sortByUpdatedAt(formatNotes(notes));
    const originalFormattedNotebooks = sortByUpdatedAt(formatNotebooks(notebooks));

    const [formattedNotes, setFormattedNotes] = useState([])
    const [formattedNotebooks, setFormattedNotebooks] = useState([])

    const [filteredNotes, setFilteredNotes] = useState([]);
    const [filteredNotebooks, setFilteredNotebooks] = useState([]);

    const [searchInput, setSearchInput] = useState('');

    useEffect(() => {
        setFormattedNotes(originalFormattedNotes)
        setFormattedNotebooks(originalFormattedNotebooks)
    }, [notes, notebooks])

    useEffect(() => {
        dispatch(notesActions.loadNotesThunk(sessionUser.id));
        dispatch(notebooksActions.loadNotebooksThunk(sessionUser.id));
    }, [dispatch])


    const handleSearch = (e) => {
        setSearchInput(e.target.value)
        // console.log('NEW', formattedNotes);
        if (e.target.value.length > 0) {

            const filteredNotes = sortByTitle(formattedNotes.reduce((filteredNotes, note) => {
                if (note.title.toLowerCase().includes(e.target.value.toLowerCase())) {
                    filteredNotes.push(note);
                }

                return filteredNotes;
            }, []))

            const filteredNotebooks = sortByTitle(formattedNotebooks.reduce((filteredNotebooks, notebook) => {
                if (notebook.title.toLowerCase().includes(e.target.value.toLowerCase())) {
                    filteredNotebooks.push(notebook);
                }

                return filteredNotebooks;
            }, []))

            setFilteredNotes(filteredNotes);
            setFilteredNotebooks(filteredNotebooks);
            console.log('Filtered Notes: ', filteredNotes);
            console.log('Filtered Notebooks: ', filteredNotebooks);

        } else {

        }
    }

    return (
        <div className='rounded-outer-container'>
            {type === 'search' &&
                <div className='search-outer-container'>
                    <div className='rounded-container search-container'>
                        <div className='icon-container search'>
                            <UilSearchAlt size='25' />
                        </div>
                        <input
                            className='search-input'
                            type='text'
                            value={searchInput}
                            placeholder='Search titles'
                            onChange={(e) => handleSearch(e)}
                        />
                    </div>
                    {searchInput.length > 0 &&
                        <div className='results-outer-container'>
                            <div className='results-container'>
                                <h4>Notes</h4>
                                <div className='results'>
                                    {filteredNotes.length > 0 ? filteredNotes.map(note => (
                                        <Link to={`/notes/${note.id}`}>
                                            <p className='result-link' key={note.id}>{note.title}</p>
                                        </Link>
                                    )) : <p className='italicize'>No results</p>}
                                </div>

                            </div>
                            <div className='results-container'>
                                <h4>Notebooks</h4>
                                <div className='results'>
                                    {filteredNotebooks.length > 0 ? filteredNotebooks.map(notebook => (
                                        <Link to={`/notebooks/${notebook.id}`}>
                                            <p className='result-link' key={notebook.id}>{notebook.title}</p>
                                        </Link>
                                    )) : <p className='italicize'>No results</p>}
                                </div>
                            </div>
                        </div>
                    }

                </div>

            }



            {type === 'new-note' &&
                <div className='rounded-container new-note-container'>
                    <div className='icon-container new-note'>
                        <UilPlus size='25' />
                    </div>
                    <h4>New Note</h4>
                </div>}
        </div>
    );
}

export default RoundedContainer;
