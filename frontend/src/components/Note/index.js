import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams, Redirect, useNavigate } from 'react-router-dom';
import * as notesActions from '../../store/notes';

import * as SC from './StyledComponents'

import './Note.css';
import { formattedDate, OuterDiv } from "../utils/utils";
import { UilTimes, UilCheck } from '@iconscout/react-unicons'

import Slide from "../Animations/Slide";

export default function Note({ userId }) {
    const { noteId } = useParams();
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);

    const note = useSelector(state => state.notes.notes[noteId]);

    const [title, setTitle] = useState(note.title);
    const [content, setContent] = useState(note.content);
    const [notebookId, setNotebookId] = useState(null);
    const [disabled, setDisabled] = useState(true);
    const [deleteNoteModal, setDeleteNoteModal] = useState(false);
    const [save, setSave] = useState(false);


    useEffect(() => {
        console.log('USER: ', userId);
        dispatch(notesActions.loadNotesThunk(userId))
    }, [dispatch])


    useEffect(() => {
        if (title.length > 100 || title.length === 0 || /^\s*$/.test(title)) {
            setDisabled(true)
        }
        else setDisabled(false)
    }, [title])


    useEffect(() => {
        if (save) {
            const timer = setTimeout(() => setSave(false), 5000)
            return () => clearTimeout(timer)
        }
    }, [save])

    const saveNote = async (e) => {
        e.preventDefault()

        const noteData = {
            title,
            content,
            notebookId: notebookId ? Number(notebookId) : null,
            noteId: Number(noteId),
            userId: note.userId
        }

        console.log('Note Data: ', noteData);
        const res = await dispatch(notesActions.updateNoteThunk(noteData));

        setSave(true)
        await res.json()
    }


    return (
        // padding: '15px'
        <OuterDiv style={{
            backgroundColor: 'rgba(251, 250, 255, .9)',
            borderRadius: '10px',
            width: '70%',
            height: '90%',
            margin: 'auto'
        }}>
            <SC.Form
                onSubmit={saveNote}
            >
                <SC.CenteringDiv style={{ width: '100%' }}>
                    <SC.CenteringDiv style={{ flexDirection: 'row', paddingBottom: '10px' }}>
                        <p style={{ width: '100%', fontSize: '12px', flexGrow: '4', alignSelf: 'flex-end', margin: '0' }}><span style={{ fontWeight: '800' }}>Last Updated:</span> {formattedDate(note.updatedAt)}</p>
                        <SC.ButtonDiv2>
                            {save && <UilCheck size='30' style={{ color: '#4fb06b' }} />}

                            <SC.Button
                                type='submit'
                                disabled={disabled}
                                buttonColor='#4fb06b'
                            >
                                Save
                            </SC.Button>
                            <SC.Button
                                type='button'
                                onClick={() => setDeleteNoteModal(true)}
                                buttonColor='#f25c5c'

                            >
                                Delete Note
                            </SC.Button>
                        </SC.ButtonDiv2>
                    </SC.CenteringDiv>
                    {deleteNoteModal && <DeleteNoteModal note={note} setDeleteNoteModal={setDeleteNoteModal} />}
                    <SC.CenteringDiv style={{ width: '100%' }}>
                        {disabled && <SC.TitleError>Title must be between 1 and 100 characters long.</SC.TitleError>}

                        <SC.TitleInput
                            value={title}
                            placeholder='Title'
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </SC.CenteringDiv>

                </SC.CenteringDiv>

                <SC.CenteringDiv style={{ height: '100%', flexGrow: '2' }}>
                    <SC.ContentTextarea
                        placeholder='Start writing...'
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                    />
                </SC.CenteringDiv>

            </SC.Form>

        </OuterDiv >
    );
};


function DeleteNoteModal({ setDeleteNoteModal }) {
    const { noteId } = useParams();
    const history = useHistory();
    const dispatch = useDispatch();
    const note = useSelector(state => state.notes.notes[noteId]);


    const deleteNote = async () => {
        const res = dispatch(notesActions.deleteNoteThunk(note))
        history.push('/notes');
        return <Redirect exact to={`/notes`} />
    }


    return (
        <SC.Modal>
            <Slide direction='down'>
                <SC.ModalDiv className='user-modal' style={{ top: '50px' }}>
                    <button
                        type='button'
                        onClick={() => setDeleteNoteModal(false)}
                    >
                        <UilTimes size='30' style={{ color: 'white' }} />
                    </button>
                    <SC.ModalInfo>
                        <p style={{ marginTop: '0', fontSize: '13px', textAlign: 'center' }}>Select delete to permanently delete this note.</p>
                        <SC.ButtonDiv>

                            <SC.ModalButton
                                type='button'
                                onClick={deleteNote}
                                buttonColor='#f25c5c'
                            >
                                Delete
                            </SC.ModalButton>

                        </SC.ButtonDiv>
                    </SC.ModalInfo>
                </SC.ModalDiv>
            </Slide>
        </SC.Modal >
    );
}
