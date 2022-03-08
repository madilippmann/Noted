import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, Link, useHistory } from 'react-router-dom';

import { UilPlusCircle, UilEllipsisH, UilAngleRight, UilFileAlt, UilBook } from '@iconscout/react-unicons';
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


    const [notebookSort, setNotebookSort] = useState(localStorage.getItem('notebook-sort') || 'Updated At')
    const [sortNotebooks, setSortNotebooks] = useState()

    const [openNotebooks, setOpenNotebooks] = useState(new Set());

    useEffect(() => {
        dispatch(notebooksActions.loadNotebooksThunk(sessionUser.id))
        dispatch(notesActions.loadNotesThunk(sessionUser.id))
    }, [dispatch])



    const newNotebook = async () => {
        const noteId = await dispatch(notebooksActions.createNotebookThunk(sessionUser.id))
    }


    let formattedNotebooks = sortByUpdatedAt(formatNotebooks(notebooks));
    let formattedNotes = sortByUpdatedAt(formatNotes(notes));

    function toggleNotebook(e) {
        console.log(e.target.dataset.id);
        if (openNotebooks.has(e.target.dataset.id)) {
            setOpenNotebooks(openNotebooks.delete(e.target.dataset.id))
        } else {
            setOpenNotebooks(openNotebooks.add(e.target.dataset.id))
        }
        console.log(openNotebooks);
    }


    useEffect(() => { console.log('Notebook Open? ', openNotebooks) }, [openNotebooks])
    useEffect(() => {
        if (notebookSort === 'Updated At') {
            localStorage.setItem('notebook-sort', 'Updated At');
            formattedNotebooks = sortByUpdatedAt(formattedNotebooks)
            formattedNotes = sortByUpdatedAt(formattedNotes)
        }
        else if (notebookSort === 'Title') {
            localStorage.setItem('notebook-sort', 'Title');
            formattedNotebooks = sortByTitle(formattedNotebooks)
            formattedNotes = sortByTitle(formattedNotes)
        }

        let updatedSort = formattedNotebooks.map(notebook => (
            <>
                <SC.TableRow>
                    <td className='notebooks-table-data'>
                        <button type='button' onClick={toggleNotebook} data-id={notebook.id}>
                            <UilAngleRight className={`arrow-right-icon ${String(openNotebooks)}`} side='24' />

                            {/* <UilAngleRight size='25' /> */}
                            <UilBook size='20' style={{ marginRight: '10px' }} />
                            {notebook.title}
                        </button>
                    </td>
                    <td className='notebooks-table-data updatedAt-data'>{notebook.updatedAt}</td>
                    <td className='notebooks-table-data actions-data'>
                        <button type='button'>
                            <UilEllipsisH size='25' />
                        </button>

                    </td>
                </SC.TableRow>

                {formattedNotes.filter(note => {
                    return note.notebookId === notebook.id
                }).map(note => (
                    <SC.TableRow>
                        <td>{note.title}</td>
                        <td>{note.updatedAt}</td>
                        <td></td>
                    </SC.TableRow>
                ))}

            </>

        ))

        setSortNotebooks(updatedSort);

    }, [notebookSort, notebooks])



    return (
        <OuterDiv style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <SC.MainDiv>
                <h1>Notebooks</h1>
                <SC.UpperDiv>
                    <div className='flex-end'>
                        <label id='sort' for='sort'>Sort Notebooks by: </label>
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

                <table className='notebooks-table'>
                    <thead>
                        <tr className='header-row'>
                            <th className='header-col title-header'>Title</th>
                            <th className='header-col updatedAt-header'>Last Updated</th>
                            <th className='header-col actions-header'>Actions</th>
                        </tr>
                    </thead>

                    <tbody className='table-body'>
                        {sortNotebooks}
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
