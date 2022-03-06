import { csrfFetch } from "./csrf";

const LOAD_NOTES = 'notes/LOAD_NOTES';
const ADD_NOTE = 'notes/ADD_NOTE';
const DELETE_NOTE = 'notes/DELETE_NOTE';
const UPDATE_NOTE = 'notes/UPDATE_NOTE';

export const loadNotes = (notes) => ({
    type: LOAD_NOTES,
    notes
})

export const addNote = (newNote) => ({
    type: ADD_NOTE,
    newNote
})

export const updateNote = (updatedNote) => ({
    type: UPDATE_NOTE,
    updatedNote
})

export const deleteNote = (note) => ({
    type: DELETE_NOTE,
    note
})


// Thunk for loading notes
export const loadNotesThunk = (userId) => async (dispatch) => {
    const res = await csrfFetch(`/api/users/${userId}/notes`)
    const notes = await res.json();
    dispatch(loadNotes(notes.notes));
    return notes;
}


// Thunk for creating new note
export const createNoteThunk = (userId) => async (dispatch) => {
    const res = await csrfFetch(`/api/users/${userId}/notes`, {
        method: 'POST',
        body: JSON.stringify({ userId })
    });

    const note = await res.json()
    dispatch(addNote(note.note))
}


export const deleteNoteThunk = ({ userId, noteId }) => async (dispatch) => {
    const res = await csrfFetch(`/api/users/${userId}/notes/${noteId}`, {
        method: 'DELETE',
        body: JSON.stringify({ noteId })
    });

    const note = await res.json()
    dispatch(deleteNote(note.note))
}

export const updateNoteThunk = (noteData) => async (dispatch) => {
    const { noteId, title, content, userId, notebookId } = noteData
    const res = await csrfFetch(`/api/users/${userId}/notes/${noteId}`, {
        method: 'PATCH',
        body: JSON.stringify({ title, content, notebookId })
    });

    const note = await res.json()
    dispatch(updateNote(note.note))
}



const initialState = { notes: {} };

const notesReducer = (state = initialState, action) => {
    let newState;
    let newNotes;

    switch (action.type) {
        case LOAD_NOTES:
            newState = { ...state }
            newNotes = action.notes.reduce((acc, note) => {
                acc[note.id] = note
                return acc;
            }, {})
            newState.notes = newNotes
            return newState;
        case ADD_NOTE:
            newState = { ...state };
            newNotes = { ...state.notes };
            newNotes[action.newNote.id] = action.newNote;
            newState.notes = newNotes;
            return newState;
        case UPDATE_NOTE:
            newState = { ...state };
            newNotes = { ...state.notes };
            newNotes[action.updatedNote.id] = action.updatedNote;
            newState.notes = newNotes;
            return newState;
        case DELETE_NOTE:
            newState = { ...state };
            newNotes = { ...state.notes };
            delete newNotes[action.note.id];
            newState.notes = newNotes;
            return newState;
        default:
            return state
    }
}

export default notesReducer;
