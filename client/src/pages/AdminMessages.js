import React, {useState, useEffect} from 'react'
import AdminNavbar from '../components/AdminNavbar';
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

    // Delete A Message From Contact
    const deleteMessage = async (contactid) => {
        axios.delete("https://library-server-cosc3380-ee2497c0e61e.herokuapp.com/contact/" + contactid)
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
        <div className="flex flex-col gap-10 my-10">
            {/* Empty Content */}
            {messages.length === 0 && (
                <div className="flex items-center justify-center w-full my-10">
                    No Messages
                </div>
            )}

            {/* Content */}
            {messages.length > 0 && (
                <>
                    {messages.map((message) => (
                        <div key={message.contactid} className="flex flex-col mx-6">
                            <div className="flex flex-col gap-6 p-4 bg-white border-4 border-gray-200 rounded-md">
                                <p> Name: </p>
                                <p> {message.name}</p>

                                <p> Email: </p>
                                <p> {message.email}</p>
                                
                                <p> Message: </p>
                                <p> {message.message}</p>
                            </div>
                            <button onClick={() => deleteMessage(message.contactid)} className="h-10 px-2 my-6 text-white bg-blue-500 rounded-md"> Delete Message </button>
                        </div>
                    ))}
                </>
            )}
        </div>
    </div>
  )
}

export default AdminMessages