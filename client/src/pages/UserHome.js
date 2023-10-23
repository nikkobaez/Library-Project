import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const UserHome = () => {
    const { currentFirstname, currentLastname } = useContext(AuthContext);

    return (
        <div>
            <p> {currentFirstname} </p>
            <p> {currentLastname} </p>
        </div>
    )
}

export default UserHome
