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
