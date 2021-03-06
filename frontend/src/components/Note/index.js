import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams, Redirect, Link } from 'react-router-dom';

import * as notesActions from '../../store/notes';
import * as notebooksActions from '../../store/notebooks';
import * as tagsActions from '../../store/tags';

import * as SC from './StyledComponents'
import { OuterDiv } from "../StyledComponents";

import { useAutosaveContext } from "../../context/AutosaveContext";

// CKEditor
// import Editor from 'ckeditor5-custom-build/build/ckeditor'
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';


import './Note.css';
import { formatNotebooks, formatTags, sortByTitle, formattedDate } from "../utils/utils";
import { UilTimes, UilCheck, UilPlusCircle, UilArrowCircleLeft } from '@iconscout/react-unicons'

import Slide from "../Animations/Slide";


export default function Note({ userId }) {
    const { noteId } = useParams();
    const dispatch = useDispatch();
    const history = useHistory();

    const sessionUser = useSelector(state => state.session.user);
    const notebooks = useSelector(state => state.notebooks.notebooks);
    const formattedNotebooks = sortByTitle(formatNotebooks(notebooks))
    const note = useSelector(state => state.notes.notes[noteId]);
    const tags = useSelector(state => state.tags.tags);

    let formattedTags = formatTags(tags)

    const { autosave } = useAutosaveContext();

    const [title, setTitle] = useState(note?.title);
    const [content, setContent] = useState(note?.content);
    const [notebookId, setNotebookId] = useState(note?.notebookId || null);
    const [disabled, setDisabled] = useState(true);
    const [errorMeesage, setErrorMessage] = useState(false);

    const [deleteNoteModal, setDeleteNoteModal] = useState(false);
    const [save, setSave] = useState(false);
    const [tagDelete, setTagDelete] = useState(null);

    const [initialData, setInitialData] = useState(note?.content);
    const [data, setData] = useState(note?.content);
    // FIX

    const tagsObj = formattedTags.reduce((tags, tag) => {
        tags[tag.id] = tag.name
        return tags
    }, {})


    const [names, setNames] = useState(tagsObj);

    useEffect(() => {
        dispatch(notesActions.loadNotesThunk(userId))
        dispatch(notebooksActions.loadNotebooksThunk(userId))
        dispatch(tagsActions.loadAllTagsThunk(userId))
    }, [dispatch])


    useEffect(() => {
        if (save) {
            const timer = setTimeout(() => setSave(false), 3000)
            return () => clearTimeout(timer)
        }
    }, [save])

    useEffect(() => {
        if (autosave) {
            setDisabled(true);
            setSave(false)
        }
    }, [autosave])


    useEffect(async () => {

        if (!autosave) {
            if ((!title || title?.length > 100 || title.length === 0 || /^\s*$/.test(title))) {
                setDisabled(true)
                setErrorMessage(true)

            } else {
                setDisabled(false)
                setErrorMessage(false)
            }
        }

        else if (autosave) {
            setDisabled(true)

            if ((!title || title?.length > 100 || title.length === 0 || /^\s*$/.test(title))) {
                setErrorMessage(true)
            } else {
                setErrorMessage(false)
            }
        }

        // const interval = setInterval(async () => {
        if (autosave) {
            let noteData;
            if (notebookId && notebookId !== null) {

                if (data.length === 0) {
                    noteData = {
                        title,
                        content: '<p></p>',
                        notebookId,
                        noteId: note.id,
                        userId: note.userId
                    }
                } else {
                    noteData = {
                        title,
                        content: data,
                        notebookId,
                        noteId: note.id,
                        userId: note.userId
                    }
                }

                const noteRes = await dispatch(notesActions.updateNoteThunk(noteData));

                const notebookRes = await dispatch(notebooksActions.updateNotebookThunk({
                    notebookId,
                    title: notebooks[notebookId].title,
                    userId: note.userId,
                }))
            } else {

                if (data.length === 0) {
                    noteData = {
                        title,
                        content: '<p></p>',
                        noteId: note.id,
                        userId: note.userId
                    }
                } else {
                    noteData = {
                        title,
                        content: data,
                        noteId: note.id,
                        userId: note.userId
                    }
                }

                const noteRes = await dispatch(notesActions.updateNoteThunk(noteData));
            }

        }
        // }, 5000)



        // return () => clearInterval(interval)
    }, [autosave, title, data])

    const saveNote = async (e) => {
        e.preventDefault()

        let noteData;
        if (notebookId && notebookId !== null) {
            if (data.length === 0) {
                noteData = {
                    title,
                    content: '<p></p>',
                    notebookId,
                    noteId: note.id,
                    userId: note.userId
                }

            } else {
                noteData = {
                    title,
                    content: data,
                    notebookId,
                    noteId: note.id,
                    userId: note.userId
                }
            }

            const noteRes = await dispatch(notesActions.updateNoteThunk(noteData));

            const notebookRes = await dispatch(notebooksActions.updateNotebookThunk({
                notebookId,
                title: notebooks[notebookId].title,
                userId: note.userId,
            }))

        } else {
            if (data.length === 0) {
                noteData = {
                    title,
                    content: '<p></p>',
                    noteId: note.id,
                    userId: note.userId
                }

            } else {
                noteData = {
                    title,
                    content: data,
                    noteId: note.id,
                    userId: note.userId
                }
            }

            const noteRes = await dispatch(notesActions.updateNoteThunk(noteData));
        }

        setSave(true)
    }


    const deleteTag = async (tagId) => {
        await dispatch(tagsActions.deleteTagThunk({
            tagId,
            noteId: note.id,
            userId: note.userId
        }))
    }


    const saveTagName = async (tagId, name) => {
        if (name.length > !name.trim()) {
            await dispatch(tagsActions.updateTagThunk({
                tagId,
                noteId: note.id,
                userId: note.userId,
                name
            }))
        } else {
            // TODO FIGURE OUT HOW TO MAKE THE TAG RED
        }
    }



    return (
        // padding: '15px'
        <OuterDiv
            style={{
                borderRadius: '5px',
                backgroundColor: 'rgba(255, 255, 255, .85)',
                width: '76%',
                height: '95%',
                margin: 'auto'
            }}
        >
            <SC.Form
                onSubmit={(e) => {
                    saveNote(e)
                }}
            >
                <SC.CenteringDiv style={{ width: '100%', alignItems: 'flex-start' }}>
                    <SC.CenteringDiv style={{ flexDirection: 'row', paddingBottom: '10px', alignItems: 'flex-end' }}>
                        <div style={{ width: '100%' }}>
                            {/* <Link to='/notes'> */}
                            <button type='button' onClick={() => history.push('/notes')}>
                                <SC.ClickableIcon>
                                    <UilArrowCircleLeft size='40' />
                                </SC.ClickableIcon>
                            </button>
                            {/* </Link> */}

                            {!autosave && <p style={{ width: '100%', fontSize: '12px', flexGrow: '4', alignSelf: 'flex-end', margin: '0' }}>
                                <span style={{ fontWeight: '800' }}>
                                    Last Updated:
                                </span> {formattedDate(note.updatedAt)}
                            </p>}
                        </div>
                        <SC.ButtonDiv2>
                            <div style={{ paddingRight: '10px' }}>
                                <label
                                    for='notebookId'
                                    style={{ paddingRight: '10px' }}
                                >
                                    Notebook:
                                </label>

                                <select
                                    name='notebookId'
                                    value={notebookId}
                                    onChange={(e) => setNotebookId(e.target.value)}
                                >
                                    <option value={0}>None</option>
                                    {formattedNotebooks.map(notebook => (
                                        <option
                                            value={notebook.id}
                                            key={notebook.id}
                                        >
                                            {notebook.title}
                                        </option>
                                    ))}
                                    <option>
                                    </option>
                                </select>
                            </div>

                            {save && <UilCheck size='30' style={{ color: '#4fb06b' }} />}

                            <SC.Button
                                type='submit'
                                // onClick={saveNote}
                                disabled={disabled}
                                buttonColor='#4fb06b'
                            >
                                {autosave ? <span>Autosave On</span> : <span>Save</span>}

                            </SC.Button>
                            <SC.Button
                                type='button'
                                onClick={() => setDeleteNoteModal(true)}
                                buttonColor='#f25c5c'

                            >
                                Delete Note
                            </SC.Button>
                            {deleteNoteModal && <DeleteNoteModal note={note} setDeleteNoteModal={setDeleteNoteModal} />}
                        </SC.ButtonDiv2>
                    </SC.CenteringDiv>
                    <SC.CenteringDiv style={{ width: '100%' }}>
                        {errorMeesage && <SC.TitleError>Title must be between 1 and 100 characters long.</SC.TitleError>}

                        <SC.TitleInput
                            value={title}
                            placeholder='Title'
                            onChange={(e) => {
                                setTitle(e.target.value)
                            }}
                        />
                    </SC.CenteringDiv>

                </SC.CenteringDiv>

                <SC.CenteringDiv>
                    <SC.TextEditorContainer>
                        <CKEditor
                            config={{ height: '100%' }}
                            className='editor'
                            editor={ClassicEditor}
                            data={data}
                            onReady={editor => {
                                // You can store the "editor" and use when it is needed.
                            }}
                            onChange={(event, editor) => {
                                const data = editor.getData();
                                if (data.length === 0) {
                                    setData(() => '')
                                } else {
                                    setData(() => data)
                                }

                                // console.log({ event, editor, data });
                            }}
                            onBlur={(event, editor) => {
                                // console.log('Blur.', data, data.length);
                            }}
                            onFocus={(event, editor) => {

                                // console.log('Focus.', data);
                            }}
                        />

                    </SC.TextEditorContainer>

                    <SC.TagsOuterContainer>
                        <SC.TagsContainer>
                            <h4 id="tags-title">Tags:</h4>
                            {formattedTags.length > 0 && formattedTags.map(tag => (
                                tag.noteId === note.id &&
                                <SC.InputDiv
                                    key={tag.id}
                                    onFocus={() => {
                                        setTagDelete(tag.id)
                                    }}
                                    onBlur={(e) => {
                                        saveTagName(tag.id, names[tag.id])
                                        // e.preventDefault();
                                        // setTagDelete(null)
                                    }}
                                >
                                    <SC.TagInput
                                        value={names[tag.id]}
                                        onChange={(e) => setNames((prevNames) => {
                                            const newNames = { ...prevNames }
                                            newNames[tag.id] = e.target.value
                                            return newNames
                                        })}

                                        size={names[tag.id] ? names[tag.id].length : 5}
                                    >
                                    </SC.TagInput>
                                    {tagDelete === tag.id &&
                                        <SC.DeleteTagButton
                                            type='button'
                                            className='delete-tag'
                                            onClick={() => {
                                                deleteTag(tag.id)
                                            }}
                                        >
                                            <UilTimes id='add-tag-icon' size='20' />
                                        </SC.DeleteTagButton>
                                    }
                                </SC.InputDiv>
                            ))}
                        </SC.TagsContainer>


                        <SC.TagsCreate>
                            <button
                                type='button'
                                onClick={() => dispatch(tagsActions.createTagThunk({
                                    userId: note.userId,
                                    noteId: note.id,
                                    name: 'New Tag'
                                }))}
                            >
                                <UilPlusCircle size='25' />
                            </button>
                        </SC.TagsCreate>
                    </SC.TagsOuterContainer>
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
                <SC.ModalDiv className='user-modal-relative1' >
                    <button
                        type='button'
                        onClick={() => setDeleteNoteModal(false)}
                    >
                        <UilTimes size='30' style={{ color: 'white' }} />
                    </button>
                    <SC.ModalInfo>
                        <p style={{ marginTop: '0', fontSize: '13px', textAlign: 'center' }}>Select delete to<br />permanently delete this note.</p>
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
