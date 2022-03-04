import { UilInfoCircle, UilGithub, UilLinkedin } from '@iconscout/react-unicons'
import { useState, useEffect } from 'react'

import './InfoButton.css'

import { SiHeroku, SiPostgresql, SiExpress, SiSequelize, SiNodedotjs, SiReact, SiRedux, SiHtml5, SiCss3 } from 'react-icons/si';

function InfoModal({ modalVisibility }) {
    return (
        <div className='modal-div' style={{ display: `${modalVisibility}` }}>
            <div className='tech-stack'>
                <SiReact />
                <SiRedux />
                <SiExpress />
                <SiNodedotjs />
                <SiSequelize />
                <SiPostgresql />
                <SiHeroku />
                <SiHtml5 />
                <SiCss3 />
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
