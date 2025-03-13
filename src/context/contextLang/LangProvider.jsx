import Lang from "./Lang.json";
import React from 'react'
import { LangContext } from "./LangContext.jsx";

export const LangProvider = ({ children }) => {
    return (
        <LangContext.Provider value={Lang}>
            {children}
        </LangContext.Provider>
    );
};