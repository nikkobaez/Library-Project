import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import axios from 'axios';

const AdminLogin = () => {
    // Variables
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loginStatus, setLoginStatus] = useState("");
    const { setCurrentAuthenticatedId, setCurrentFirstname, setCurrentLastname } = useContext(AuthContext);
    const navigate = useNavigate();

    // Admin Login Function
    const adminLogin = async () => {
        axios.post('http://localhost:3001/adminlogin', {
            username: username, 
            password: password,
        }).then((response) => {
            if (response.data.message) {
                setLoginStatus(response.data.message);
            } else {
                setCurrentAuthenticatedId(response.data[0].adminid);
                setCurrentFirstname(response.data[0].firstname);
                setCurrentLastname(response.data[0].lastname);
                navigate("/admin-dashboard-users");
            }
        }).catch((error) => {
            console.error(error);
        });
    };

    return (
        <div className="flex flex-col items-center justify-center w-screen h-screen bg-[#5494D4]">
            <div className="flex flex-col w-1/2 p-10 bg-white rounded-xl">
                <h1 className="my-2 text-2xl font-semibold"> Welcome Back Admin! </h1>
                <input type="text" className="h-10 px-2 my-2 bg-gray-200 rounded-md" placeholder="Email Address" onChange={(e) => {setUsername(e.target.value)}}/>
                <input type="text" className="h-10 px-2 my-2 bg-gray-200 rounded-md" placeholder="Password" onChange={(e) => {setPassword(e.target.value)}}/>
                <button onClick={adminLogin} className="h-10 px-2 my-2 text-white bg-blue-500 rounded-md "> Login </button>
                <div className="flex flex-col items-center justify-center">
                    <p className="mt-2"> Don't have an account yet? <span className="text-blue-500 hover:cursor-pointer" onClick={() => navigate("/admin-signup")}> Sign Up </span></p>
                    <p className="mt-2"> {loginStatus} </p>
                </div>
            </div>
        </div>
    );
}

export default AdminLogin