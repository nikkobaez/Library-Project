import React, {useState, useEffect} from 'react'
import axios from 'axios';

const AdminMessages = () => {
    const [messages, setMessages] = useState([]);


    // Get All Messages From Contact
    useEffect(() => {
        const getAllMessages = async () => {
            axios.get("https://library-server-cosc3380-ee2497c0e61e.herokuapp.com/contact")
            .then((response) => {
                console.log(response.data);
                setMessages(response.data);
            }).catch((error) => {
                console.log(error);
            })
        }
        getAllMessages();
    }, []);



  return (
    <div>
        {messages.map((message) => (
            <>
                <p> {message.name} </p> 
            </>
        ))}
    </div>
  )
}

export default AdminMessages