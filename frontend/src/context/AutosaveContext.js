import { createContext, useState, useContext } from 'react';

export const AutosaveContext = createContext();

export const useAutosaveContext = () => useContext(AutosaveContext);

export default function AutosaveProvider(props) {
    const [autosave, setAutosave] = useState(localStorage.getItem('autosave-notes') || false);

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
