import { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [contextUsername, contextSetUsername] = useState("");
    const [contextUserid, contextSetUserid] = useState("");

    return (
        <AuthContext.Provider value={{contextUserid, contextSetUserid, contextUsername, contextSetUsername}}>
            {children}
        </AuthContext.Provider>
    )
}