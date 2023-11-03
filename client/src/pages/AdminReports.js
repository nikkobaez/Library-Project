import React from 'react';
import AdminNavbar from '../components/AdminNavbar';

class AdminReport extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeButton: null,
    };
  }

  handleButtonClick = (buttonName) => {
    this.setState({ activeButton: buttonName });
  };

  render() {
    // const buttonStyle = {
    //   padding: '8px 16px',
    //   borderRadius: '8px',
    //   color: 'white',
    //   backgroundColor: 'grey',
    //   margin: '8px',
    // };

    // const activeButtonStyle = {
    //   ...buttonStyle,
    //   backgroundColor: '#00BBFF',
    // };

    return (
      <div>
        <AdminNavbar />
        
        
        <form action="submit_data.php" method="post">
        <label htmlFor="name">Name:</label>
<input
  type="text"
  id="name"
  name="name"
  required
  className="p-2 bg-gray-200 rounded-md"
/><br /><br />
<label htmlFor="itemid">itemid:</label>
<input
  type="text"
  id="name"
  name="name"
  required
  className="p-2 bg-gray-200 rounded-md"
/><br /><br />
<label htmlFor="userid">userid:</label>
<input
  type="text"
  id="name"
  name="name"
  required
  className="p-2 bg-gray-200 rounded-md"
/><br /><br />

          <input type="submit" value="Submit" />
        </form>
        <style>
          {`
            .active-button {
              padding: 8px 16px;
              border-radius: 8px;
              color: white;
              background-color: #00BBFF;
            }

            .inactive-button {
              padding: 8px 16px;
              border-radius: 8px;
              color: white;
              background-color: grey;
            }

            /* Style for input and textarea elements */
            input[type="text"],
            input[type="email"],
            textarea {
              width: 100%;
              padding: 8px;
              margin: 8px 0;
              box-sizing: border-box;
            }
          `}
        </style>
      </div>
    );
  }
}

export default AdminReport;