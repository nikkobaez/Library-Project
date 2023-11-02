import React, {useState} from 'react'
import uuid from 'react-uuid';
import axios from 'axios';

const Contact = () => {
    const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [message, setMessage] = useState("");

	const addMessage = async () => {
        axios.post("https://library-server-cosc3380-ee2497c0e61e.herokuapp.com/addtocontact", {
            contactid: uuid(),
			name: name,
			email: email,
			message: message,
        }).then((response) => {
            console.log(response);
            window.location.reload();
        }).catch((error) => {
            console.log(error);
        })
    };


    return (
        <div>
        <label style={{color: '#374151'}}>Name:</label><br/>
            <input
                type="text"
                className="h-10 px-2 my-2 bg-gray-700 rounded-md"
                name="Name" 
                onChange = {(e) => setName(e.target.value)} 
        />
        <br/><br/>
        
        <label style={{color: '#374151'}}>Email:</label><br/>
        <input
                type="text"
                className="h-10 px-2 my-2 bg-gray-700 rounded-md"
                onChange = {(e) => setEmail(e.target.value)}   
        />
        <br/><br/>

        <label style={{color: '#374151'}}>What is your reason for contacting us?</label><br/>
        <textarea rows={4} cols={40} onChange={(e) => setMessage(e.target.value)}/>
        <br/><br/>

        <button onClick={(addMessage)} className="w-20 bg-gray-700 rounded-md">Submit</button>
    </div>
    )
}

export default Contact