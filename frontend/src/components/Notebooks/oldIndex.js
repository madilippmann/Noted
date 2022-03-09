import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, Link, useHistory } from 'react-router-dom';

import { UilTimes, UilPlusCircle, UilEllipsisH, UilAngleRight, UilFileAlt, UilBook } from '@iconscout/react-unicons';
import * as notesActions from '../../store/notes';
import * as notebooksActions from '../../store/notebooks';

import { formattedDate, OuterDiv, shortenedContent, sortByUpdatedAt, sortByTitle, formatNotes, formatNotebooks } from '../utils/utils.js';

import * as SC from './StyledComponents.js'
import './Notebooks.css'
import Slide from '../Animations/Slide';

export default function Notebooks() {
    const dispatch = useDispatch();
    const history = useHistory();

    const sessionUser = useSelector(state => state.session.user);
    const notebooks = useSelector(state => state.notebooks.notebooks);
    const notes = useSelector(state => state.notes.notes);

    const [openNotebooks, setOpenNotebooks] = useState(new Set());

    const [notebookSort, setNotebookSort] = useState(localStorage.getItem('notebook-sort') || 'Updated At')
    const [sortNotebooks, setSortNotebooks] = useState()
    const [notebookModal, setNotebookModal] = useState(null)

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

        let set = new Set().add(...openNotebooks)
        if (openNotebooks.has(e.target.dataset.id)) {
            set.delete(e.target.dataset.id)
            setOpenNotebooks(set)
        } else {
            set.add(e.target.dataset.id)
            setOpenNotebooks(set)
        }

    }


    function toggleNotebookModal(id) {
        if (notebookModal === id) setNotebookModal(null)
        else setNotebookModal(id)
    }


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
                <SC.TableRow key={notebook.id}>
                    <td className='notebooks-table-data'>
                        <button type='button' onClick={toggleNotebook} data-id={notebook.id}>
                            {/* <UilAngleRight className={`arrow-right-icon ${openNotebooks.has(notebook.id)}`} side='24' /> */}

                            {/* <UilAngleRight size='25' /> */}
                            <UilBook size='20' style={{ marginRight: '10px' }} />
                            {notebook.title}
                        </button>
                    </td>
                    <td className='notebooks-table-data updatedAt-data'>{notebook.updatedAt}</td>
                    <td className='notebooks-table-data actions-data'>
                        <button
                            data-id={notebook.id}
                            type='button'
                            onClick={() => toggleNotebookModal(notebook.id)}
                            value={notebook.id}
                        >
                            <UilEllipsisH size='25' />
                        </button>
                        {notebookModal === notebook.id && <NotebookModal notebookId={notebook.id} setNotebookModal={setNotebookModal} />}

                    </td>
                </SC.TableRow>

                {openNotebooks.has(notebook.id) && formattedNotes.filter(note => {
                    return note.notebookId === notebook.id
                }).map(note => (
                    <SC.TableRow key={note.id}>
                        <td>{note.title}</td>
                        <td>{note.updatedAt}</td>
                        <td></td>
                    </SC.TableRow>
                ))}
            </>

        ))

        setSortNotebooks(updatedSort);

    }, [notebookSort, notebooks, openNotebooks, notebookModal])



    return (
        <OuterDiv style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <SC.MainDiv>
                {/* <div style={{ borderBottom: '1px solid rgba(255, 255, 255)' }}> */}
                <h1 >Notebooks</h1>
                {/* </div> */}
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



function NotebookModal({ notebookId, setNotebookModal }) {
    const dispatch = useDispatch();
    const notebook = useSelector(state => state.notebooks.notebooks[notebookId]);

    const [title, setTitle] = useState(notebook.title)

    async function updateTitle() {
        await dispatch(notebooksActions.updateNotebookThunk({
            notebookId,
            title,
            userId: notebook.userId
        }))
        setNotebookModal(null)

    }

    async function deleteNotebook() {
        setNotebookModal(null)
        await dispatch(notebooksActions.deleteNotebookThunk({
            userId: notebook.userId,
            id: notebookId
        }))
    }

    return (
        <SC.Modal>
            <Slide direction='down' duration={.25}>
                {/* FIX FIX FIX FIX */}
                <SC.ModalDiv className='user-modal' style={{ top: '10px', right: '350px' }}>

                    <SC.ModalInfo>
                        <SC.ButtonDiv  >
                            {/* TODO TITLE ADD VALIDATIONS */}
                            <button
                                type='button'
                                onClick={() => setNotebookModal(null)}
                                style={{ alignSelf: 'flex-end' }}
                            >
                                <UilTimes size='30' style={{ color: 'white' }} />
                            </button>

                            <input
                                type='text'
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                style={{ padding: '5px 10px', borderRadius: '10px' }}
                            ></input>
                            <SC.InputDiv>
                                <SC.ModalButton
                                    type='button'
                                    buttonColor='rgb(70, 167, 96)'
                                    onClick={updateTitle}
                                    style={{ marginLeft: '0' }}
                                >
                                    Change Tittle
                                </SC.ModalButton>
                                <SC.ModalButton
                                    type='button'
                                    buttonColor='#f25c5c'
                                    onClick={deleteNotebook}
                                >
                                    Delete Notebook
                                </SC.ModalButton>
                            </SC.InputDiv>


                        </SC.ButtonDiv>
                    </SC.ModalInfo>
                </SC.ModalDiv>
            </Slide>
        </SC.Modal >
    );
}
