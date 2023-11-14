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
            <div className="flex flex-col gap-6 mx-6 my-16">
                <div>
                    <h1 className='mb-6 text-4xl font-bold font-heading'>About</h1>
                    <p className= 'font-paragraph'>At Book Nook, our library proudly stands as the scholarly heartbeat of our esteemed institution, seamlessly weaving together the pursuit of knowledge and the spirit of exploration into the very fabric of academic life. Within the hallowed halls of this venerable sanctuary, students, faculty, and researchers converge, forming a vibrant community that is united by a shared commitment to intellectual enrichment and the relentless pursuit of understanding. More than just a repository of books, our library is a dynamic hub where the scholarly journey unfolds. It serves as a haven for those thirsty for wisdom, where minds are ignited, and the spark of curiosity is fanned into the flame of academic passion. As the custodians of an extensive and diverse collection, we take pride in curating an array of resources that cater to the varied interests and disciplines embraced by our academic community. In the rich tapestry of our library's offerings, you'll discover the allure of rare manuscripts, the vastness of digital archives, and the ever-growing repository of knowledge that spans the ages. Each shelf is a portal to a different realm of understanding, waiting to be explored by the intrepid minds that tread the path of intellectual curiosity.</p>
                </div>
                <div>
                    <h2 className='mb-6 text-2xl font-bold font font-subHeading'>Our Mission</h2>
                    <p className= 'font-paragraph'>At Book Nook, our mission is to provide knowledge and services to our students and faculty,  fostering a vibrant intellectual community where learning transcends the confines of the classroom. We aim not only to offer resources but to cultivate an environment that inspires curiosity, critical thinking, and a lifelong passion for exploration and discovery, ensuring that our library becomes the heart of academic pursuits on our campus.</p>
                </div>
                
                <div className='mt-10 text-3xl font-bold font-subHeading'>
                    <h2 className='mb-6'>What We Offer at Book Nook</h2>
                </div>  

                <div>
                    <ul className= 'inline-block '>
                        <li className='mb-5'>
                            <h4 className='mb-5 text-lg font-bold font-subHeading'>Vast Collection</h4>
                            <p className='inline-block mb-4 font-paragraph'>  Our library, a treasure trove for the curious mind, boasts an extensive array of literature covering an expansive range of genres and academic disciplines, ensuring an enriching resource for every student's intellectual pursuits at the college. Whether it's delving into classics, exploring the latest bestsellers, or diving into scholarly journals, our collection caters to the varied interests and academic needs of our vibrant campus community. </p>
                        </li>  
                        <li className= 'inline-block'>
                            <h4 className='mb-5 text-lg font-bold font-subHeading'> Wide range of technology </h4>
                            <p className='mt-5 mb-5 text-base font-paragraph'>Book Nook, our college library, offers an extensive array of devices and media for student use. Whether you need a laptop, tablet, or even a projector for a one-time event, we've got you covered. Our collection ensures students have access to a wide range of technology, supporting their academic endeavors and project needs. </p> 
                        </li>
                        <li className= 'inline-block'>
                            <h4 className='mb-5 text-lg font-bold font-subHeading'> Engaging multimedia resources </h4>
                            <p className='mt-5 mb-6 text-base font-paragraph'>In addition to our vast collection of printed literature, Book Nook takes pride in offering a rich selection of multimedia resources. From educational documentaries and interactive e-books to virtual reality experiences, our library provides a dynamic and immersive learning environment. Students can explore diverse topics through a variety of media, enhancing their understanding and engagement with the subjects that pique their curiosity. </p> 
                        </li>
                        <li className= 'inline-block'>
                            <h4 className='mb-5 text-lg font-bold font-subHeading'> Collaborative spaces for academic discourse </h4>
                            <p className='mt-5 mb-6 text-base font-paragraph'>Book Nook goes beyond being a repository of knowledge; it is a dynamic space designed to foster collaboration and intellectual exchange. With dedicated collaborative areas equipped with interactive whiteboards, comfortable seating, and multimedia capabilities, our library encourages students and faculty to come together for group discussions, project work, and the collective exploration of ideas. These collaborative spaces serve as incubators for innovation, where the synergy of diverse perspectives gives rise to new insights and academic endeavors. </p> 
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