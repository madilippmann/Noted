import { csrfFetch } from "./csrf";

const SET_USER_SESSION = 'session/SET_USER_SESSION';
const REMOVE_USER_SESSION = 'session/REMOVE_USER_SESSION';

export const setUserSession = (user) => ({
    type: SET_USER_SESSION,
    user
})

export const removeUserSession = () => ({
    type: REMOVE_USER_SESSION,
})


// Thunk for setting user session
export const login = ({ credential, password }) => async (dispatch) => {
    const res = await csrfFetch('/api/session', {
        method: 'POST',
        body: JSON.stringify({ credential, password })
    });

    const data = await res.json();
    dispatch(setUserSession(data.user));
    return res;
}


export const restoreUser = () => async (dispatch) => {
    const response = await csrfFetch('/api/session');
    const data = await response.json();

    console.log('DATA: ', data);
    dispatch(setUserSession(data.user));
    return response;
};


export const signup = (user) => async (dispatch) => {
    const { email, firstName, lastName, password } = user;
    const res = await csrfFetch('/api/users', {
        method: 'POST',
        body: JSON.stringify({ email, firstName, lastName, password })
    });

    const data = await res.json();
    dispatch(setUserSession(data.user));
    return res;
}


export const logout = () => async (dispatch) => {
    const response = await csrfFetch('/api/session', {
        method: 'DELETE',
    });
    dispatch(removeUserSession());
    return response;
};

const initialState = { user: null };
// {
//     user: {
//       id,
//       email,
//       username,
//       createdAt,
//       updatedAt
//     }
//   }

const sessionReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case SET_USER_SESSION:
            newState = Object.assign({}, state);
            newState.user = action.user
            return newState
        case REMOVE_USER_SESSION:
            newState = Object.assign({}, state)
            newState.user = null;
            return newState;
        default:
            return state
    }
}


export default sessionReducer;
