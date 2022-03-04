import { UilHome, UilBook, UilFilePlusAlt, UilTagAlt, UilUsersAlt, UilAngleRight } from '@iconscout/react-unicons';
import './NavigationContainer.css';
import { useState, useEffect } from 'react';
const NavigationContainer = ({ type, dropdown }) => {
    const [openNav, setOpenNav] = useState('');
    const [navArrowColor, setNavArrowColor] = useState('#5D2BC5')

    const toggleNav = () => {
        if (openNav === 'open') setOpenNav('');
        else setOpenNav('open');
    }


    useEffect(() => {
        setNavArrowColor(navArrowColor === '#bea3fa' ? '#5D2BC5' : '#bea3fa');
        console.log(navArrowColor);
    }, [openNav])

    return (
        <div className='nav-sidebar-container'>
            {dropdown &&
                <div>
                    <button onClick={toggleNav} className='arrow-right-button' type='button' >
                        <UilAngleRight className={`arrow-right-icon ${openNav}`} side='40' style={{ color: `${navArrowColor}` }} />
                    </button>
                </div>}

            {!dropdown && <div className='filler'></div>}

            {type === 'Home' && <div><UilHome side='30' className='icon' /></div>}
            {type === 'Notebooks' && <div><UilBook side='30' className='icon' /></div>}
            {type === 'Notes' && <div><UilFilePlusAlt side='30' className='icon' /></div>}
            {type === 'Tags' && <div><UilTagAlt side='30' className='icon' /></div>}
            {type === 'Shared' && <div><UilUsersAlt side='30' className='icon' /></div>}

            <h4>{type}</h4>
        </div>
    );
}

export default NavigationContainer;
