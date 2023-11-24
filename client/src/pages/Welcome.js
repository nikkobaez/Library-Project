import { useState } from 'react'
import { useNavigate } from "react-router-dom";
import { FaXmark } from 'react-icons/fa6'
import WelcomeNavbar from '../components/WelcomeNavbar'
import WelcomeImage from "../assets/welcomeImage.png"

const Welcome = () => {
    const [showLoginModal, setShowLoginModal] = useState(false);
    const navigate = useNavigate();

    return (
        <div>
            <WelcomeNavbar showLoginModal={() => setShowLoginModal(true)}/>

            <div className="flex items-center justify-center w-screen h-screen">
                <div className="flex flex-col w-1/2 mb-20 ml-6">
                    <p className="text-3xl font-semibold text-black"> Embark On A Journey Into The World of Books In Your Own Nook </p>
                    <p className="py-6 text-black"> At Book Nook, we extend a warm invitation, encouraging you to embark on an enchanting journey into the captivating world of books, all from the blissful comfort of your very own nook. Here, within the hallowed walls of our literary haven, you'll discover a boundless universe of stories, each one serving as a magical portal to adventure, knowledge, and the limitless realms of imagination. Immerse yourself in the spellbinding allure of our carefully curated collection of miniature books, where every literary gem is a gateway to worlds as expansive as your wildest dreams. As you peruse the shelves of our haven, you'll find yourself transported to far-off lands, traversing through the corridors of time, and delving into the depths of human emotion. </p> 
                </div>
                <div className="flex items-center justify-center w-1/2 mb-20">
                    <img src={WelcomeImage} alt="welcome"/>
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

export default Welcome