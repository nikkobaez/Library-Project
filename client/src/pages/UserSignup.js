import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import uuid from 'react-uuid';
import axios from 'axios';

const UserSignup = () => {
    // Variables
    const [firstname, setFirstName] = useState("");
    const [lastname, setLastName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [status, setStatus] = useState("Student");
    const navigate = useNavigate();

    // User Sign Up Function
    const userSignup = async () => {
        axios.post('http://localhost:3001/usersignup', {
            userid: uuid(),
            firstname: firstname,
            lastname: lastname,
            status: status,
            username: username, 
            password: password,
        }).then((response) => {
            console.log(response);
        }).catch((error) => {
            console.error(error);
        });
        navigate("/user-login")
    };

    return (
        <div className="flex flex-col items-center justify-center w-screen h-screen">
            <div className="flex flex-col w-1/3">
                <h1 className="my-2 text-2xl font-semibold"> Create An Account User! </h1>
                <input type="text" className="h-10 px-2 my-2 bg-gray-200 rounded-md " placeholder="First Name" onChange={(e) => {setFirstName(e.target.value)}}/>
                <input type="text" className="h-10 px-2 my-2 bg-gray-200 rounded-md " placeholder="Last Name" onChange={(e) => {setLastName(e.target.value)}}/>
                <input type="text" className="h-10 px-2 my-2 bg-gray-200 rounded-md" placeholder="Email Address" onChange={(e) => {setUsername(e.target.value)}}/>
                <input type="text" className="h-10 px-2 my-2 bg-gray-200 rounded-md" placeholder="Password" onChange={(e) => {setPassword(e.target.value)}}/>
                <div className="flex justify-between gap-2 my-2">
                    <button onClick={() => setStatus("Student")} className={`${status === "Student" ? "bg-[#00BBFF]" : "bg-[#7C829D]"} text-white px-4 py-2 rounded-md w-1/2`}> Student </button>
                    <button onClick={() => setStatus("Faculty")} className={`${status === "Faculty" ? "bg-[#00BBFF]" : "bg-[#7C829D]"} text-white px-4 py-2 rounded-md w-1/2`}> Faculty </button>
                </div>
                <button onClick={userSignup} className="h-10 px-2 my-2 text-white bg-blue-500 rounded-md "> Sign Up </button>
                <div className="flex flex-col items-center justify-center">
                    <p> Already have an account? <span className="text-blue-500 hover:cursor-pointer" onClick={() => navigate("/user-login")}> Login </span></p>
                </div>
            </div>
        </div>
    );
}

export default UserSignup;