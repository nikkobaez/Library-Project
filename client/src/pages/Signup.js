import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';

function App() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const signup = async () => {
        axios.post('http://localhost:3001/signup', {
            username: username, 
            password: password,
        }).then((response) => {
            console.log(response)
        });
        navigate("/")
    };
    
    return (
        <div className="flex flex-col items-center justify-center w-screen h-screen">
            <div className="flex flex-col w-1/3">
                <h1 className="my-2 text-2xl font-semibold"> Create An Account! </h1>
                <input type="text" className="h-10 px-2 my-2 bg-gray-200 rounded-md " placeholder="Email Address" onChange={(e) => {setUsername(e.target.value)}}/>
                <input type="text" className="h-10 px-2 my-2 bg-gray-200 rounded-md " placeholder="Password" onChange={(e) => {setPassword(e.target.value)}}/>
                <button onClick={signup} className="h-10 px-2 my-2 text-white bg-blue-500 rounded-md "> Sign Up </button>
                <div className="flex items-center justify-center">
                    <p> Already have an account? <span className="text-blue-500 hover:cursor-pointer" onClick={() => navigate("/")}> Login </span></p>
                </div>
            </div>
        </div> 
    );
}

export default App;