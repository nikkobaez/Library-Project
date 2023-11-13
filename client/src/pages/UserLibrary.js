import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { Link } from 'react-scroll'
import { FaSearch } from 'react-icons/fa'
import { FaXmark } from 'react-icons/fa6'
import UserNavbar from '../components/UserNavbar';
import uuid from 'react-uuid';
import axios from 'axios';

const UserLibrary = () => {
    // Variables
    const [showSearchModal, setShowSearchModal] = useState(false);
    const [itemtitle, setItemtitle] = useState("");
    const [filter, setFilter] = useState("All Available"); 
    const [available, setAvailable] = useState([]);
    const books = available.filter(item => item.type === "Book");
    const media = available.filter(item => item.type === "Media");
    const devices = available.filter(item => item.type === "Device");
    const duedatems = new Date().getTime() + 86400000 * 7;
    const { currentAuthenticatedId, currentFirstname, currentLastname, currentFees} = useContext(AuthContext);
    const navigate = useNavigate();

    // Get All Items From Available
    useEffect(() => {
        const getAllItems = async () => {
            axios.get("https://library-server-cosc3380-ee2497c0e61e.herokuapp.com/available")
            .then((response) => {
                console.log(response.data);
                setAvailable(response.data);
            }).catch((error) => {
                console.log(error);
            })
        }
        getAllItems();
    }, []);

    // Rent An Item
    const rentItem = async (item) => {
        axios.post("https://library-server-cosc3380-ee2497c0e61e.herokuapp.com/addtorented", {
            rentedid: uuid(),
            duedatems: duedatems,
            borrowerid: currentAuthenticatedId,
            name: currentFirstname + " " + currentLastname,
            itemid: item.itemid,
            title: item.title,
            author: item.author,
            cover: item.cover,
            type: item.type,
        }).then((response) => {
            axios.delete("https://library-server-cosc3380-ee2497c0e61e.herokuapp.com/available/" + item.itemid)
            .then((response) => {
                console.log(response);
            }).catch((error) => {
                console.log(error);
            });
            navigate("/user-dashboard-account")
        }).catch((error) => {
            console.log(error);
        })
    }

    return (
        <div>
            <UserNavbar />
            <div className="flex flex-col mx-6">
                {/* Buttons */}
                <div className="flex items-center justify-between">
                    <div className="flex gap-4">
                        <button onClick={() => setFilter("All Available")} className={`${filter === "All Available" ? "bg-[#00BBFF]" : "bg-[#7C829D]"} text-white px-4 py-2 rounded-md`}> All Available </button>
                        <button onClick={() => setFilter("Books")} className={`${filter === "Books" ? "bg-[#00BBFF]" : "bg-[#7C829D]"} text-white px-4 py-2 rounded-md`}> Books </button>
                        <button onClick={() => setFilter("Media")} className={`${filter === "Media" ? "bg-[#00BBFF]" : "bg-[#7C829D]"} text-white px-4 py-2 rounded-md`}> Media </button>
                        <button onClick={() => setFilter("Devices")} className={`${filter === "Devices" ? "bg-[#00BBFF]" : "bg-[#7C829D]"} text-white px-4 py-2 rounded-md`}> Devices </button>
                    </div>
                    <div className="flex gap-6">
                        <FaSearch size={25} color='black' onClick={() => setShowSearchModal(true)} className="hover:cursor-pointer"/>
                    </div>
                </div>


                {/* Empty Content */}
                {filter === "All Available" && available.length === 0 && (
                    <div className="flex items-center justify-center w-full my-10">
                        <p> No Items </p>
                    </div>
                )}

                {filter === "Books" && books.length === 0 && (
                    <div className="flex items-center justify-center w-full my-10">
                        <p> No Books </p>
                    </div>
                )}

                {filter === "Media" && media.length === 0 && (
                    <div className="flex items-center justify-center w-full my-10">
                        <p> No Media </p>
                    </div>
                )}

                {filter === "Devices" && devices.length === 0 && (
                    <div className="flex items-center justify-center w-full my-10">
                        <p> No Devices </p>
                    </div>
                )}

                {/* Content */}
                <div className="grid w-full h-full grid-cols-5 gap-20 my-10"> 
                    {/* Show All Available */}
                    {filter === "All Available" && (
                        <>
                            {available.map((item) => (
                                <div name={item.title} key={item.itemid} className="flex flex-col items-center justify-center gap-4 max-w-[275px] min-w-[250px]">
                                    <div className="w-full h-96">
                                        <img src={item.cover} alt="cover" className="object-fill w-full h-full rounded-lg hover:cursor-pointer"/>
                                    </div>
                                    <p> {item.title} </p>
                                    <p> { "By: " + item.author}</p>
                                    <button onClick={() => rentItem(item)} className='bg-[#29E3B6] text-white px-4 py-2 rounded-md w-full'> Rent </button>
                                </div>
                            ))}
                        </>
                    )}

                    {/* Show All Books */}
                    {filter === "Books" && (
                        <>
                            {books.map((item) => (
                                <div name={item.title} key={item.itemid} className="flex flex-col items-center justify-center gap-4 max-w-[275px] min-w-[250px]">
                                    <div className="w-full h-96">
                                        <img src={item.cover} alt="cover" className="object-fill w-full h-full rounded-lg hover:cursor-pointer"/>
                                    </div>
                                    <p> {item.title} </p>
                                    <p> { "By: " + item.author}</p>
                                    <button onClick={() => rentItem(item)} className='bg-[#29E3B6] text-white px-4 py-2 rounded-md w-full'> Rent </button>
                                </div>
                            ))}
                        </>
                    )}

                    {/* Show All Media */}
                    {filter === "Media" && (
                        <>
                            {media.map((item) => (
                                <div name={item.title} key={item.itemid} className="flex flex-col items-center justify-center gap-4 max-w-[275px] min-w-[250px]">
                                    <div className="w-full h-96">
                                        <img src={item.cover} alt="cover" className="object-fill w-full h-full rounded-lg hover:cursor-pointer"/>
                                    </div>
                                    <p> {item.title} </p>
                                    <p> { "By: " + item.author}</p>
                                    <button onClick={() => rentItem(item)} className='bg-[#29E3B6] text-white px-4 py-2 rounded-md w-full'> Rent </button>
                                </div>
                            ))}
                        </>
                    )}
                    
                    {/* Show All Devices */}
                    {filter === "Devices" && (
                        <>
                            {devices.map((item) => (
                                <div name={item.title} key={item.itemid} className="flex flex-col items-center justify-center gap-4 max-w-[275px] min-w-[250px]">
                                    <div className="w-full h-96">
                                        <img src={item.cover} alt="cover" className="object-fill w-full h-full rounded-lg hover:cursor-pointer"/>
                                    </div>
                                    <p> {item.title} </p>
                                    <p> { "By: " + item.author}</p>
                                    <button disabled={currentFees > 100} onClick={() => rentItem(item)} className='bg-[#29E3B6] text-white px-4 py-2 rounded-md w-full'> Rent </button>
                                </div>
                            ))}
                        </>
                    )}
                </div>
            </div>

            {/* Search Modal */}
            {showSearchModal && (
                <div className="absolute top-0 left-0 flex items-center justify-center w-screen h-screen bg-black bg-opacity-40">
                    <div className="flex flex-col items-center justify-center w-1/3 pb-10 bg-white bg-opacity-100 rounded-lg">
                        <div className="flex justify-end w-full p-4">
                            <FaXmark size={25} color="black" onClick={() => setShowSearchModal(false)} className="hover:cursor-pointer"/>
                        </div>
                        <input type="text" className="w-3/4 h-10 px-2 my-2 bg-gray-200 rounded-md" placeholder="Title" onChange={(e) => setItemtitle(e.target.value)}/>
                        <button className="w-3/4 h-10 px-2 my-2 text-white bg-blue-500 rounded-md "> 
                            <Link to={itemtitle} smooth duration={500} onClick={() => setShowSearchModal(false)}>
                                Search 
                            </Link>
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default UserLibrary