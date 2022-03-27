import { createContext, useState, useContext, useEffect } from 'react';

export const AutosaveContext = createContext();

export const useAutosaveContext = () => useContext(AutosaveContext);

export default function AutosaveProvider(props) {
    const [autosave, setAutosave] = useState(localStorage.getItem('autosave-notes') === 'true' ? true : false);
    if (!localStorage.getItem('autosave-notes')) localStorage.setItem('autosave-notes', false)

    return (
        <AutosaveContext.Provider
            value={{
                autosave,
                setAutosave
            }}
        >
            {props.children}
        </AutosaveContext.Provider>
    )
}
