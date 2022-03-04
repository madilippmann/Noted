import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, Link, NavLink } from 'react-router-dom';

import RoundedContainer from './RoundedContainer';
import NavigationContainer from './NavigationContainer';

import * as sessionActions from '../../store/session';

import './Navigation.css'
import logo from '../static/images/noted-logo.png';

import { AttentionSeeker, Fade } from "react-awesome-reveal";
import { UilUserCircle, UilCheck, UilAngleDown, UilEllipsisH } from '@iconscout/react-unicons';

export default function Navigation() {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);

    const [userDropdown, setUserDropdown] = useState(false);

    useEffect(() => {
        console.log('Navigation component loaded');
    }, [])



    return (
        <div className='sidebar'>
            <div className='img-container'>
                <AttentionSeeker effect='rubberBand' triggerOnce>
                    <img className='logo' src={logo} />
                </AttentionSeeker>
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
                                <UilEllipsisH size='25' className='ellipsis-icon' />
                            </button>
                        </div>

                    </div>
                </div>


                {userDropdown && <Fade direction='in' onVisibilityChange>
                    <div className='user-modal'>
                        <div className='modal-user-info-container'>
                            <div className='check-container'>
                                <UilCheck size='20' />
                            </div>

                            <div className='avatar-container'>
                                <UilUserCircle size='25' />
                            </div>

                            <div className='name-and-email-container'>
                                <h4>{sessionUser.firstName} {sessionUser.lastName}</h4>
                                <h5>{sessionUser.email}</h5>
                            </div>
                        </div>

                        <div className='settings-and-sign-out-container'>
                            <Link to={`users/${sessionUser.id}/settings`}>
                                <div className='settings'>Account settings</div>
                            </Link>
                            {/*  */}
                            <button type='button' onClick={() => dispatch(sessionActions.logout())} >
                                <div className='settings'>Sign out {sessionUser.firstName} {sessionUser.lastName}</div>
                            </button>

                        </div>
                    </div>
                </Fade>}

            </div>

            <div className='search-and-create-bars-container'>
                <RoundedContainer type='search' />
                <Link to='/notes/create'>
                    <RoundedContainer type='new-note' />
                </Link>
            </div>

            <nav className='nav-bars-container'>
                <NavLink to='/'>
                    <NavigationContainer className='home-nav' type='Home' dropdown={false} />
                </NavLink>
                <NavigationContainer type='Notebooks' dropdown={true} />
                <NavigationContainer type='Notes' dropdown={true} />
                <NavigationContainer type='Tags' dropdown={true} />
                <NavigationContainer type='Shared' dropdown={true} />

            </nav>

        </div>
    );
}
