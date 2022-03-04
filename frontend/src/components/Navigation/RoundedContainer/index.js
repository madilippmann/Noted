import './RoundedContainer.css';
import { UilPlus, UilSearchAlt } from '@iconscout/react-unicons'
import { useState, useEffect } from 'react';

const RoundedContainer = ({ type }) => {
    const [searchInput, setSearchInput] = useState('');

    useEffect(() => {
        console.log(searchInput);
    }, [searchInput])

    return (
        <div className='rounded-outer-container'>
            {type === 'search' &&
                <div className='rounded-container search-container'>
                    <div className='icon-container search'>
                        <UilSearchAlt size='25' />
                    </div>
                    <input
                        className='search-input'
                        type='text'
                        value={searchInput}
                        placeholder='Search'
                        onChange={(e) => setSearchInput(e.target.value)}
                    />
                </div>}



            {type === 'new-note' &&
                <div className='rounded-container new-note-container'>
                    <div className='icon-container new-note'>
                        <UilPlus size='25' />
                    </div>
                    <h4>New Note</h4>
                </div>}
        </div>
    );
}

export default RoundedContainer;
