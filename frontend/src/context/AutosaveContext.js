import { createContext, useState, useContext, useEffect } from 'react';

export const AutosaveContext = createContext();

export const useAutosaveContext = () => useContext(AutosaveContext);

export default function AutosaveProvider(props) {
    // localStorage.getItem('autosave-notes') ||
    const [autosave, setAutosave] = useState(localStorage.getItem('autosave-notes') || false);
    if (!localStorage.getItem('autosave-notes')) localStorage.setItem('autosave-notes', false)

    useEffect(() => {
        console.log('Autosave Update: ', autosave);
    }, [autosave])

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
