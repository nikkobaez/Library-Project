import React, { useState, useEffect } from 'react';
// import { AuthContext } from "../context/AuthContext";
import { Link } from 'react-scroll'
import { FaSearch, FaPlus } from 'react-icons/fa'
import { FaXmark } from 'react-icons/fa6'
import uuid from 'react-uuid';
import axios from 'axios';
import AdminNavbar from '../components/AdminNavbar';

const AdminUsers = () => {
    // Modal Variables
    const [showSearchModal, setShowSearchModal] = useState(false);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [userid, setUserid] = useState("");
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [status, setStatus] = useState("Student");
    const [datesignedup, setDatesignedup] = useState(0);
    const [fees, setFees] = useState(0);
    const newdatesignedup = new Date().getTime();
    const newfees = 0;
    const [addUserStatus, setAddUserStatus] = useState("");
    // const [randomUser, setRandomUser] = useState({});
    // const { currentAuthenticatedId } = useContext(AuthContext);
    

    // Filter and Content Variables
    const [filter, setFilter] = useState("All Users"); 
    const [users, setUsers] = useState([]);
    const students = users.filter (user => user.status === "Student");
    const faculty = users.filter(user => user.status === "Faculty");

    // Add A User
    const addUser = async () => {
        axios.post("https://library-server-cosc3380-ee2497c0e61e.herokuapp.com/usercheck", {
            username: username
        }).then((response) => {
            if (response.data.message === "User already exists") {
                setAddUserStatus("User already exists");
            } else {
                axios.post("https://library-server-cosc3380-ee2497c0e61e.herokuapp.com/usersignup", {
                    userid: uuid().substring(0, 6),
                    firstname: firstname,
                    lastname: lastname,
                    status: status,
                    username: username, 
                    password: password,
                    datesignedup: newdatesignedup,
                    fees: newfees,
                }).then((response) => {
                    console.log(response);
                }).catch((error) => {
                    console.error(error);
                });
                window.location.reload();
            }
        }).catch((error) => {
            console.log(error)
        });
    };

    // Get All Users
    useEffect(() => {
        const getAllUsers = async () => {
            axios.get("https://library-server-cosc3380-ee2497c0e61e.herokuapp.com/users")
            .then((response) => {
                console.log(response.data)
                setUsers(response.data)
            }).catch((error) => {
                console.log(error);
            })
        }
        getAllUsers();
    }, []);

    // Update A User
    const updateUser = async () => {
        axios.put("https://library-server-cosc3380-ee2497c0e61e.herokuapp.com/users/" + userid, {
            userid: userid,
            firstname: firstname,
            lastname: lastname,
            status: status,
            username: username, 
            password: password,
            datesignedup: datesignedup,
            fees: fees,
        }).then((response) => {
            console.log(response);
            window.location.reload();
        }).catch((error) => {
            console.log(error);
        });
    };

    // Delete A User
    const deleteUser = async (userid) => {
        axios.delete("https://library-server-cosc3380-ee2497c0e61e.herokuapp.com/users/" + userid)
        .then((response) => {
            console.log(response);
            window.location.reload();
        }).catch((error) => {
            console.log(error)
        })
    };

    // Add $10,000 Fine To User
    // const deathFine = async () => {
    //     axios.post("https://library-server-cosc3380-ee2497c0e61e.herokuapp.com/addtobalance", {
    //         feeid: uuid(),
    //         borrowerid: randomUser.userid,
    //         name: randomUser.firstname,
    //         itemid: "197db789-8ebf-afad-ea5b-142615677133",
    //         title: "See Me",
    //         type: "Book",
    //         lateamount: 5000,
    //         damagedamount: 5000,
    //         productid: "price_1OC3aYDZDYGFl6V3IhlqXk0N",
    //     }).then((response) => {
    //         console.log(response);
    //     }).catch((error) => {
    //         console.log(error);
    //     })
    // }

    return (
        <div>
            <AdminNavbar />
            <div className="flex flex-col mx-6">
                {/* Buttons */}
                <div className="flex items-center justify-between">
                    <div className="flex gap-4">
                        <button onClick={() => setFilter("All Users")} className={`${filter === "All Users" ? "bg-[#00BBFF]" : "bg-[#7C829D]"} text-white px-4 py-2 rounded-md`}> All Users </button>
                        <button onClick={() => setFilter("Students")} className={`${filter === "Students" ? "bg-[#00BBFF]" : "bg-[#7C829D]"} text-white px-4 py-2 rounded-md`}> Students </button>
                        <button onClick={() => setFilter("Faculty")} className={`${filter === "Faculty" ? "bg-[#00BBFF]" : "bg-[#7C829D]"} text-white px-4 py-2 rounded-md`}> Faculty </button>
                    </div>
                    <div className="flex items-center gap-6">
                        <FaSearch size={25} color='black' onClick={() => setShowSearchModal(true)} className="hover:cursor-pointer"/>
                        <FaPlus size={25} color='black' onClick={() => setShowAddModal(true)} className="hover:cursor-pointer"/>
                    </div>
                </div>

                {/* Empty Content */}
                {filter === "All Users" && users.length === 0 && (
                    <div className="flex items-center justify-center w-full my-10">
                        <p> No Users </p>
                    </div>
                )}

                {filter === "Students" && students.length === 0 && (
                    <div className="flex items-center justify-center w-full my-10">
                        <p> No Students </p>
                    </div>
                )}

                {filter === "Faculty" && faculty.length === 0 && (
                    <div className="flex items-center justify-center w-full my-10">
                        <p> No Faculty </p>
                    </div>
                )}

                {/* Content */}
                <div className="flex flex-col gap-10 my-10">
                    {/* Show All Users */}
                    {filter === "All Users" && (
                        <>
                            {users.map((user) => (
                                <div name={user.userid} key={user.userid} className='flex items-center justify-between gap-10'>
                                    <p className="bg-[#E1EAFF] h-12 w-12 rounded-full flex justify-center items-center"> {user.status[0]}</p>
                                    <p className="flex w-1/5"> {user.firstname + " " + user.lastname}</p>
                                    <p className="flex w-1/5"> {user.username} </p>
                                    <p className="flex w-1/5"> {user.userid.substring(0, 19) + "..."} </p>
                                    <div className="flex justify-between w-1/5 gap-2">
                                        <button onClick={() => {
                                            setShowUpdateModal(true)
                                            setUserid(user.userid)
                                            setDatesignedup(user.datesignedup)
                                            setFees(user.fees)
                                        }} className='bg-[#29E3B6] text-white px-4 py-2 rounded-md w-1/2'> Update </button>
                                        <button onClick={() => {
                                            deleteUser(user.userid)}
                                        } className='bg-[#E16C68] text-white px-4 py-2 rounded-md w-1/2'> Delete </button>
                                    </div>
                                </div>
                            ))}
                        </>
                    )}

                    {/* Show All Students */}
                    {filter === "Students" && (
                        <>
                            {students.map((user) => (
                                <div name={user.userid} key={user.userid} className='flex items-center justify-between gap-10'>
                                    <p className="bg-[#E1EAFF] h-12 w-12 rounded-full flex justify-center items-center"> {user.status[0]}</p>
                                    <p className="flex w-1/5"> {user.firstname + " " + user.lastname}</p>
                                    <p className="flex w-1/5"> {user.username} </p>
                                    <p className="flex w-1/5"> {user.userid.substring(0, 19) + "..."} </p>
                                    <div className="flex justify-between w-1/5 gap-2">
                                        <button onClick={() => {
                                            setShowUpdateModal(true)
                                            setUserid(user.userid)
                                            setDatesignedup(user.datesignedup)
                                            setFees(user.fees)
                                        }} className='bg-[#29E3B6] text-white px-4 py-2 rounded-md w-1/2'> Update </button>
                                        <button onClick={() => {
                                            deleteUser(user.userid)}
                                        } className='bg-[#E16C68] text-white px-4 py-2 rounded-md w-1/2'> Delete </button>
                                    </div>
                                </div>
                            ))}
                        </>
                    )}

                    {/* Show All Faculty */}
                    {filter === "Faculty" && (
                        <>
                            {faculty.map((user) => (
                                <div name={user.userid} key={user.userid} className='flex items-center justify-between gap-10'>
                                    <p className="bg-[#E1EAFF] h-12 w-12 rounded-full flex justify-center items-center"> {user.status[0]}</p>
                                    <p className="flex w-1/5"> {user.firstname + " " + user.lastname}</p>
                                    <p className="flex w-1/5"> {user.username} </p>
                                    <p className="flex w-1/5"> {user.userid.substring(0, 19) + "..."} </p>
                                    <div className="flex justify-between w-1/5 gap-2">
                                        <button onClick={() => {
                                            setShowUpdateModal(true)
                                            setUserid(user.userid)
                                            setDatesignedup(user.datesignedup)
                                            setFees(user.fees)
                                        }} className='bg-[#29E3B6] text-white px-4 py-2 rounded-md w-1/2'> Update </button>
                                        <button onClick={() => {
                                            deleteUser(user.userid)}
                                        } className='bg-[#E16C68] text-white px-4 py-2 rounded-md w-1/2'> Delete </button>
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
                        <input type="text" className="w-3/4 h-10 px-2 my-2 bg-gray-200 rounded-md" placeholder="User ID" onChange={(e) => setUserid(e.target.value)}/>
                        <button className="w-3/4 h-10 px-2 my-2 text-white bg-blue-500 rounded-md "> 
                            <Link to={userid} smooth duration={500} onClick={() => setShowSearchModal(false)}>
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
                        <input type="text" className="w-3/4 h-10 px-2 my-2 bg-gray-200 rounded-md" placeholder="First Name" onChange={(e) => setFirstname(e.target.value)}/>
                        <input type="text" className="w-3/4 h-10 px-2 my-2 bg-gray-200 rounded-md" placeholder="Last Name" onChange={(e) => setLastname(e.target.value)}/>
                        <input type="text" className="w-3/4 h-10 px-2 my-2 bg-gray-200 rounded-md" placeholder="Email Address" onChange={(e) => setUsername(e.target.value)}/>
                        <input type="text" className="w-3/4 h-10 px-2 my-2 bg-gray-200 rounded-md" placeholder="Password" onChange={(e) => setPassword(e.target.value)}/>
                        <div className="flex justify-between w-3/4 gap-2 my-2">
                            <button onClick={() => setStatus("Student")} className={`${status === "Student" ? "bg-[#00BBFF]" : "bg-[#7C829D]"} text-white px-4 py-2 rounded-md w-1/2`}> Student </button>
                            <button onClick={() => setStatus("Faculty")} className={`${status === "Faculty" ? "bg-[#00BBFF]" : "bg-[#7C829D]"} text-white px-4 py-2 rounded-md w-1/2`}> Faculty </button>
                        </div>
                        <button onClick={addUser} className="w-3/4 h-10 px-2 my-2 text-white bg-blue-500 rounded-md "> Add </button>
                        <p> {addUserStatus} </p>
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
                        <input type="text" className="w-3/4 h-10 px-2 my-2 bg-gray-200 rounded-md" placeholder="User ID" value={userid} readOnly={true}/>
                        <input type="text" className="w-3/4 h-10 px-2 my-2 bg-gray-200 rounded-md" placeholder="First Name" onChange={(e) => setFirstname(e.target.value)}/>
                        <input type="text" className="w-3/4 h-10 px-2 my-2 bg-gray-200 rounded-md" placeholder="Last Name" onChange={(e) => setLastname(e.target.value)}/>
                        <input type="text" className="w-3/4 h-10 px-2 my-2 bg-gray-200 rounded-md" placeholder="Email Address" onChange={(e) => setUsername(e.target.value)}/>
                        <input type="text" className="w-3/4 h-10 px-2 my-2 bg-gray-200 rounded-md" placeholder="Password" onChange={(e) => setPassword(e.target.value)}/>
                        <div className="flex justify-between w-3/4 gap-2 my-2">
                            <button onClick={() => setStatus("Student")} className={`${status === "Student" ? "bg-[#00BBFF]" : "bg-[#7C829D]"} text-white px-4 py-2 rounded-md w-1/2`}> Student </button>
                            <button onClick={() => setStatus("Faculty")} className={`${status === "Faculty" ? "bg-[#00BBFF]" : "bg-[#7C829D]"} text-white px-4 py-2 rounded-md w-1/2`}> Faculty </button>
                        </div>
                        <button onClick={updateUser} className="w-3/4 h-10 px-2 my-2 text-white bg-blue-500 rounded-md "> Update </button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default AdminUsers