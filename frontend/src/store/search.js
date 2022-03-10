
const LOAD_SEARCH = 'search/LOAD_SEARCH';

const UPDATE_SEARCH = 'search/UPDATE_SEARCH';

export const loadSearch = () => ({
    type: LOAD_SEARCH,
})



export const updateSearch = (search) => ({
    type: UPDATE_SEARCH,
    search
})



export const loadSearchThunk = (search) => async (dispatch) => {
    dispatch(loadSearch(search));
}



export const updateSearchThunk = (search) => async (dispatch) => {
    dispatch(updateSearch(search))
}



const initialState = '';

const searchReducer = (state = initialState, action) => {
    let newState;
    let newSearch;

    switch (action.type) {
        case LOAD_SEARCH:
            // newState = { ...state }
            // newState.search = action.search
            return state;
        case UPDATE_SEARCH:
            newState = action.search
            return newState;
        default:
            return state
    }
}

export default searchReducer;
