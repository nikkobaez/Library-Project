import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import uuid from 'react-uuid';
import axios from 'axios';

const AdminSignup = () => {
    const [firstname, setFirstName] = useState("");
    const [lastname, setLastName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [signupStatus, setSignupStatus] = useState("");
    const [secretkey, setSecretKey] = useState("");
    const navigate = useNavigate();

    const adminsignup = async () => {
          if (secretkey === "umarocks") {
            axios.post('http://localhost:3001/adminsignup', {
              adminid: uuid(),
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
        } else {
          setSignupStatus("Wrong secret key")
        }
    };

    return (
        <div className="flex flex-col items-center justify-center w-screen h-screen">
            <div className="flex flex-col w-1/3">
                <h1 className="my-2 text-2xl font-semibold"> Create An Account Admin! </h1>
                <div className="flex flex-row gap-2">
                    <input type="text" className="w-1/2 h-10 px-2 my-2 bg-gray-200 rounded-md " placeholder="First Name" onChange={(e) => {setFirstName(e.target.value)}}/>
                    <input type="text" className="w-1/2 h-10 px-2 my-2 bg-gray-200 rounded-md " placeholder="Last Name" onChange={(e) => {setLastName(e.target.value)}}/>
                </div>
                <input type="text" className="h-10 px-2 my-2 bg-gray-200 rounded-md " placeholder="Email Address" onChange={(e) => {setUsername(e.target.value)}}/>
                <input type="text" className="h-10 px-2 my-2 bg-gray-200 rounded-md " placeholder="Password" onChange={(e) => {setPassword(e.target.value)}}/>
                <input type="text" className="h-10 px-2 my-2 bg-gray-200 rounded-md " placeholder="Secret Key" onChange={(e) => {setSecretKey(e.target.value)}}/>
                <button onClick={adminsignup} className="h-10 px-2 my-2 text-white bg-blue-500 rounded-md "> Sign Up </button>
                <div className="flex flex-col items-center justify-center">
                    <p> Already have an account? <span className="text-blue-500 hover:cursor-pointer" onClick={() => navigate("/admin-login")}> Login </span></p>
                    <p> {signupStatus} </p>
                </div>
            </div>
        </div>
    );
}

export default AdminSignup;