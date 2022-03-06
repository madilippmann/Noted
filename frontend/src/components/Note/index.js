import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from 'react-router-dom';
import * as notesActions from '../../store/notes';

import styled from 'styled-components'
import './Note.css';
import { OuterDiv } from "../utils/utils";
import { UilTimes } from '@iconscout/react-unicons'

export default function Note() {
    const { noteId } = useParams();
    const dispatch = useDispatch();
    const note = useSelector(state => state.notes.notes[noteId]);

    const [title, setTitle] = useState(note.title);
    const [content, setContent] = useState(note.content);
    const [disabled, setDisabled] = useState(true);
    const [formValidations, setFormValidations] = useState([]);
    const [deleteNoteModal, setDeleteNoteModal] = useState(false);


    useEffect(() => {
        if (title.length > 100 || title.length === 0) {
            setDisabled(true)
        }
        else setDisabled(false)
    }, [title])


    const Input = styled.input``;

    const Textarea = styled.textarea``;

    const Button = styled.button``;

    const saveNote = (e) => {
        e.preventDefault()

    }


    const TitleError = styled.p`
        color: red;
        margin: 0;

    `;


    return (
        <OuterDiv>
            <form
                onSubmit={saveNote}
            >
                {disabled && <TitleError>Title must be between 1 and 100 characters long.</TitleError>}

                <Input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />

                <Button
                    type='submit'
                    disabled={disabled}
                >
                    Save
                </Button>
                <Button
                    type='button'
                    onClick={() => setDeleteNoteModal(true)}
                >
                    Delete Note
                </Button>

                <Textarea
                    placeholder='Start writing...'
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                />

            </form>

            {deleteNoteModal && <DeleteNoteModal setDeleteNoteModal={setDeleteNoteModal} />}
        </OuterDiv>
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
