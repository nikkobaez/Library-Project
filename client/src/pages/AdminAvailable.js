import React, { useState, useEffect } from 'react';
import { Link } from 'react-scroll'
import { FaSearch, FaPlus } from 'react-icons/fa'
import { FaXmark } from 'react-icons/fa6'
import uuid from 'react-uuid';
import axios from 'axios';
import AdminNavbar from '../components/AdminNavbar'

const AdminAvailable = () => {
    // Modal Variables
    const [showSearchModal, setShowSearchModal] = useState(false);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [itemid, setItemid] = useState("");
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [cover, setCover] = useState("");
    const [type, setType] = useState("Book");

    // Filter and Content Variables
    const [filter, setFilter] = useState("All Available"); 
    const [available, setAvailable] = useState([]);
    const books = available.filter(item => item.type === "Book");
    const media = available.filter(item => item.type === "Media");
    const devices = available.filter(item => item.type === "Device");

    // Add An Item To Available
    const addItem = async () => {
        axios.post("https://library-server-cosc3380-ee2497c0e61e.herokuapp.com/addtoavailable", {
            itemid: uuid(),
            title: title,
            author: author,
            cover: cover,
            type: type,
        }).then((response) => {
            console.log(response);
        }).catch((error) => {
            console.log(error);
        })
        window.location.reload();
    };

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

    // Update An Item In Available
    const updateItem = async () => {
        axios.put("https://library-server-cosc3380-ee2497c0e61e.herokuapp.com/available/" + itemid, {
            itemid: itemid,
            title: title,
            author: author,
            cover: cover,
            type: type,
        }).then((response) => {
            console.log(response);
            window.location.reload();
        }).catch((error) => {
            console.log(error)
        });
    };

    // Delete An Item From Available
    const deleteItem = async (itemid) => {
        axios.delete("https://library-server-cosc3380-ee2497c0e61e.herokuapp.com/available/" + itemid)
        .then((response) => {
            console.log(response);
            window.location.reload();
        }).catch((error) => {
            console.log(error);
        })
    };

    return (
        <div>
            <AdminNavbar />
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
                        <FaPlus size={25} color='black' onClick={() => setShowAddModal(true)} className="hover:cursor-pointer"/>
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
                <div className="flex flex-col gap-10 my-10">
                    {/* Show All Available */}
                    {filter === "All Available" && (
                        <>
                            {available.map((item) => (
                                <div name={item.itemid} key={item.itemid} className='flex items-center justify-between gap-10'>
                                    <p className="bg-[#E1EAFF] h-12 w-12 rounded-full flex justify-center items-center"> {item.type[0]}</p>
                                    <p className="flex w-1/5"> {item.title}</p>
                                    <p className="flex w-1/5"> {item.author} </p>
                                    <p className="flex w-1/5"> {item.itemid.substring(0, 19) + "..."} </p>
                                    <div className="flex justify-between w-1/5 gap-2">
                                        <button onClick={() => {
                                            setShowUpdateModal(true)
                                            setItemid(item.itemid)
                                        }} className='bg-[#29E3B6] text-white px-4 py-2 rounded-md w-1/2'> Update </button>
                                        <button onClick={() => {
                                            deleteItem(item.itemid)
                                        }} className='bg-[#E16C68] text-white px-4 py-2 rounded-md w-1/2'> Delete </button>
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
                                    <p className="flex w-1/5"> {item.itemid.substring(0, 19) + "..."} </p>
                                    <div className="flex justify-between w-1/5 gap-2">
                                        <button onClick={() => {
                                            setShowUpdateModal(true)
                                            setItemid(item.itemid)
                                        }} className='bg-[#29E3B6] text-white px-4 py-2 rounded-md w-1/2'> Update </button>
                                        <button onClick={() => {
                                            deleteItem(item.itemid)
                                        }} className='bg-[#E16C68] text-white px-4 py-2 rounded-md w-1/2'> Delete </button>
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
                                    <p className="flex w-1/5"> {item.itemid.substring(0, 19) + "..."} </p>
                                    <div className="flex justify-between w-1/5 gap-2">
                                        <button onClick={() => {
                                            setShowUpdateModal(true)
                                            setItemid(item.itemid)
                                        }} className='bg-[#29E3B6] text-white px-4 py-2 rounded-md w-1/2'> Update </button>
                                        <button onClick={() => {
                                            deleteItem(item.itemid)
                                        }} className='bg-[#E16C68] text-white px-4 py-2 rounded-md w-1/2'> Delete </button>
                                    </div>
                                </div>
                            ))}
                        </>
                    )}

                    {/* Show All Devices */}
                    {filter === "Devices" && (
                        <>
                            {devices.map((item) => (
                                <div name={item.itemid} key={item.itemid} className='flex items-center justify-between gap-10'>
                                    <p className="bg-[#E1EAFF] h-12 w-12 rounded-full flex justify-center items-center"> {item.type[0]}</p>
                                    <p className="flex w-1/5"> {item.title}</p>
                                    <p className="flex w-1/5"> {item.author} </p>
                                    <p className="flex w-1/5"> {item.itemid.substring(0, 19) + "..."} </p>
                                    <div className="flex justify-between w-1/5 gap-2">
                                        <button onClick={() => {
                                            setShowUpdateModal(true)
                                            setItemid(item.itemid)
                                        }} className='bg-[#29E3B6] text-white px-4 py-2 rounded-md w-1/2'> Update </button>
                                        <button onClick={() => {
                                            deleteItem(item.itemid)
                                        }} className='bg-[#E16C68] text-white px-4 py-2 rounded-md w-1/2'> Delete </button>
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
                        <input type="text" className="w-3/4 h-10 px-2 my-2 bg-gray-200 rounded-md" placeholder="Item ID" onChange={(e) => setItemid(e.target.value)}/>
                        <button className="w-3/4 h-10 px-2 my-2 text-white bg-blue-500 rounded-md "> 
                            <Link to={itemid} smooth duration={500} onClick={() => setShowSearchModal(false)}>
                                Search 
                            </Link>
                        </button>
                    </div>
                </div>
            )}

            {/* Add Modal */}
            {showAddModal && (
                <div className="absolute top-0 left-0 flex items-center justify-center w-screen h-screen bg-black bg-opacity-40">
                    <div className="flex flex-col items-center justify-center w-1/3 pb-10 bg-white bg-opacity-100 rounded-lg">
                        <div className="flex justify-end w-full p-4">
                            <FaXmark size={25} color="black" onClick={() => setShowAddModal(false)} className="hover:cursor-pointer"/>
                        </div>
                        <input type="text" className="w-3/4 h-10 px-2 my-2 bg-gray-200 rounded-md" placeholder="Title" onChange={(e) => setTitle(e.target.value)}/>
                        <input type="text" className="w-3/4 h-10 px-2 my-2 bg-gray-200 rounded-md" placeholder="Author" onChange={(e) => setAuthor(e.target.value)}/>
                        <input type="text" className="w-3/4 h-10 px-2 my-2 bg-gray-200 rounded-md" placeholder="Cover" onChange={(e) => setCover(e.target.value)}/>
                        <div className="flex justify-between w-3/4 gap-2 my-2">
                            <button onClick={() => setType("Book")} className={`${type === "Book" ? "bg-[#00BBFF]" : "bg-[#7C829D]"} text-white px-4 py-2 rounded-md w-1/3`}> Book </button>
                            <button onClick={() => setType("Media")} className={`${type === "Media" ? "bg-[#00BBFF]" : "bg-[#7C829D]"} text-white px-4 py-2 rounded-md w-1/3`}> Media </button>
                            <button onClick={() => setType("Device")} className={`${type === "Device" ? "bg-[#00BBFF]" : "bg-[#7C829D]"} text-white px-4 py-2 rounded-md w-1/3`}> Device </button>
                        </div>
                        <button onClick={addItem} className="w-3/4 h-10 px-2 my-2 text-white bg-blue-500 rounded-md "> Add </button>
                    </div>
                </div>
            )}

            {/* Update Modal */}
            {showUpdateModal && (
                <div className="absolute top-0 left-0 flex items-center justify-center w-screen h-screen bg-black bg-opacity-40">
                    <div className="flex flex-col items-center justify-center w-1/3 pb-10 bg-white bg-opacity-100 rounded-lg">
                        <div className="flex justify-end w-full p-4">
                            <FaXmark size={25} color="black" onClick={() => setShowUpdateModal(false)} className="hover:cursor-pointer"/>
                        </div>
                        <input type="text" className="w-3/4 h-10 px-2 my-2 bg-gray-200 rounded-md" placeholder="User ID" value={itemid} readOnly={true}/>
                        <input type="text" className="w-3/4 h-10 px-2 my-2 bg-gray-200 rounded-md" placeholder="Title" onChange={(e) => setTitle(e.target.value)}/>
                        <input type="text" className="w-3/4 h-10 px-2 my-2 bg-gray-200 rounded-md" placeholder="Author" onChange={(e) => setAuthor(e.target.value)}/>
                        <input type="text" className="w-3/4 h-10 px-2 my-2 bg-gray-200 rounded-md" placeholder="Cover" onChange={(e) => setCover(e.target.value)}/>
                        <div className="flex justify-between w-3/4 gap-2 my-2">
                            <button onClick={() => setType("Book")} className={`${type === "Book" ? "bg-[#00BBFF]" : "bg-[#7C829D]"} text-white px-4 py-2 rounded-md w-1/3`}> Book </button>
                            <button onClick={() => setType("Media")} className={`${type === "Media" ? "bg-[#00BBFF]" : "bg-[#7C829D]"} text-white px-4 py-2 rounded-md w-1/3`}> Media </button>
                            <button onClick={() => setType("Device")} className={`${type === "Device" ? "bg-[#00BBFF]" : "bg-[#7C829D]"} text-white px-4 py-2 rounded-md w-1/3`}> Device </button>
                        </div>
                        <button onClick={updateItem} className="w-3/4 h-10 px-2 my-2 text-white bg-blue-500 rounded-md "> Update </button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default AdminAvailable