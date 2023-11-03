import { FaBookOpen } from 'react-icons/fa'
import { useNavigate } from "react-router-dom";

const WelcomeNavbar = ({showLoginModal}) => {
    const navigate = useNavigate();

    return (
        <div>
            <div className='w-screen h-20 bg-[#5494D4] flex justify-between items-center'>
                <div className='flex items-center justify-center gap-4 ml-6'>
                    <FaBookOpen size={30} color='white'/>
                    <p className='text-2xl text-white'> Book Nook </p> 
                </div>
                <div className='flex items-center justify-center gap-4 mr-6'>
                    <ul className='flex gap-6 mr-4'>
                        <li onClick={() => navigate("/")} className='text-white hover:cursor-pointer'> Home </li>
                        <li onClick={() => navigate("/about")} className='text-white hover:cursor-pointer'> About </li>
                        <li onClick={() => navigate("/contact")} className='text-white hover:cursor-pointer'> Contact </li>
                    </ul>
                    <button onClick={showLoginModal} className='bg-[#00BBFF] text-white px-4 py-2 rounded-md'> Login </button>
                </div>
            </div>
        </div>
    )
}

export default WelcomeNavbar