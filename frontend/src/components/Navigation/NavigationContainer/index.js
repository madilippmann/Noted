import { UilHome, UilBooks, UilBook, UilFilePlusAlt, UilTagAlt, UilUsersAlt, UilAngleRight } from '@iconscout/react-unicons';
import './NavigationContainer.css';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import * as notesActions from '../../../store/notes';
import * as notebooksActions from '../../../store/notebooks';
import { sortByUpdatedAt, formatNotebooks, formatNotes } from '../../utils/utils';

const NavigationContainer = ({ type, dropdown }) => {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const notes = useSelector(state => state.notes.notes)
    const notebooks = useSelector(state => state.notebooks.notebooks)


    const [formattedNotes, setFormattedNotes] = useState([])
    const [formattedNotebooks, setFormattedNotebooks] = useState([])

    useEffect(() => {
        setFormattedNotes(sortByUpdatedAt(formatNotes(notes)))
        setFormattedNotebooks(sortByUpdatedAt(formatNotebooks(notebooks)))
    }, [notes, notebooks])


    const [openNav, setOpenNav] = useState(false);
    const [navArrowColor, setNavArrowColor] = useState('#5D2BC5')


    useEffect(() => {
        dispatch(notesActions.loadNotesThunk(sessionUser.id))
        dispatch(notebooksActions.loadNotebooksThunk(sessionUser.id))
    }, [dispatch])



    const toggleNav = () => {
        setOpenNav(!openNav);
    }

    useEffect(() => {
        setNavArrowColor(navArrowColor === '#bea3fa' ? '#5D2BC5' : '#bea3fa');
    }, [openNav])

    return (
        <div className='nav-sidebar-container'>
            {dropdown &&
                <div id='arrow-icon-container'>
                    <button onClick={toggleNav} className='arrow-right-button' type='button' >
                        <UilAngleRight className={`arrow-right-icon ${openNav}`} side='40' style={{ color: `${navArrowColor}` }} />
                    </button>
                </div>}

            {!dropdown && <div className='filler'></div>}

            {type === 'Home' && <div className='nav-icon-container'><UilHome side='30' className='icon' /></div>}
            {type === 'Notebooks' && <div className='nav-icon-container'><UilBooks side='30' className='icon' /></div>}
            {type === 'Notes' && <div className='nav-icon-container'><UilFilePlusAlt side='30' className='icon' /></div>}
            {type === 'Tags' && <div className='nav-icon-container'><UilTagAlt side='30' className='icon' /></div>}

            <h4>{type}</h4>
        </div>
    );
}

export default NavigationContainer;
