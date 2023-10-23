import React, { useState, useEffect } from 'react';
import { FaSearch, FaPlus } from 'react-icons/fa'
import axios from 'axios';
import AdminNavbar from '../components/AdminNavbar';

const AdminUsers = () => {
    const [filter, setFilter] = useState("All Users"); 
    const [users, setUsers] = useState([]);
    const students = users.filter (user => user.status === "Student");
    const faculty = users.filter(user => user.status === "Faculty");



    useEffect(() => {
        const getAllUsers = async () => {
            axios.get("http://localhost:3001/users")
            .then((response) => {
                console.log(response.data)
                setUsers(response.data)
            }).catch((error) => {
                console.log(error);
            })
        }
        getAllUsers();
    }, []);

    const deleteUser = async (userid) => {
        axios.delete("http://localhost:3001/users/" + userid)
        .then((response) => {
            console.log(response);
            window.location.reload();
        }).catch((error) => {
            console.log(error)
        })
    };

    return (
        <div>
            <AdminNavbar />
            <div className="flex flex-col mx-6">
                <div className="flex items-center justify-between">
                    <div className="flex gap-6">
                        <button onClick={() => setFilter("All Users")} className={`${filter === "All Users" ? "bg-[#00BBFF]" : "bg-[#7C829D]"} text-white px-4 py-2 rounded-md`}> All Users </button>
                        <button onClick={() => setFilter("Students")} className={`${filter === "Students" ? "bg-[#00BBFF]" : "bg-[#7C829D]"} text-white px-4 py-2 rounded-md`}> Students </button>
                        <button onClick={() => setFilter("Faculty")} className={`${filter === "Faculty" ? "bg-[#00BBFF]" : "bg-[#7C829D]"} text-white px-4 py-2 rounded-md`}> Faculty </button>
                    </div>
                    <div className="flex gap-6">
                        <FaSearch size={25} color='black' className="hover:cursor-pointer"/>
                        <FaPlus size={25} color='black' className="hover:cursor-pointer"/>
                    </div>
                </div>
                <div className="flex flex-col gap-10 my-10">
                    {/* Show All Users */}
                    {filter === "All Users" && (
                        <>
                            {users.map((user) => (
                                <div key={user.userid} className='flex items-center justify-between gap-10'>
                                    <p className="bg-[#E1EAFF] h-12 w-12 rounded-full flex justify-center items-center"> {user.status[0]}</p>
                                    <p className="flex w-1/5"> {user.firstname + " " + user.lastname}</p>
                                    <p className="flex w-1/5"> {user.username} </p>
                                    <p className="flex w-1/5"> {user.userid.substring(0, 19) + "..."} </p>
                                    <div className="flex justify-between w-1/5 gap-4">
                                        <button className='bg-[#29E3B6] text-white px-4 py-2 rounded-md w-1/2'> Update </button>
                                        <button onClick={() => {deleteUser(user.userid)}} className='bg-[#E16C68] text-white px-4 py-2 rounded-md w-1/2'> Delete </button>
                                    </div>
                                </div>
                            ))}
                        </>
                    )}

                    {/* Show All Students */}
                    {filter === "Students" && (
                        <>
                            {students.map((user) => (
                                <div key={user.userid} className='flex items-center justify-between gap-10'>
                                    <p className="bg-[#E1EAFF] h-12 w-12 rounded-full flex justify-center items-center"> {user.status[0]}</p>
                                    <p className="flex w-1/5"> {user.firstname + " " + user.lastname}</p>
                                    <p className="flex w-1/5"> {user.username} </p>
                                    <p className="flex w-1/5"> {user.userid.substring(0, 19) + "..."} </p>
                                    <div className="flex justify-between w-1/5 gap-4">
                                        <button className='bg-[#29E3B6] text-white px-4 py-2 rounded-md w-1/2'> Update </button>
                                        <button className='bg-[#E16C68] text-white px-4 py-2 rounded-md w-1/2'> Delete </button>
                                    </div>
                                </div>
                            ))}
                        </>
                    )}

                    {/* Show All Faculty */}
                    {filter === "Faculty" && (
                        <>
                            {faculty.map((user) => (
                                <div key={user.userid} className='flex items-center justify-between gap-10'>
                                    <p className="bg-[#E1EAFF] h-12 w-12 rounded-full flex justify-center items-center"> {user.status[0]}</p>
                                    <p className="flex w-1/5"> {user.firstname + " " + user.lastname}</p>
                                    <p className="flex w-1/5"> {user.username} </p>
                                    <p className="flex w-1/5"> {user.userid.substring(0, 19) + "..."} </p>
                                    <div className="flex justify-between w-1/5 gap-4">
                                        <button className='bg-[#29E3B6] text-white px-4 py-2 rounded-md w-1/2'> Update </button>
                                        <button className='bg-[#E16C68] text-white px-4 py-2 rounded-md w-1/2'> Delete </button>
                                    </div>
                                </div>
                            ))}
                        </>
                    )}


                </div>
            </div>
        </div>
    )
}

export default AdminUsers