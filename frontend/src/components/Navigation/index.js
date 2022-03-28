import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, Link, NavLink, useHistory } from 'react-router-dom';

import RoundedContainer from './RoundedContainer';
import NavigationContainer from './NavigationContainer';
import RubberBand from '../Animations/RubberBand';
import Slide from '../Animations/Slide';

import { useAutosaveContext } from '../../context/AutosaveContext';

import * as sessionActions from '../../store/session';
import * as notesActions from '../../store/notes';
import * as notebooksActions from '../../store/notebooks';

import * as SC from './StyledComponents.js';
import { sortByUpdatedAt, formatNotebooks, formatNotes } from '../utils/utils';

import './Navigation.css';
import logo from '../static/images/noted-logo.png';

import { UilUserCircle, UilCheck, UilSetting, UilEllipsisH, UilSignout, UilHome, UilBooks, UilAngleRight, UilFileAlt, UilTagAlt } from '@iconscout/react-unicons';

export default function Navigation() {
    const dispatch = useDispatch();
    const history = useHistory();

    const sessionUser = useSelector(state => state.session.user);
    const notes = useSelector(state => state.notes.notes)
    const notebooks = useSelector(state => state.notebooks.notebooks)

    const { autosave, setAutosave } = useAutosaveContext();

    const [userDropdown, setUserDropdown] = useState(false);

    const [notesDropdown, setNotesDropdown] = useState(localStorage.getItem('notes-dropdown') === 'true' ? true : false);
    const [notebooksDropdown, setNotebooksDropdown] = useState(localStorage.getItem('notebooks-dropdown') === 'true' ? true : false);

    const [formattedNotes, setFormattedNotes] = useState([])
    const [formattedNotebooks, setFormattedNotebooks] = useState([])

    useEffect(() => {
        dispatch(notesActions.loadNotesThunk(sessionUser.id))
        dispatch(notebooksActions.loadNotebooksThunk(sessionUser.id))
    }, [dispatch])



    useEffect(() => {
        setFormattedNotes(sortByUpdatedAt(formatNotes(notes)))
        setFormattedNotebooks(sortByUpdatedAt(formatNotebooks(notebooks)))
    }, [notes, notebooks])


    const handleClick = async () => {
        const noteId = await dispatch(notesActions.createNoteThunk(sessionUser.id))
        history.push(`/notes/${noteId}`)
        return <Redirect to={`/notes/${noteId}`} />
    }




    const toggleAutosave = () => {
        localStorage.setItem('autosave-notes', !autosave);
        setAutosave(() => !autosave);

    }

    return (
        <div className='sidebar'>

            <div className='user-bar-container' >
                <div className='user-bar'>
                    <div className='left-justified'>
                        <div className='avatar-container'>
                            <UilUserCircle size='40' className='avatar-icon' />
                        </div>

                        <div className='user-full-name-container'>
                            <span className='user-full-name'>{sessionUser.firstName} {sessionUser.lastName}</span>
                        </div>
                    </div>

                    <div className='right-justified'>
                        <div className='ellipsis-container'>
                            <button onClick={() => setUserDropdown(!userDropdown)} className='ellipsis' type='button'>
                                <UilEllipsisH size='30' className='ellipsis-icon' />
                            </button>
                        </div>

                    </div>
                </div>


                {
                    userDropdown &&
                    <Slide direction='down' duration={.45}>
                        <div className='user-modal'>
                            <div className='modal-user-info-container'>
                                <div className='check-container'>
                                    <UilCheck size='20' />
                                </div>

                                <div className='avatar-container'>
                                    <UilUserCircle size='25' />
                                </div>

                                <div className='name-and-email-container'>
                                    <h4 id='user-full-name'>{sessionUser.firstName} {sessionUser.lastName}</h4>
                                    <h5>{sessionUser.email}</h5>
                                </div>
                            </div>

                            <div className='settings-and-sign-out-container'>

                                <div className='autosave no-hover'>
                                    <SC.P className='no-hover'>Autosave Notes </SC.P>
                                    <button className={`no-hover toggle-button ${autosave}`} type='button' onClick={toggleAutosave} >
                                        <div className={`no-hover toggle-circle ${autosave}`}>

                                        </div>
                                    </button>
                                </div>

                                {/* <Link to={`/settings`}>
                                    <div className='settings-sign-out'>
                                        <UilSetting size='25' />
                                        Profile Settings
                                    </div>
                                </Link> */}

                                <button type='button' onClick={() => dispatch(sessionActions.logout())} >
                                    <div className='settings-sign-out'>
                                        <UilSignout size='25' />Sign out {sessionUser.firstName} {sessionUser.lastName}
                                    </div>
                                </button>

                            </div>
                        </div>
                    </Slide>
                }

            </ div>

            <div className='search-and-create-bars-container'>
                <RoundedContainer type='search' />
                <button type='button' onClick={handleClick}>
                    <RoundedContainer userId={sessionUser.id} type='new-note' />
                </button>
            </div>

            <nav className='nav-bars-container'>
                <NavLink
                    className='main-nav-links'
                    exact to='/'
                    style={(isActive) => isActive ? { backgroundColor: `rgb(232, 220, 255)` } : { backgroundColor: `transparent` }}
                >
                    <div className='nav-sidebar-container'>
                        <div className='filler'></div>
                        <div className='nav-icon-container'><UilHome side='30' className='icon' /></div>
                        <h4>Home</h4>
                    </div>
                </NavLink>


                <NavLink
                    className='main-nav-links'
                    to='/notebooks'
                    style={(isActive) => isActive ? { backgroundColor: `rgb(232, 220, 255)` } : { backgroundColor: `transparent` }}
                >
                    <div className='nav-sidebar-container'>
                        <div id='arrow-icon-container'>
                            <button data-name='notebooks' onClick={(e) => {
                                e.preventDefault();
                                localStorage.setItem('notebooks-dropdown', !notebooksDropdown)
                                setNotebooksDropdown(() => !notebooksDropdown)
                            }} className='arrow-right-button' type='button' >
                                <UilAngleRight className={`arrow-right-icon ${notebooksDropdown}`} side='40' style={{ color: `black` }} />
                            </button>
                        </div>
                        <div className='nav-icon-container'><UilBooks side='30' className='icon' /></div>
                        <h4>Notebooks</h4>
                    </div>

                </NavLink>

                {notebooksDropdown === true && <div className='results-outer-container nav-dropdown-outer'>
                    <div className='results-container nav-dropdown'>
                        <div className='results'>
                            {formattedNotebooks?.map((notebook, i) => {

                                if (i < 5) {
                                    return (
                                        <Link key={notebook.id} to={`/notebooks/${notebook.id}`}>
                                            <p className='result-link' >‣ {notebook.title}</p>
                                        </Link>
                                    )
                                }
                            })}

                        </div>

                    </div>
                </div>}

                <NavLink
                    className='main-nav-links'
                    to='/notes'
                    style={(isActive) => isActive ? { backgroundColor: `rgb(232, 220, 255)` } : { backgroundColor: `transparent` }}
                >

                    <div className='nav-sidebar-container'>
                        <div id='arrow-icon-container'>
                            <button onClick={(e) => {
                                e.preventDefault();
                                localStorage.setItem('notes-dropdown', !notesDropdown)
                                setNotesDropdown(() => !notesDropdown)
                            }} className='arrow-right-button' type='button' >
                                <UilAngleRight className={`arrow-right-icon ${notesDropdown}`} side='40' style={{ color: `black` }} />
                            </button>
                        </div>
                        <div className='nav-icon-container'><UilFileAlt side='30' className='icon' /></div>
                        <h4>Notes</h4>
                    </div>
                </NavLink>

                {notesDropdown === true && <div className='results-outer-container nav-dropdown-outer'>
                    <div className='results-container nav-dropdown'>
                        <div className='results'>
                            {formattedNotes?.map((note, i) => {
                                if (i < 5) {
                                    return (
                                        <Link key={note.id} to={`/notes/${note.id}`}>
                                            <p className='result-link' >‣ {note.title}</p>
                                        </Link>
                                    )
                                }
                            })}

                        </div>

                    </div>
                </div>}



            </nav>

        </div >
    );
}
