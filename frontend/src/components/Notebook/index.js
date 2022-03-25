import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, Link, useHistory, useParams } from 'react-router-dom';

import { UilTimes, UilArrowCircleLeft, UilPlus, UilEllipsisH, UilAngleRight, UilFileAlt, UilBook } from '@iconscout/react-unicons';
import * as notesActions from '../../store/notes';
import * as notebooksActions from '../../store/notebooks';

import { formattedDate, formattedTags, shortenedContent, sortByUpdatedAt, sortByTitle, formatNotes, formatNotebooks } from '../utils/utils.js';

import * as SC from './StyledComponents.js';
import { OuterDiv } from '../StyledComponents';

import './Notebook.css'
import Slide from '../Animations/Slide';

export default function Notebook() {
    const dispatch = useDispatch();
    const history = useHistory();

    const { notebookId } = useParams();
    const sessionUser = useSelector(state => state.session.user);
    const allNotebooks = useSelector(state => state.notebooks.notebooks);

    const notebook = useSelector(state => state.notebooks.notebooks[notebookId]);
    let allNotes = useSelector(state => state.notes.notes);

    // let formattedNotes = sortByUpdatedAt(formatNotes(allNotes));
    // formattedNotes = formattedNotes.filter(note => note.notebookId === notebook?.id)

    const [formattedNotes, setFormattedNotes] = useState([]);
    const [noteSort, setNoteSort] = useState(localStorage.getItem('note-sort') || 'Updated At')
    const [sortNotes, setSortNotes] = useState(formattedNotes)

    const [noteModal, setNoteModal] = useState(null)

    useEffect(() => {
        dispatch(notesActions.loadNotesThunk(sessionUser.id))
        dispatch(notebooksActions.loadNotebooksThunk(sessionUser.id))
    }, [dispatch])

    useEffect(() => {
        setFormattedNotes(sortByUpdatedAt(formatNotes(allNotes)).filter(note => note.notebookId === notebook?.id))
    }, [notebook, allNotes])


    function removeNoteFromNotebook(id) {
        // if (noteModal === id) setNoteModal(null)
        // else setNoteModal(id)
        const note = allNotes[id]
        const noteData = {
            noteId: note.id,
            title: note.title,
            content: note.content,
            userId: note.userId,
            notebookId: null
        }

        dispatch(notesActions.updateNoteThunk(noteData))

    }


    useEffect(() => {

        if (noteSort === 'Updated At') {
            localStorage.setItem('note-sort', 'Updated At');
            // formattedNotes = sortByUpdatedAt(formattedNotes)
            setFormattedNotes(sortByUpdatedAt(formattedNotes))
        }
        else if (noteSort === 'Title') {
            localStorage.setItem('note-sort', 'Title');
            // formattedNotes = sortByTitle(formattedNotes)
            setFormattedNotes(sortByTitle(formattedNotes))
        }

        let updatedSort = formattedNotes.map(note => (

            <SC.TableRow key={note.id}>
                <td className='notebooks-table-data'>
                    <Link to={`/notes/${note.id}`}>
                        <UilFileAlt size='20' style={{ marginRight: '10px' }} />
                        {note.title}
                    </Link>

                </td>
                <td className='notebooks-table-data updatedAt-data'>{note.updatedAt}</td>
                <td className='notebooks-table-data actions-data'>
                    <button
                        data-id={note.id}
                        type='button'
                        onClick={() => removeNoteFromNotebook(note.id)}
                        value={note.id}
                        className='red-hover'
                    >
                        Remove from Notebook
                        {/* <UilEllipsisH size='25' /> */}
                    </button>

                </td>
            </SC.TableRow>

        ))

        setSortNotes(updatedSort);

    }, [noteSort, noteModal])


    const newNote = async () => {
        const noteId = await dispatch(notesActions.createNoteThunk(sessionUser.id))

        const noteData = {
            noteId,
            title: 'Untitled',
            content: '',
            userId: sessionUser.id,
            notebookId
        }

        await dispatch(notesActions.updateNoteThunk(noteData))
        dispatch(notesActions.loadNotesThunk(sessionUser.id))
    }


    return (
        <OuterDiv style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <SC.MainDiv>
                <div className='flex-start-div'>
                    <button type='button' onClick={() => history.goBack()}>
                        <SC.ClickableIcon>
                            <UilArrowCircleLeft size='40' />
                        </SC.ClickableIcon>
                    </button>
                    <SC.H1><UilBook size='40' />{notebook?.title}</SC.H1>
                </div>


                <SC.UpperDiv>
                    <div className='flex-end'>
                        <label id='sort' for='sort'>Sort Notes: </label>
                        <select
                            name='sort'
                            value={noteSort}
                            onChange={(e) => setNoteSort(e.target.value)}
                        >
                            <option>Updated At</option>
                            <option>Title</option>
                        </select>
                    </div>

                    <SC.Button
                        onClick={newNote}
                        buttonColor='#4fb06b'
                        className='align-items-center'
                    >
                        <UilPlus size='20' />
                        <span className='add-side-padding'>New Note</span>
                    </SC.Button>

                </SC.UpperDiv>


                <table className='notebooks-table'>
                    <thead>
                        <tr className='header-row'>
                            <th className='header-col title-header'>Title</th>
                            <th className='header-col updatedAt-header'>Last Updated</th>
                            <th className='header-col actions-header2'>Actions</th>
                        </tr>
                    </thead>

                    <tbody className='table-body'>

                        {noteSort === 'Updated At' && sortByUpdatedAt(formattedNotes).map(note => (

                            <SC.TableRow key={note.id}>
                                <td className='notebooks-table-data'>
                                    <Link to={`/notes/${note.id}`}>
                                        <UilFileAlt size='20' style={{ marginRight: '10px' }} />
                                        {note.title}
                                    </Link>

                                </td>
                                <td className='notebooks-table-data updatedAt-data'>{note.updatedAt}</td>
                                <td className='notebooks-table-data actions-data2'>
                                    <button
                                        data-id={note.id}
                                        type='button'
                                        onClick={() => removeNoteFromNotebook(note.id)}
                                        value={note.id}
                                    >
                                        <span className='smaller-text'>
                                            Remove from Notebook
                                        </span>
                                        {/* <UilEllipsisH size='25' /> */}
                                    </button>

                                </td>
                            </SC.TableRow>

                        ))}

                        {noteSort === 'Title' && sortByTitle(formattedNotes).map(note => (

                            <SC.TableRow key={note.id}>
                                <td className='notebooks-table-data'>
                                    <Link to={`/notes/${note.id}`}>
                                        <UilFileAlt size='20' style={{ marginRight: '10px' }} />
                                        {note.title}
                                    </Link>

                                </td>
                                <td className='notebooks-table-data updatedAt-data'>{note.updatedAt}</td>
                                <td className='notebooks-table-data actions-data2'>
                                    <button
                                        data-id={note.id}
                                        type='button'
                                        onClick={() => removeNoteFromNotebook(note.id)}
                                        value={note.id}
                                    >
                                        <span className='smaller-text'>
                                            Remove from Notebook
                                        </span>
                                        {/* <UilEllipsisH size='25' /> */}
                                    </button>

                                </td>
                            </SC.TableRow>

                        ))}

                    </tbody>

                </table>

            </SC.MainDiv>
        </OuterDiv>
    );
}






function NotebookModal({ noteId, setNoteModal }) {
    const dispatch = useDispatch();
    const note = useSelector(state => state.notes.notes[noteId]);


    async function removeNoteFromNotebook() {
        await dispatch(notesActions.updateNoteThunk({
            noteId,
            title: note.title,
            content: note.content,
            userId: note.userId,
            notebookId: null
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
                                onClick={() => setNoteModal(null)}
                                style={{ alignSelf: 'flex-end' }}
                            >
                                <UilTimes size='30' style={{ color: 'white' }} />
                            </button>
                            <SC.ModalButton
                                type='button'
                                buttonColor='#f25c5c'
                                onClick={removeNoteFromNotebook}
                            >
                                Remove from notebook
                            </SC.ModalButton>

                        </SC.ButtonDiv>
                    </SC.ModalInfo>
                </SC.ModalDiv>
            </Slide>
        </SC.Modal >
    );
}
