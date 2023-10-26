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

const getCart = () => {
    const cart = localStorage.getItem("cart");
    return cart ? JSON.parse(cart) : "";
}

const getStatus = () => {
    const status = localStorage.getItem("status");
    return status ? JSON.parse(status) : "";
}

// Context Function
export const AuthProvider = ({children}) => {
    const [currentAuthenticatedId, setCurrentAuthenticatedId] = useState(getAuthenticatedId);
    const [currentFirstname, setCurrentFirstname] = useState(getFirstName);
    const [currentLastname, setCurrentLastname] = useState(getLastName);
    const [currentCart, setCurrentCart] = useState(getCart);
    const [currentStatus, setCurrentStatus] = useState(getStatus);


    useEffect(() => {
        localStorage.setItem("authenticatedId", JSON.stringify(currentAuthenticatedId));
        localStorage.setItem("firstname", JSON.stringify(currentFirstname));
        localStorage.setItem("lastname", JSON.stringify(currentLastname));
        localStorage.setItem("lastname", JSON.stringify(currentLastname));
        localStorage.setItem("cart", JSON.stringify(currentCart));
        localStorage.setItem("status", JSON.stringify(currentStatus));
    }, [currentAuthenticatedId, currentFirstname, currentLastname, currentCart, currentStatus]);

    return (
        <AuthContext.Provider value={{currentAuthenticatedId, setCurrentAuthenticatedId, currentFirstname, setCurrentFirstname, currentLastname, setCurrentLastname, currentCart, setCurrentCart, currentStatus, setCurrentStatus }}>
            {children}
        </AuthContext.Provider>
    )
}