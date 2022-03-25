import { UilInfoCircle, UilGithub, UilLinkedin } from '@iconscout/react-unicons';
import { useState, useEffect } from 'react';

import Slide from '../Animations/Slide';
import './InfoButton.css';

import { SiHeroku, SiPostgresql, SiExpress, SiSequelize, SiNodedotjs, SiReact, SiRedux, SiHtml5, SiCss3 } from 'react-icons/si';




function InfoModal() {
    return (
        <div className='modal-div'>
            <div className='tech-stack'>
                <SiReact style={{ color: `rgb(83, 206, 242)` }} />
                <SiRedux style={{ color: `rgb(104, 63, 174)` }} />
                <SiExpress style={{ color: `black` }} />
                <SiNodedotjs style={{ color: `rgb(78, 136, 68)` }} />
                <SiHeroku style={{ color: `rgb(51, 0, 136)` }} />
                <SiSequelize style={{ color: `rgb(31, 107, 175)` }} />
                <SiPostgresql style={{ color: `rgb(44, 89, 130)` }} />
                <SiCss3 style={{ color: `rgb(36, 87, 231)` }} />
                <SiHtml5 style={{ color: `rgb(231, 87, 36)` }} />
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


export default function InfoButton({ color }) {
    const [modalVisibility, setModalVisibility] = useState(false);

    return (
        <div className='button-and-modal-container'>
            <button className='info-button' onClick={() => setModalVisibility(!modalVisibility)} type='button'>
                <UilInfoCircle className={`info-icon ${color}`} size='40' />
            </button>
            {modalVisibility &&
                <Slide direction='right'>
                    <InfoModal />
                </Slide>
            }
        </div>
    );
}
