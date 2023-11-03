import React, {useState, useEffect} from 'react'
import AdminNavbar from '../components/AdminNavbar';
import './AdminMessages.css'
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
		<AdminNavbar />
		<table>
			<tr>
                <th>Name</th>
                <th>Email</th>
                <th>Message</th>
                <th>Message ID</th>
            </tr>

		</table>

        {messages.map((message) => (
            <table>
				<tr>
					<td>{message.name}</td>
					<td>{message.email}</td>
					<td>{message.message}</td>
					<td>{message.contactid}</td>
				</tr>
			</table>
        ))}
    </div>
  )
}

export default AdminMessages