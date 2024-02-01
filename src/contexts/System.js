import { useContext } from "react";
import { createContext } from 'react';
import { useEffect } from 'react';

const SystemContext = createContext();

export default function System({ children, value }) {
    useEffect(() => {
        let token = localStorage.getItem('token');
        if (token && value.setToken) value.setToken(token);
    }, []);
    return <SystemContext.Provider value={value}>{children}</SystemContext.Provider>;
}

export function useSystem() {
    return useContext(SystemContext);
};