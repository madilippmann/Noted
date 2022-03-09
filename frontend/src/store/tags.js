import { csrfFetch } from "./csrf";

const LOAD_TAGS = 'tags/LOAD_TAGS';
const ADD_TAG = 'tags/ADD_TAG';
const DELETE_TAG = 'tags/DELETE_TAG';
const UPDATE_TAG = 'tags/UPDATE_TAG';

export const loadTags = (tags) => ({
    type: LOAD_TAGS,
    tags
})

export const addTag = (newTag) => ({
    type: ADD_TAG,
    newTag
})

export const updateTag = (updatedTag) => ({
    type: UPDATE_TAG,
    updatedTag
})

export const deleteTag = (tag) => ({
    type: DELETE_TAG,
    tag
})


// Thunk for loading tags
export const loadTagsThunk = ({ userId, noteId }) => async (dispatch) => {
    const res = await csrfFetch(`/api/users/${userId}/notes/${noteId}/tags`)
    const tags = await res.json();
    dispatch(loadTags(tags.tags));
    return tags;
}


// Thunk for creating new tag
export const createTagThunk = ({ userId, noteId }) => async (dispatch) => {
    const res = await csrfFetch(`/api/users/${userId}/notes/${noteId}/tags`, {
        method: 'POST',
        body: JSON.stringify({ name: 'New Tag' })
    });

    const tag = await res.json()
    dispatch(addTag(tag.tag))
    return tag.tag.id
}


export const deleteTagThunk = (tag) => async (dispatch) => {
    const { userId, noteId, tagId } = tag;

    const res = await csrfFetch(`/api/users/${userId}/notes/${noteId}/tags/${tagId}`, {
        method: 'DELETE',
        body: JSON.stringify({
            id: tagId,

        })
    });

    const removedTag = await res.json()
    dispatch(deleteTag(removedTag.tag))
    return removedTag
}

export const updateTagThunk = (tagData) => async (dispatch) => {
    const { tagId, name, userId, noteId } = tagData
    const res = await csrfFetch(`/api/users/${userId}/notes/${noteId}/tags/${tagId}`, {
        method: 'PATCH',
        body: JSON.stringify({ name, noteId, tagId })
    });

    const tag = await res.json()
    dispatch(updateTag(tag.tag))
}



const initialState = { tags: {} };

const tagsReducer = (state = initialState, action) => {
    let newState;
    let newTags;

    switch (action.type) {
        case LOAD_TAGS:
            newState = { ...state }
            newTags = action.tags.reduce((acc, tag) => {
                acc[tag.id] = tag
                return acc;
            }, {})
            newState.tags = newTags
            return newState;
        case ADD_TAG:
            newState = { ...state };
            newTags = { ...state.tags };
            newTags[action.newTag.id] = action.newTag;
            newState.tags = newTags;
            return newState;
        case UPDATE_TAG:
            newState = { ...state };
            newTags = { ...state.tags };
            newTags[action.updatedTag.id] = action.updatedTag;
            newState.tags = newTags;
            return newState;
        case DELETE_TAG:
            newState = { ...state };
            newTags = { ...state.tags };
            delete newTags[action.tag.id];
            newState.tags = newTags;
            return newState;
        default:
            return state
    }
}

export default tagsReducer;
