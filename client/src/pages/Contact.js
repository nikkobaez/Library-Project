import React, {useState} from 'react';
import { useNavigate } from "react-router-dom";
import { FaXmark } from 'react-icons/fa6';
import uuid from 'react-uuid';
import axios from 'axios';
import WelcomeNavbar from '../components/WelcomeNavbar';

const Contact = () => {
    const [showLoginModal, setShowLoginModal] = useState(false);
    const navigate = useNavigate();

    const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [message, setMessage] = useState("");

	const addMessage = async () => {
        axios.post("https://library-server-cosc3380-ee2497c0e61e.herokuapp.com/addtocontact", {
            contactid: uuid(),
			name: name,
			email: email,
			message: message,
        }).then((response) => {
            console.log(response);
            window.location.reload();
        }).catch((error) => {
            console.log(error);
        })
    };


    return (
        <div>
            <WelcomeNavbar showLoginModal={() => setShowLoginModal(true)}/>

            <div className="flex flex-col items-center justify-center w-full">
                <div className="flex flex-col items-center justify-center w-1/2 gap-4 p-10 mt-20 bg-white border-4 border-gray-200 rounded-lg">
                   
                    <p className="text-2xl font-bold"> Have a Question or Concern? </p>

                    <div className="flex flex-col w-full">
                        <label> Name: </label>
                        <input type="text" className="w-full h-10 px-2 my-2 bg-gray-200 rounded-md" name="Name"  onChange = {(e) => setName(e.target.value)} />
                    </div>

                    <div className="flex flex-col w-full">
                        <label> Email: </label>
                        <input type="text" className="h-10 px-2 my-2 bg-gray-200 rounded-md" onChange = {(e) => setEmail(e.target.value)} />
                    </div>

                    <div className="flex flex-col w-full">
                        <label> What is you reason for contacting us? </label>
                        <textarea rows={4} cols={40} onChange={(e) => setMessage(e.target.value)} className="px-2 my-2 bg-gray-200 rounded-md"/>
                    </div>

                    <button onClick={(addMessage)} className="w-full h-10 px-2 my-2 text-white bg-blue-500 rounded-md ">Submit</button>
                </div>
            </div>

            {/* Login Modal */}
            {showLoginModal && (
                <div className="absolute top-0 left-0 flex items-center justify-center w-screen h-screen bg-black bg-opacity-40">
                    <div className="flex flex-col items-center justify-center w-1/3 pb-10 bg-white bg-opacity-100 rounded-lg">
                        <div className="flex justify-end w-full p-4">
                            <FaXmark size={25} color="black" onClick={() => setShowLoginModal(false)} className="hover:cursor-pointer"/>
                        </div>
                        <button onClick={() => navigate("/user-login")} className="w-3/4 h-10 px-2 my-2 text-white bg-blue-500 rounded-md"> User Login </button>
                        <button onClick={() => navigate("/admin-login")} className="w-3/4 h-10 px-2 my-2 text-white bg-blue-500 rounded-md"> Admin Login </button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Contact