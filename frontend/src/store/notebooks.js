import { csrfFetch } from "./csrf";

const LOAD_NOTEBOOKS = 'notes/LOAD_NOTEBOOKS';
const ADD_NOTEBOOK = 'notes/ADD_NOTEBOOK';
const DELETE_NOTEBOOK = 'notes/DELETE_NOTEBOOK';

export const loadNotebooks = (notebooks) => ({
    type: LOAD_NOTEBOOKS,
    notebooks
})

export const addNotebook = (newNotebook) => ({
    type: ADD_NOTEBOOK,
    newNotebook
})

export const deleteNotebook = (notebook) => ({
    type: DELETE_NOTEBOOK,
    notebook
})


// Thunk for loading notebooks
export const loadNotebooksThunk = (userId) => async (dispatch) => {
    const res = await csrfFetch(`/api/users/${userId}/notebooks`)
    const notebooks = await res.json();
    dispatch(loadNotebooks(notebooks.notebooks));
    return notebooks;
}


// Thunk for creating new notebook
export const createNotebookThunk = (userId) => async (dispatch) => {
    const res = await csrfFetch(`/api/users/${userId}/notebooks`, {
        method: 'POST',
        body: JSON.stringify({ userId })
    });

    const notebook = await res.json()
    dispatch(addNotebook(notebook.notebook))
    return notebook.notebook.id
}

// Thunk for deleting notebook
export const deleteNotebookThunk = (notebook) => async (dispatch) => {
    const { userId, id } = notebook;

    console.log('Notebook from thunk: ', notebook);
    const res = await csrfFetch(`/api/users/${userId}/notebooks/${id}`, {
        method: 'DELETE',
        body: JSON.stringify({ id })
    });

    const removedNotebook = await res.json()
    dispatch(deleteNotebook(removedNotebook.notebook))
    return removedNotebook
}




const initialState = { notebooks: {} };

const notebooksReducer = (state = initialState, action) => {
    let newState;
    let newNotebooks;

    switch (action.type) {
        case LOAD_NOTEBOOKS:
            newState = { ...state }
            newNotebooks = action.notes.reduce((acc, notebook) => {
                acc[notebook.id] = notebook
                return acc;
            }, {})
            newState.notebooks = newNotebooks
            return newState;
        case ADD_NOTEBOOK:
            // newState = { ...state };
            // newNotebooks = { ...state.notes };
            // newNotebooks[action.newNote.id] = action.newNote;
            // newState.notes = newNotebooks;
            return newState;
        case DELETE_NOTEBOOK:
            // newState = { ...state };
            // newNotebooks = { ...state.notes };
            // delete newNotebooks[action.note.id];
            // newState.notes = newNotebooks;
            return newState;
        default:
            return state
    }
}

export default notebooksReducer;
