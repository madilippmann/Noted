import { UilInfoCircle, UilGithub, UilLinkedin } from '@iconscout/react-unicons'
import { useState, useEffect } from 'react'

import './InfoButton.css'

import { SiHeroku, SiPostgresql, SiExpress, SiSequelize, SiNodedotjs, SiReact, SiRedux, SiHtml5, SiCss3 } from 'react-icons/si';

function InfoModal({ modalVisibility }) {
    return (
        <div className='modal-div' style={{ display: `${modalVisibility}` }}>
            <div className='tech-stack'>
                <SiReact style={{ color: `rgb(83, 206, 242)` }} />
                <SiRedux style={{ color: `rgb(104, 63, 174)` }} />
                <SiExpress style={{ color: `black` }} />
                <SiNodedotjs style={{ color: `rgb(78, 136, 68)` }} />
                <SiSequelize style={{ color: `rgb(31, 107, 175)` }} />
                <SiPostgresql style={{ color: `rgb(44, 89, 130)` }} />
                <SiHeroku style={{ color: `rgb(51, 0, 136)` }} />
                <SiHtml5 style={{ color: `rgb(231, 87, 36)` }} />
                <SiCss3 style={{ color: `rgb(36, 87, 231)` }} />
            </div>

            <div className='social-links white'>
                <a href='https://github.com/madilippmann'>
                    <UilGithub size='40' className='social-link' />
                </a>
                <a href='https://www.linkedin.com/in/madilippmann/'>
                    <UilLinkedin size='40' className='social-link' />
                </a>
            </div>
        </div>
    );
}


export default function InfoButton() {
    const [modalVisibility, setModalVisibility] = useState('none');

    useEffect(() => {
        console.log(modalVisibility);
    }, [modalVisibility])

    const toggleModalVisibility = () => {
        if (modalVisibility === 'none') setModalVisibility('flex');
        else setModalVisibility('none')
    }

    return (
        <div class='button-and-modal-container'>
            <button className='info-button' onClick={toggleModalVisibility} type='button'>
                <UilInfoCircle className='info-icon white' size='40' />
            </button>
            <InfoModal modalVisibility={modalVisibility} />
        </div>
    );
}
