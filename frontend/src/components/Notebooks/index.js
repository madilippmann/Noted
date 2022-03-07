import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, Link, useHistory } from 'react-router-dom';

import { UilPlusCircle, UilEllipsisH, UilAngleRight } from '@iconscout/react-unicons';
import * as notesActions from '../../store/notes';
import * as notebooksActions from '../../store/notebooks';

import { formattedDate, OuterDiv, shortenedContent, sortByUpdatedAt, sortByTitle, formatNotes, formatNotebooks } from '../utils/utils.js';

import * as SC from './StyledComponents.js'
import './Notebooks.css'

export default function Notebooks() {
    const dispatch = useDispatch();
    const history = useHistory();

    const sessionUser = useSelector(state => state.session.user);
    const notebooks = useSelector(state => state.notebooks.notebooks);
    const notes = useSelector(state => state.notes.notes);

    const [openNav, setOpenNav] = useState('');
    const [navArrowColor, setNavArrowColor] = useState('#5D2BC5')
    const [notebookSort, setNotebookSort] = useState(' Updated At')

    useEffect(() => {
        dispatch(notebooksActions.loadNotebooksThunk(sessionUser.id))
        dispatch(notesActions.loadNotesThunk(sessionUser.id))
    }, [dispatch])



    const newNotebook = async () => {
        const noteId = await dispatch(notesActions.createNoteThunk(sessionUser.id))
        history.push(`/notes/${noteId}`)
        return <Redirect to={`/notes/${noteId}`} />
    }


    let formattedNotebooks = sortByUpdatedAt(formatNotebooks(notebooks));
    let formattedNotes = sortByUpdatedAt(formatNotes(notes));


    useEffect(() => {
        if (notebookSort === 'Updated At') formattedNotebooks = sortByUpdatedAt(formattedNotebooks)
        else if (notebookSort === 'Title') formattedNotebooks = sortByTitle(formattedNotebooks)
        console.log(formattedNotebooks);
    }, [notebookSort])

    const toggleNav = () => {
        if (openNav === 'open') setOpenNav('');
        else setOpenNav('open');
    }

    useEffect(() => {
        setNavArrowColor(navArrowColor === '#bea3fa' ? '#5D2BC5' : '#bea3fa');
    }, [openNav])


    return (
        <OuterDiv style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <SC.MainDiv>
                <h1>Notebooks</h1>
                <SC.UpperDiv>
                    <div>
                        <label for='sort'>Sort Notebooks by: </label>
                        <select
                            name='sort'
                            value={notebookSort}
                            onChange={(e) => setNotebookSort(e.target.value)}
                        >
                            <option>Updated By</option>
                            <option>Title</option>
                        </select>
                    </div>

                    <SC.Button
                        onClick={newNotebook}
                        buttonColor='#4fb06b'
                    >
                        New Notebook
                    </SC.Button>
                </SC.UpperDiv>

                <table>
                    <thead>
                        <tr className='header-row'>
                            <th>Title</th>
                            <th>Last Updated</th>
                            <th>Actions</th>
                        </tr>
                    </thead>

                    <tbody className='table-body'>
                        {/* {notebooks && notebooks.map(notebook => (
                            <tr>
                                <td>1</td>
                                <td>2</td>
                                <td>3</td>

                            </tr>

                        ))} */}
                    </tbody>

                </table>

            </SC.MainDiv>
        </OuterDiv>
    );
}


// ARROW
// <div id='arrow-icon-container'>
// <button onClick={toggleNav} className='arrow-right-button' type='button' >
//     <UilAngleRight className={`arrow-right-icon ${openNav}`} side='40' style={{ color: `${navArrowColor}` }} />
// </button>
// </div>
