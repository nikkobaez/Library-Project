import React, { useState, useEffect } from 'react';
import { Link } from 'react-scroll'
import { FaSearch } from 'react-icons/fa'
import { FaXmark } from 'react-icons/fa6'
import axios from 'axios';
import AdminNavbar from '../components/AdminNavbar';
import AdminProcessingButtons from '../components/AdminProcessingButtons';

const AdminProcessing = () => {
    // Variables
    const [showSearchModal, setShowSearchModal] = useState(false);
    const [processingid, setProcessingid] = useState("");
    const [filter, setFilter] = useState("All Processing"); 
    const [processing, setProcessing] = useState([]);
    const books = processing.filter(item => item.type === "Book");
    const media = processing.filter(item => item.type === "Media");
    const devices = processing.filter(item => item.type === "Device");

    // Get All Items From Processing
    useEffect(() => {
        const getAllItems = async () => {
            axios.get("https://library-server-cosc3380-ee2497c0e61e.herokuapp.com/processing")
            .then((response) => {
                console.log(response.data)
                setProcessing(response.data)
            }).catch((error) => {
                console.log(error);
            })
        }
        getAllItems();
    }, []);

    return (
        <div>
            <AdminNavbar />
            <div className="flex flex-col mx-6">
                    {/* Buttons */}
                    <div className="flex items-center justify-between">
                        <div className="flex gap-4">
                            <button onClick={() => setFilter("All Processing")} className={`${filter === "All Processing" ? "bg-[#00BBFF]" : "bg-[#7C829D]"} text-white px-4 py-2 rounded-md`}> All Processing </button>
                            <button onClick={() => setFilter("Books")} className={`${filter === "Books" ? "bg-[#00BBFF]" : "bg-[#7C829D]"} text-white px-4 py-2 rounded-md`}> Books </button>
                            <button onClick={() => setFilter("Media")} className={`${filter === "Media" ? "bg-[#00BBFF]" : "bg-[#7C829D]"} text-white px-4 py-2 rounded-md`}> Media </button>
                            <button onClick={() => setFilter("Devices")} className={`${filter === "Devices" ? "bg-[#00BBFF]" : "bg-[#7C829D]"} text-white px-4 py-2 rounded-md`}> Devices </button>
                        </div>
                        <div className="flex gap-6">
                            <FaSearch size={25} color='black' onClick={() => setShowSearchModal(true)} className="hover:cursor-pointer"/>
                        </div>
                    </div>

                {/* Empty Content */}
                {filter === "All Processing" && processing.length === 0 && (
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
                <div className="flex flex-col gap-10 my-10">
                    {/* Show All Processing */}
                    {filter === "All Processing" && (
                        <>
                            {processing.map((item) => (
                                <div name={item.itemid} key={item.itemid} className='flex items-center justify-between gap-10'>
                                    <p className="bg-[#E1EAFF] h-12 w-12 rounded-full flex justify-center items-center"> {item.type[0]}</p>
                                    <p className="flex w-1/5"> {item.title}</p>
                                    <p className="flex w-1/5"> {item.name} </p>
                                    <p className="flex w-1/5"> {item.processingid.substring(0, 19) + "..."} </p>
                                    <div className="flex justify-between w-1/5 gap-2">
                                        <AdminProcessingButtons item={item}/>
                                    </div>
                                </div>
                            ))}
                        </>
                    )}

                    {/* Show All Books */}
                    {filter === "Books" && (
                        <>
                            {books.map((item) => (
                                <div name={item.itemid} key={item.itemid} className='flex items-center justify-between gap-10'>
                                    <p className="bg-[#E1EAFF] h-12 w-12 rounded-full flex justify-center items-center"> {item.type[0]}</p>
                                    <p className="flex w-1/5"> {item.title}</p>
                                    <p className="flex w-1/5"> {item.author} </p>
                                    <p className="flex w-1/5"> {item.name} </p>
                                    <p className="flex w-1/5"> {item.processingid.substring(0, 19) + "..."} </p>
                                    <div className="flex justify-between w-1/5 gap-2">
                                        <AdminProcessingButtons item={item}/>
                                    </div>
                                </div>
                            ))}
                        </>
                    )}

                    {/* Show All Media */}
                    {filter === "Media" && (
                        <>
                            {media.map((item) => (
                                <div name={item.itemid} key={item.itemid} className='flex items-center justify-between gap-10'>
                                    <p className="bg-[#E1EAFF] h-12 w-12 rounded-full flex justify-center items-center"> {item.type[0]}</p>
                                    <p className="flex w-1/5"> {item.title}</p>
                                    <p className="flex w-1/5"> {item.author} </p>
                                    <p className="flex w-1/5"> {item.name} </p>
                                    <p className="flex w-1/5"> {item.processingid.substring(0, 19) + "..."} </p>
                                    <div className="flex justify-between w-1/5 gap-2">
                                        <AdminProcessingButtons item={item}/>
                                    </div>
                                </div>
                            ))}
                        </>
                    )}

                    {/* Show All Deviecs */}
                    {filter === "Devices" && (
                        <>
                            {devices.map((item) => (
                                <div name={item.itemid} key={item.itemid} className='flex items-center justify-between gap-10'>
                                    <p className="bg-[#E1EAFF] h-12 w-12 rounded-full flex justify-center items-center"> {item.type[0]}</p>
                                    <p className="flex w-1/5"> {item.title}</p>
                                    <p className="flex w-1/5"> {item.author} </p>
                                    <p className="flex w-1/5"> {item.name} </p>
                                    <p className="flex w-1/5"> {item.processingid.substring(0, 19) + "..."} </p>
                                    <div className="flex justify-between w-1/5 gap-2">
                                        <AdminProcessingButtons />
                                    </div>
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
                        <input type="text" className="w-3/4 h-10 px-2 my-2 bg-gray-200 rounded-md" placeholder="Item ID" onChange={(e) => setProcessingid(e.target.value)}/>
                        <button className="w-3/4 h-10 px-2 my-2 text-white bg-blue-500 rounded-md "> 
                            <Link to={processingid} smooth duration={500} onClick={() => setShowSearchModal(false)}>
                                Search 
                            </Link>
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default AdminProcessing