import React, { useEffect, useContext } from 'react'
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import axios from 'axios';

const Success = () => {
    const { currentCart, setCurrentCart, currentPrice, setCurrentPrice, currentFees, setCurrentFees } = useContext(AuthContext);
    const navigate = useNavigate();

    // Delete A Fee From Balance
    useEffect(() => {
        axios.delete("https://library-server-cosc3380-ee2497c0e61e.herokuapp.com/balance/" + currentCart)
        .then((response) => {
            setCurrentFees(currentFees - currentPrice);
            setCurrentCart("");
            setCurrentPrice("");

        }).catch((error) => {
            console.log(error)
        })
    }, [currentCart, setCurrentCart, currentPrice, setCurrentPrice, currentFees, setCurrentFees])

    return (
        <div className="flex items-center justify-center w-screen h-screen">
            <div className="flex items-center justify-center">
                <h3 className="mr-4 text-3xl">
                    Purchase Succesful! 
                </h3>
                <button onClick={() => navigate("/user-dashboard-account")} className="px-8 py-3 text-white rounded-lg bg-[#00BBFF]">
                    Go Home
                </button>  
            </div>
        </div>
    )
}

export default Success