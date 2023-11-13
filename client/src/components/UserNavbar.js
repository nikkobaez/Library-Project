import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { FaBookOpen } from 'react-icons/fa'

const AdminNavbar = () => {
    const { currentFirstname, currentLastname, currentFees, setCurrentAuthenticatedId, setCurrentFirstname, setCurrentLastname, setCurrentCart, setCurrentStatus, setCurrentFees, setCurrentPrice } = useContext(AuthContext);
    const navigate = useNavigate();

    // Admin Logout Function
    const userLogout = () => {
        setCurrentAuthenticatedId("");
        setCurrentFirstname("");
        setCurrentLastname("");
        setCurrentCart("");
        setCurrentStatus("");
        setCurrentFees("");
        setCurrentPrice("");
        localStorage.clear();
        navigate("/user-login");
    }

    return (
        <div>
            {/* Top Navigation Bar */}
            <div className='w-screen h-20 bg-[#5494D4] flex justify-between items-center'>
                <div className='flex items-center justify-center gap-4 ml-6'>
                    <FaBookOpen size={30} color='white'/>
                    <p className='text-2xl text-white'> Book Nook </p> 
                </div>
                <div className='flex items-center justify-center gap-4 mr-6'>
                    <ul className='flex gap-6 mr-4'>
                        <li onClick={() => navigate("/user-dashboard-account")} className='text-white hover:cursor-pointer'> Account </li>
                        <li onClick={() => navigate("/user-dashboard-balance")} className='text-white hover:cursor-pointer'> Balance </li>
                        <li onClick={() => navigate("/user-dashboard-library")} className='text-white hover:cursor-pointer'> Library </li>
                    </ul>
                    <button onClick={userLogout} className='bg-[#00BBFF] text-white px-4 py-2 rounded-md'> Logout </button>
                </div>
            </div>

            {/* Bottom Navigation Bar */}
            <div className='flex items-center justify-between mx-6 my-10'>
                <p className="text-xl"> Hello {currentFirstname + " " + currentLastname}</p>
                <p className='bg-[#DFA01F] text-white px-4 py-2 rounded-md'> {`Outstanding Fees: $ ${currentFees}.00`}</p>
            </div>
        </div>
    )
}

export default AdminNavbar