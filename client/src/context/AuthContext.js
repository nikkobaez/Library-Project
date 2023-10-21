import { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [currentAuthenticatedId, setCurrentAuthenticatedId] = useState("");
    const [currentFirstname, setCurrentFirstname] = useState("");
    const [currentLastname, setCurrentLastname] = useState("");

    return (
        <AuthContext.Provider value={{currentAuthenticatedId, setCurrentAuthenticatedId, currentFirstname, setCurrentFirstname, currentLastname, setCurrentLastname}}>
            {children}
        </AuthContext.Provider>
    )
}