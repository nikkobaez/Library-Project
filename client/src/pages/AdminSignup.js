import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import uuid from 'react-uuid';
import axios from 'axios';

const AdminSignup = () => {
    // Variables
    const [firstname, setFirstName] = useState("");
    const [lastname, setLastName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [signupStatus, setSignupStatus] = useState("");
    const [secretkey, setSecretKey] = useState("");
    const navigate = useNavigate();

    // Admin Sign Up Function
    const adminSignup = async () => {
        if (secretkey === "umarocks") {
            axios.post("https://library-server-cosc3380-ee2497c0e61e.herokuapp.com/admincheck", {
                username: username 
            }).then((response) => {
                if (response.data.message === "Admin already exists") {
                    setSignupStatus("Admin already exists")
                } else {
                    axios.post('https://library-server-cosc3380-ee2497c0e61e.herokuapp.com/adminsignup', {
                        adminid: uuid().substring(0, 6),
                        firstname: firstname,
                        lastname: lastname,
                        username: username, 
                        password: password,
                    }).then((response) => {
                        console.log(response);
                    }).catch((error) => {
                        console.error(error);
                    });
                    navigate("/admin-login")
                }
            }).catch((error) => {
                console.log(error);
            });
        } else {
            setSignupStatus("Wrong secret key")
        }
    };

    return (
        <div className="flex flex-col items-center justify-center w-screen h-screen bg-[#5494D4]">
            <div className="flex flex-col w-1/2 p-10 bg-white rounded-xl">
                <h1 className="my-2 text-2xl font-semibold"> Create An Account Admin! </h1>
                <input type="text" className="h-10 px-2 my-2 bg-gray-200 rounded-md " placeholder="First Name" onChange={(e) => {setFirstName(e.target.value)}}/>
                <input type="text" className="h-10 px-2 my-2 bg-gray-200 rounded-md " placeholder="Last Name" onChange={(e) => {setLastName(e.target.value)}}/>
                <input type="text" className="h-10 px-2 my-2 bg-gray-200 rounded-md " placeholder="Email Address" onChange={(e) => {setUsername(e.target.value)}}/>
                <input type="text" className="h-10 px-2 my-2 bg-gray-200 rounded-md " placeholder="Password" onChange={(e) => {setPassword(e.target.value)}}/>
                <input type="text" className="h-10 px-2 my-2 bg-gray-200 rounded-md " placeholder="Secret Key" onChange={(e) => {setSecretKey(e.target.value)}}/>
                <button onClick={adminSignup} className="h-10 px-2 my-2 text-white bg-blue-500 rounded-md "> Sign Up </button>
                <div className="flex flex-col items-center justify-center">
                    <p className="mt-2"> Already have an account? <span className="text-blue-500 hover:cursor-pointer" onClick={() => navigate("/admin-login")}> Login </span></p>
                    <p className="mt-2"> {signupStatus} </p>
                </div>
            </div>
        </div>
    );
}

export default AdminSignup;