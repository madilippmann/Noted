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

export const deleteNote = () => ({
    type: DELETE_NOTE
})



// Thunk for loading notes
export const loadNotesThunk = (userId) => async (dispatch) => {
    const res = await csrfFetch(`/api/users/${userId}/notes`)
    const notes = await res.json();
    console.log('NOTES: ', notes.notes);
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
    console.log("Note data AFTER adding to DB: ", note);
    dispatch(addNote(note))
}


const initialState = { notes: [] };

const notesReducer = (state = initialState, action) => {
    let newState;
    let newNotes;
    let TODO;

    console.log('ENTERED REDUCER', Array.isArray(action.notes));
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
            newNotes = { ...state.notes }
            newNotes[action.newNote.id] = action.newNote;
            newState.notes = newNotes;
            return newState;
        case DELETE_NOTE:
            return TODO;
        case UPDATE_NOTE:
            return TODO
        default:
            return state
    }
}

export default notesReducer;
