import React, {useState} from 'react';
import { useNavigate } from "react-router-dom";
import { FaXmark } from 'react-icons/fa6';
import WelcomeNavbar from '../components/WelcomeNavbar'

const About = () => {
    const [showLoginModal, setShowLoginModal] = useState(false);
    const navigate = useNavigate();

    return (
        <div>
            <WelcomeNavbar showLoginModal={() => setShowLoginModal(true)}/>

            <div>
                <div>
                    <h1>About</h1>
                    <p>At Book Nook, our mission is to empower students, foster a love of reading, and promote lifelong learning. We are dedicated to providing equitable access to information and resources to all members of our community. </p>
                </div>
                <div>
                    <h2>Our Mission</h2>
                    <p>At Book Nook, our mission is to provide knowledge and services to our students and faculty. </p>
                </div>
                <div>
                    <h2>What We Offer at Book Nook</h2>
                </div>  

                <div>
                    <ul>
                        <li>
                            <h4>Vast Collection:</h4> 
                            <p>Our library houses a diverse collection of books, e-books, audiobooks, and academic readings. Our collection of books caters to a wide range of books to improve your </p>
                        </li>  
                        <li>
                            <h4> Wide range of technology: </h4>
                        <p>If you do not have a tablet laptop or want to rent a projector for a one time use? 
                      At Book Nook, our library has a vast amount of rentable devices, media and other technology devices to help. 
                    </p>
                  </li>
                </ul>
              </div>
        </div> 

            {/* Login Modal */}
            {showLoginModal && (
                <div className="absolute top-0 left-0 flex items-center justify-center w-screen h-screen bg-black bg-opacity-40">
                    <div className="flex flex-col items-center justify-center w-1/3 pb-10 bg-white bg-opacity-100 rounded-lg">
                        <div className="flex justify-end w-full p-4">
                            <FaXmark size={25} color="black" onClick={() => setShowLoginModal(false)} className="hover:cursor-pointer"/>
                        </div>
                        <button onClick={() => navigate("/user-login")} className="w-3/4 h-10 px-2 my-2 text-white bg-blue-500 rounded-md "> User Login </button>
                        <button onClick={() => navigate("/admin-login")} className="w-3/4 h-10 px-2 my-2 text-white bg-blue-500 rounded-md "> Admin Login </button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default About