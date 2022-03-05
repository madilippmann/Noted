import { csrfFetch } from "./csrf";

const LOAD_NOTES = 'notes/LOAD_NOTES';
const ADD_NOTE = 'notes/ADD_NOTE';
const DELETE_NOTE = 'notes/DELETE_NOTE';
const UPDATE_NOTE = 'notes/UPDATE_NOTE';

export const loadNotes = (userId) => ({
    type: LOAD_NOTES,
    userId
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
export const loadNotesThunk = () => async (dispatch) => {
    const res = await csrfFetch('/api/notes')
    const notes = await res.json();
    dispatch(loadNotes(notes));
    return notes;

}

// Thunk for creating new note
export const createNoteThunk = (note) => async (dispatch) => {
    console.log("Note data BEFORE adding to DB: ", note);

    const { title, content, userId } = note;
    const res = await csrfFetch('/api/notes', {
        method: 'POST',
        body: JSON.stringify({ title, content, userId })
    });

    const data = await res.json()
    console.log("Note data AFTER adding to DB: ", data);
    dispatch(addNote(data))

}


const initialState = { notes: {} };

const notesReducer = (state = initialState, action) => {
    let newState;
    let newNotes;
    let TODO;

    switch (action.type) {
        case LOAD_NOTES:
            newState = { ...state }
            newNotes = {}
            newNotes = action.notes.reduce((acc, note) => {
                acc[note.id] = note
                return acc;
            }, {})
            // action.notes.forEach(note => newNotes[note.id] = note);
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
