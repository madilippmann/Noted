import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { loadNotesThunk } from '../../store/notes';
import { loadNotebooksThunk } from '../../store/notebooks';
import { loadAllTagsThunk } from '../../store/tags';

import { formatNotes, formatTags, formatNotebooks } from '../utils/utils.js'



const Search = ({ type }) => {
    const dispatch = useDispatch();

    const sessionUser = useSelector(state => state.sessionUser)
    const notes = useSelector(state => state.notes.notes);
    const notebooks = useSelector(state => state.notebooks.notebooks);
    const tags = useSelector(state => state.tags.tags);
    const search = useSelector(state => state.search);

    const [searchTerm, setSearchTerm] = useState('');



    useEffect(() => {
        dispatch(loadNotesThunk(sessionUser.id))
        dispatch(loadNotebooksThunk(sessionUser.id))
        dispatch(loadAllTagsThunk(sessionUser.id))
        dispatch(loadSearch())
    }, [dispatch])


    const handleSearch = (e) => {
        setSearchTerm(e.target.value)
        if (e.target.value) {
            dispatch(updateSearchThunk(e.target.value))
        } else {
            dispatch(updateSearchThunk(''))
        }
    }

    if (type === 'tags') {
        return (
            <></>
        );

    }


}


export default Search;
