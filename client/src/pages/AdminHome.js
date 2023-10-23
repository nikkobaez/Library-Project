import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";

const AdminHome = () => {
    const [users, setUsers] = useState([]);
    const { currentFirstname, currentLastname } = useContext(AuthContext);

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
        <div className="m-8">
            <div className="my-8">
                <p className="text-2xl font-bold"> Hello {currentFirstname + " " + currentLastname}</p>
            </div>
            <div className="my-8">
                <p className="text-xl font-semibold"> Book Nook's Users </p>
                {users.map((user) => (
                    <div key={user.userid} className="flex flex-col items-start justify-start gap-2 my-4 bg-red-200">
                        <p className="font-bold"> User Id: {user.userid} </p> 
                        <p className="font-bold"> First Name: {user.firstname} </p> 
                        <p className="font-bold"> Last Name: {user.lastname} </p> 
                        <p className="font-bold"> Status: {user.status} </p> 
                        <button> Update </button>
                        <button onClick={() => {deleteUser(user.userid)}}> Delete </button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default AdminHome