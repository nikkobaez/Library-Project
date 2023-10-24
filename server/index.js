const http = require('http');
const mysql = require("mysql2");
const url = require('url');

// Connect To Database
const db = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "password",
    database: "library",
});

// Create A Server
const server = http.createServer((req, res) => {

    // Handle Cors Function To Allow Axios
    handleCors(req, res);

    // GET Requests 
    if (req.method === "GET") {

        // Get All Users
        if (req.url === "/users") {
            db.query(
                "SELECT * FROM users",
                (error, result) => {
                    if (error) {
                        res.writeHead(500, { "Content-Type": "application/json" });
                        res.end(JSON.stringify({ error: error }));
                    } else {
                        res.writeHead(200, { "Content-Type": "application/json" });
                        res.end(JSON.stringify(result));
                    }
                }
            );
        }

    // POST Requests
    } else if (req.method === "POST") {

        // Check For User
        if (req.url === "/usercheck") {
            let data = "";
            req.on("data", (chunk) => {
                data+= chunk;
            });

            req.on("end", () => {
                const body = JSON.parse(data);
                const username = body.username;

                db.query(
                    "SELECT * FROM users WHERE username = ?",
                    [username],
                    (error, result) => {
                        if (error) {
                            res.writeHead(500, { "Content-Type": "application/json" });
                            res.end(JSON.stringify({ error: error }));
                        } else if (result[0]) {
                            res.writeHead(200, { "Content-Type": "application/json" });
                            res.end(JSON.stringify({ message: "User already exists" }));
                        } else {
                            res.writeHead(200, { "Content-Type": "application/json" });
                            res.end(JSON.stringify({ message: "User does not exist" }));
                        }
                    }
                )
            });
        
        // Get A User
        } else if (req.url === "/userlogin") {
            let data = "";
            req.on("data", (chunk) => {
                data += chunk;
            });
            
            req.on("end", () => {
                const body = JSON.parse(data);
                const username = body.username;
                const password = body.password;

                db.query(
                    "SELECT * FROM users WHERE username = ? AND password = ?",
                    [username, password],
                    (error, result) => {
                        if (error) {
                            res.writeHead(500, { "Content-Type": "application/json" });
                            res.end(JSON.stringify({ error: error }));
                        } else if (result[0]) {
                            res.writeHead(200, { "Content-Type": "application/json" });
                            res.end(JSON.stringify(result));
                        } else {
                            res.writeHead(200, { "Content-Type": "application/json" });
                            res.end(JSON.stringify({ message: "Wrong username/password" }));
                        }
                    }
                );
            });

        // Create A User
        } else if (req.url === "/usersignup") {
            let data = "";
            req.on("data", (chunk) => {
                data += chunk;
            });

            req.on("end", () => {
                const body = JSON.parse(data);
                const userid = body.userid;
                const firstname = body.firstname;
                const lastname = body.lastname; 
                const status = body.status;
                const username = body.username;
                const password = body.password;
                
                db.query(
                    "INSERT INTO users (userid, firstname, lastname, status, username, password) VALUES (?, ?, ?, ?, ?, ?)",
                    [userid, firstname, lastname, status, username, password],
                    (error) => {
                        if (error) {
                            console.log(error);
                            res.writeHead(500, {"Content-Type": "application/json"});
                            res.end(JSON.stringify({error: error}));
                        } else {
                            res.writeHead(200, {"Content-Type": "application/json"});
                            res.end(JSON.stringify({ message: "User signed up successfully" }));
                        }
                    }
                );
            });
        
        // Check For Admin
        } else if (req.url === "/admincheck") {
            let data = "";
            req.on("data", (chunk) => {
                data+= chunk;
            });

            req.on("end", () => {
                const body = JSON.parse(data);
                const username = body.username;

                db.query(
                    "SELECT * FROM admins WHERE username = ?",
                    [username],
                    (error, result) => {
                        if (error) {
                            res.writeHead(500, { "Content-Type": "application/json" });
                            res.end(JSON.stringify({ error: error }));
                        } else if (result[0]) {
                            res.writeHead(200, { "Content-Type": "application/json" });
                            res.end(JSON.stringify({ message: "Admin already exists" }));
                        } else {
                            res.writeHead(200, { "Content-Type": "application/json" });
                            res.end(JSON.stringify({ message: "Admin does not exist" }));
                        }
                    }
                )
            });

        // Get An Admin
        } else if (req.url === "/adminlogin") {
            let data = "";
            req.on("data", (chunk) => {
                data += chunk;
            });
            
            req.on("end", () => {
                const body = JSON.parse(data);
                const username = body.username;
                const password = body.password;

                db.query(
                    "SELECT * FROM admins WHERE username = ? AND password = ?",
                    [username, password],
                    (error, result) => {
                        if (error) {
                            res.writeHead(500, { "Content-Type": "application/json" });
                            res.end(JSON.stringify({ error: error }));
                        } else if (result[0]) {
                            res.writeHead(200, { "Content-Type": "application/json" });
                            res.end(JSON.stringify(result));
                        } else {
                            res.writeHead(200, { "Content-Type": "application/json" });
                            res.end(JSON.stringify({ message: "Wrong username/password" }));
                        }
                    }
                );
            });
        
        // Create An Admin
        } else if (req.url === "/adminsignup") {
            let data = "";
            req.on("data", (chunk) => {
                data += chunk;
            });

            req.on("end", () => {
                const body = JSON.parse(data);
                const adminid = body.adminid;
                const firstname = body.firstname;
                const lastname = body.lastname; 
                const username = body.username;
                const password = body.password;
                
                db.query(
                    "INSERT INTO admins (adminid, firstname, lastname, username, password) VALUES (?, ?, ?, ?, ?)",
                    [adminid, firstname, lastname, username, password],
                    (error) => {
                        if (error) {
                            console.log(error);
                            res.writeHead(500, {"Content-Type": "application/json"});
                            res.end(JSON.stringify({error: error}));
                        } else {
                            res.writeHead(200, {"Content-Type": "application/json"});
                            res.end(JSON.stringify({ message: "User signed up successfully" }));
                        }
                    }
                );
            });
        }

    // DELETE Requests
    } else if (req.method === "DELETE") {
        const reqURL = url.parse(req.url, true);
        const pathSegments = reqURL.pathname.split("/");

        // Delete A User
        if (pathSegments.length === 3 && pathSegments[1] === "users") {
            const userid = pathSegments[2];

            db.query(
                "DELETE FROM users WHERE userid = ?",
                [userid],
                (error) => {
                    if (error) {
                        res.writeHead(500, {"Content-Type": "application/json"});
                        res.end(JSON.stringify({error: error}));
                    } else {
                        res.writeHead(200, {"Content-Type": "application/json"});
                        res.end(JSON.stringify({ message: "User has been deleted successfully" }));
                    }
                }
            );
        }
    
    // PUT Requests
    } else if (req.method === "PUT") {
        const reqURL = url.parse(req.url, true);
        const pathSegments = reqURL.pathname.split("/");

        // Update A User
        if (pathSegments.length === 3 && pathSegments[1] === "users") {
            const userid = pathSegments[2];

            let data = "";
            req.on("data", (chunk) => {
                data += chunk;
            });

            req.on("end", () => {
                const body = JSON.parse(data);

                db.query(
                    "UPDATE users SET `firstname` = ?, `lastname` = ?, `status` = ?, `username` = ?, `password` = ? WHERE `userid` = ?",
                    [body.firstname, body.lastname, body.status, body.username, body.password, userid],
                    (error) => {
                        if (error) {
                            res.writeHead(500, { 'Content-Type': 'application/json' });
                            res.end(JSON.stringify({ error: 'Internal Server Error' }));
                        } else {
                            res.writeHead(200, { 'Content-Type': 'application/json' });
                            res.end(JSON.stringify({ message: 'Book has been updated successfully' }));
                        }
                    }
                );
            });
        }

    }
});

// Handle Cors Function To Allow Axios
const handleCors = (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        res.writeHead(200);
        res.end();
        return;
    }
};

// Set Up Server To Listen For Requests From Port 3001
const PORT = 3001;
server.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});