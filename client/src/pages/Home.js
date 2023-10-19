import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Home = () => {
    const { user } = useContext(AuthContext);

    return (
        <div>{user}</div>
    );
}

export default Home