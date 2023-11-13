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

const getFees = () => {
    const fees = localStorage.getItem("fees");
    return fees ? JSON.parse(fees) : "";
}

const getPrice = () => {
    const price = localStorage.getItem("price");
    return price ? JSON.parse(price) : "";
}

// Context Function
export const AuthProvider = ({children}) => {
    const [currentAuthenticatedId, setCurrentAuthenticatedId] = useState(getAuthenticatedId);
    const [currentFirstname, setCurrentFirstname] = useState(getFirstName);
    const [currentLastname, setCurrentLastname] = useState(getLastName);
    const [currentCart, setCurrentCart] = useState(getCart);
    const [currentStatus, setCurrentStatus] = useState(getStatus);
    const [currentFees, setCurrentFees] = useState(getFees);
    const [currentPrice, setCurrentPrice] = useState(getPrice);


    useEffect(() => {
        localStorage.setItem("authenticatedId", JSON.stringify(currentAuthenticatedId));
        localStorage.setItem("firstname", JSON.stringify(currentFirstname));
        localStorage.setItem("lastname", JSON.stringify(currentLastname));
        localStorage.setItem("cart", JSON.stringify(currentCart));
        localStorage.setItem("status", JSON.stringify(currentStatus));
        localStorage.setItem("fees", JSON.stringify(currentFees));
        localStorage.setItem("price", JSON.stringify(currentPrice));
    }, [currentAuthenticatedId, currentFirstname, currentLastname, currentCart, currentStatus, currentFees, currentPrice]);

    return (
        <AuthContext.Provider value={{currentAuthenticatedId, setCurrentAuthenticatedId, currentFirstname, setCurrentFirstname, currentLastname, setCurrentLastname, currentCart, setCurrentCart, currentStatus, setCurrentStatus, currentFees, setCurrentFees, currentPrice, setCurrentPrice }}>
            {children}
        </AuthContext.Provider>
    )
}