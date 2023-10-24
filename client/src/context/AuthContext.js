import { createContext, useState, useEffect } from 'react';

// Create Our Context
export const AuthContext = createContext();

// Local Storage Functions
const getAuthenticatedId = () => {
    const authenticatedId = localStorage.getItem("authenticatedId");
    return authenticatedId ? JSON.parse(authenticatedId) : "";
}

const getFirstName = () => {
    const firstname = localStorage.getItem("firstname");
    return firstname ? JSON.parse(firstname) : "";
}

const getLastName = () => {
    const lastname = localStorage.getItem("lastname");
    return lastname ? JSON.parse(lastname) : "";
}

// Context Function
export const AuthProvider = ({children}) => {
    const [currentAuthenticatedId, setCurrentAuthenticatedId] = useState(getAuthenticatedId);
    const [currentFirstname, setCurrentFirstname] = useState(getFirstName);
    const [currentLastname, setCurrentLastname] = useState(getLastName);

    useEffect(() => {
        localStorage.setItem("authenticatedId", JSON.stringify(currentAuthenticatedId));
        localStorage.setItem("firstname", JSON.stringify(currentFirstname));
        localStorage.setItem("lastname", JSON.stringify(currentLastname));
    }, [currentAuthenticatedId, currentFirstname, currentLastname]);

    return (
        <AuthContext.Provider value={{currentAuthenticatedId, setCurrentAuthenticatedId, currentFirstname, setCurrentFirstname, currentLastname, setCurrentLastname }}>
            {children}
        </AuthContext.Provider>
    )
}