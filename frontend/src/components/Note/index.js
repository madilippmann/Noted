import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from 'react-router-dom';
import * as notesActions from '../../store/notes';

import styled from 'styled-components'
import './Note.css';
import { formattedDate, OuterDiv } from "../utils/utils";
import { UilTimes } from '@iconscout/react-unicons'

export default function Note() {
    const { noteId } = useParams();
    const dispatch = useDispatch();
    const note = useSelector(state => state.notes.notes[noteId]);

    const [title, setTitle] = useState(note.title);
    const [content, setContent] = useState(note.content);
    const [notebookId, setNotebookId] = useState(null)
    const [disabled, setDisabled] = useState(true);
    const [formValidations, setFormValidations] = useState([]);
    const [deleteNoteModal, setDeleteNoteModal] = useState(false);


    useEffect(() => {
        if (title.length > 100 || title.length === 0) {
            setDisabled(true)
        }
        else setDisabled(false)
    }, [title])



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

        const update = await res.json()
        console.log(update)
    }

    const TitleInput = styled.input`
        width: 100%;
        display: flex;
        justify-content: center;
        border-radius: 0px;
        border: none;
    `;

    const ContentTextarea = styled.textarea`
        width: 100%;
        height: 100%;
        flex-grow: 2;
        padding: 10px;
        border: none;

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
        margin-left: 20px;

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
                    <CenteringDiv style={{ flexDirection: 'row' }}>
                        <p style={{ width: '100%', fontSize: '12px', flexGrow: '4' }}><span style={{ fontWeight: '800' }}>Last Updated:</span> {formattedDate(note.updatedAt)}</p>
                        <ButtonDiv>
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

            {deleteNoteModal && <DeleteNoteModal setDeleteNoteModal={setDeleteNoteModal} />}
        </OuterDiv >
    );
};


function DeleteNoteModal({ setDeleteNoteModal }) {
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

    `;


    const deleteNote = () => {

    }


    return (
        <Modal>
            <button
                type='button'
                onClick={() => setDeleteNoteModal(false)}
            >
                <UilTimes size='30' />
            </button>
            <ModalInfo>
                <p>Select delete to permanently delete this note.</p>
                <ButtonDiv>
                    <ModalButton
                        type='button'
                        onClick={deleteNote}
                    >
                        Delete
                    </ModalButton>

                    <ModalButton
                        type='button'
                        onClick={() => setDeleteNoteModal(false)}
                    >
                        Cancel
                    </ModalButton>
                </ButtonDiv>

            </ModalInfo>
        </Modal>
    );
}
