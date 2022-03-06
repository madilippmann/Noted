import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams, Redirect } from 'react-router-dom';
import * as notesActions from '../../store/notes';

import styled from 'styled-components'
import './Note.css';
import { formattedDate, OuterDiv } from "../utils/utils";
import { UilTimes, UilCheck } from '@iconscout/react-unicons'

import Slide from "../Animations/Slide";

export default function Note() {
    const { noteId } = useParams();
    const dispatch = useDispatch();
    const note = useSelector(state => state.notes.notes[noteId]);

    const [title, setTitle] = useState(note.title);
    const [content, setContent] = useState(note.content);
    const [notebookId, setNotebookId] = useState(null);
    const [disabled, setDisabled] = useState(true);
    // const [formValidations, setFormValidations] = useState([]);
    const [deleteNoteModal, setDeleteNoteModal] = useState(false);
    const [save, setSave] = useState(false);

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
        const update = await res.json()
    }

    const TitleInput = styled.input`
        width: 100%;
        display: flex;
        justify-content: center;
        border-radius: 0px;
        border: none;
        margin-bottom: 10px;
    `;

    const ContentTextarea = styled.textarea`
        width: 100%;
        height: 100%;
        flex-grow: 2;
        padding: 10px;
        border: none;
        resize: none;

    `;

    // background-color:;
    const notedPuple = ``
    const Button = styled.button`
        padding: 5px 10px;
        border-radius: 25px;
        color: #F3F3F3;
        background-color: rgb(124, 0, 249);
        border: 2px solid rgb(124, 0, 249);
        transition: background-color .24s ease, color .24s ease;
        margin-left: 10px;

        &:hover {
            color: ${props => props.buttonColor};
            background-color: #F3F3F3;
            border: 2px solid ${props => props.buttonColor};
        }
        &:disabled {
            opacity: 50%;
        }

        &:disabled:hover {
            color: #F3F3F3;
            background-color: rgb(124, 0, 249);
            border: 2px solid rgb(124, 0, 249);
            cursor: not-allowed;
        }
    `;

    const TitleError = styled.p`
        color: red;
        margin: 0;
        align-self: flex-start;
        font-size: 12px;

    `;

    const CenteringDiv = styled.div`
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    `;

    const ButtonDiv = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
`;

    const Form = styled.form`
        margin: auto;
        width: 100%;
        height: 100%;
        padding: 50px;
    `;

    return (
        // padding: '15px'
        <OuterDiv style={{
            backgroundColor: 'rgba(251, 250, 255, .9)',
            borderRadius: '10px',
            width: '70%',
            height: '90%',
            margin: 'auto'
        }}>
            <Form
                onSubmit={saveNote}
            >
                <CenteringDiv style={{ width: '100%' }}>
                    <CenteringDiv style={{ flexDirection: 'row', paddingBottom: '10px' }}>
                        <p style={{ width: '100%', fontSize: '12px', flexGrow: '4', alignSelf: 'flex-end', margin: '0' }}><span style={{ fontWeight: '800' }}>Last Updated:</span> {formattedDate(note.updatedAt)}</p>
                        <ButtonDiv>
                            {save && <UilCheck size='30' style={{ color: '#4fb06b' }} />}

                            <Button
                                type='submit'
                                disabled={disabled}
                                buttonColor='#4fb06b'
                            >
                                Save
                            </Button>
                            <Button
                                type='button'
                                onClick={() => setDeleteNoteModal(true)}
                                buttonColor='#f25c5c'

                            >
                                Delete Note
                            </Button>
                        </ButtonDiv>
                    </CenteringDiv>
                    {deleteNoteModal && <DeleteNoteModal note={note} setDeleteNoteModal={setDeleteNoteModal} />}
                    <CenteringDiv style={{ width: '100%' }}>
                        {disabled && <TitleError>Title must be between 1 and 100 characters long.</TitleError>}

                        <TitleInput
                            value={title}
                            placeholder='Title'
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </CenteringDiv>

                </CenteringDiv>

                <CenteringDiv style={{ height: '100%', flexGrow: '2' }}>
                    <ContentTextarea
                        placeholder='Start writing...'
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                    />
                </CenteringDiv>

            </Form>

        </OuterDiv >
    );
};


function DeleteNoteModal({ note, setDeleteNoteModal }) {
    const history = useHistory();
    const dispatch = useDispatch();
    const Modal = styled.div`
        position: absolute;
        z-index: 2000;
        display: flex;
        width: 400px;
        height: 200px;
        margin: 0;
        flex-direction: column;
        align-items: flex-end;
        justify-content: flex-start;

    `

    const ModalInfo = styled.div`
        flex-grow: 1;
        display: flex;
        align-self:center;
        flex-direction: column;
        align-items:center;
    `

    const ButtonDiv = styled.div`
        display: flex;
        justify-content: space-between;
        with: 200px;
    `;

    const ModalButton = styled.button`
        font-size: 16px;
        padding: 5px;
        color: white;


        padding: 5px 10px;
        border-radius: 25px;
        color: #F3F3F3;
        background-color: rgb(64, 0, 189);
        transition: background-color .24s ease;
        margin-left: 10px;

        &:hover {
            background-color: ${props => props.buttonColor};
        }
    `;



    const ModalDiv = styled.div`
        display: flex;
        flex-direction: column;
        align-items: flex-end;
    `;

    const deleteNote = async () => {
        const res = await dispatch(notesActions.deleteNoteThunk({ userId: note.userId, noteId: note.id }))
        history.push('/notes');
        return <Redirect exact to='/notes' />
    }



    return (
        <Modal>
            <Slide direction='down'>
                <ModalDiv className='user-modal' style={{ top: '50px' }}>
                    <button
                        type='button'
                        onClick={() => setDeleteNoteModal(false)}
                    >
                        <UilTimes size='30' style={{ color: 'white' }} />
                    </button>
                    <ModalInfo>
                        <p style={{ marginTop: '0', fontSize: '13px', textAlign: 'center' }}>Select delete to permanently delete this note.</p>
                        <ButtonDiv>
                            <ModalButton
                                type='button'
                                onClick={deleteNote}
                                buttonColor='#f25c5c'
                            >
                                Delete
                            </ModalButton>

                        </ButtonDiv>
                    </ModalInfo>
                </ModalDiv>
            </Slide>
        </Modal >
    );
}
