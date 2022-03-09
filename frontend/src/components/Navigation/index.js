import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, Link, NavLink, useHistory } from 'react-router-dom';

import RoundedContainer from './RoundedContainer';
import NavigationContainer from './NavigationContainer';
import RubberBand from '../Animations/RubberBand';
import Slide from '../Animations/Slide';

import * as sessionActions from '../../store/session';
import * as notesActions from '../../store/notes';

import './Navigation.css';
import logo from '../static/images/noted-logo.png';

import { UilUserCircle, UilCheck, UilEllipsisH, UilSignout } from '@iconscout/react-unicons';

export default function Navigation() {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const notes = useSelector(state => state.notes.notes)
    const history = useHistory();
    const [userDropdown, setUserDropdown] = useState(false);

    const handleClick = async () => {
        const noteId = await dispatch(notesActions.createNoteThunk(sessionUser.id))
        history.push(`/notes/${noteId}`)
        return <Redirect to={`/notes/${noteId}`} />
    }

    return (
        <div className='sidebar'>

            <div className='sidebar-img-container'>
                <RubberBand>
                    <img className='logo' src={logo} />
                </RubberBand>
            </div>

            <div className='user-bar-container'>
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


                {userDropdown &&
                    <Slide direction='down'>
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
                                {/* <Link to={`users/${sessionUser.id}/settings`}>
                                    <div className='settings'>Account settings</div>
                                </Link> */}
                                {/*  */}
                                <button type='button' onClick={() => dispatch(sessionActions.logout())} >
                                    <div className='settings-sign-out'>
                                        <UilSignout size='25' />Sign out {sessionUser.firstName} {sessionUser.lastName}
                                    </div>
                                </button>

                            </div>
                        </div>
                    </Slide>
                }

            </div>

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
                    <NavigationContainer className='home-nav' type='Home' dropdown={false} />
                </NavLink>
                <NavLink
                    className='main-nav-links'
                    to='/notebooks'
                    style={(isActive) => isActive ? { backgroundColor: `rgb(232, 220, 255)` } : { backgroundColor: `transparent` }}
                >
                    <NavigationContainer type='Notebooks' dropdown={true} />
                </NavLink>
                <NavLink
                    className='main-nav-links'
                    to='/notes'
                    style={(isActive) => isActive ? { backgroundColor: `rgb(232, 220, 255)` } : { backgroundColor: `transparent` }}
                >
                    <NavigationContainer type='Notes' dropdown={true} />
                </NavLink>
                <NavLink
                    className='main-nav-links'
                    to='/tags'
                    style={(isActive) => isActive ? { backgroundColor: `rgb(232, 220, 255)` } : { backgroundColor: `transparent` }}
                >
                    <NavigationContainer type='Tags' dropdown={true} />
                </NavLink>


            </nav>

        </div>
    );
}
