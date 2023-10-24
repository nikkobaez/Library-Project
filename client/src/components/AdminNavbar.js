import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { FaBookOpen } from 'react-icons/fa'

const AdminNavbar = () => {
    // Variables
    const { currentFirstname, currentLastname, setCurrentAuthenticatedId, setCurrentFirstname, setCurrentLastname } = useContext(AuthContext);
    const navigate = useNavigate();

    // Admin Logout Function
    const adminLogout = () => {
        setCurrentAuthenticatedId("");
        setCurrentFirstname("");
        setCurrentLastname("");
        localStorage.clear()
        navigate("/admin-login")
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
                        <li className='text-white hover:cursor-pointer'> Users </li>
                        <li className='text-white hover:cursor-pointer'> Available </li>
                        <li className='text-white hover:cursor-pointer'> Rented </li>
                        <li className='text-white hover:cursor-pointer'> Processing </li>
                        <li className='text-white hover:cursor-pointer'> Reports </li>
                    </ul>
                    <button onClick={adminLogout} className='bg-[#00BBFF] text-white px-4 py-2 rounded-md'> Logout </button>
                </div>
            </div>

            {/* Bottom Navigation Bar */}
            <div className='flex items-center justify-between mx-6 my-10'>
                <p className="text-xl"> Hello {currentFirstname + " " + currentLastname}</p>
            </div>
        </div>
    )
}

export default AdminNavbar