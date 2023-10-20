import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Home = () => {
    const { contextUsername, contextUserid } = useContext(AuthContext);

    return (
        <>
            <div>{contextUsername}</div>
            <div> {contextUserid} </div>
        </>
    );
}

export default Home