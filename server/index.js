const http = require('http');
const fs = require("fs");
const url = require('url');
const path = require("path");
const mysql = require("mysql2");

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
        // Domain Setup Test
        if (req.url === "/") {
            res.setHeader('Content-Type', 'text/html');
            res.end('<html><body>Hello, World!</body></html>');
        // Get All Users
        } else if (req.url === "/users") {
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
        
        // Get All Items From Available
        } else if (req.url === "/available") {
            db.query(
                "SELECT * FROM available",
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
        
        // Get All Items From Rented
        } else if (req.url === "/rented") {
            db.query(
                "SELECT * FROM rented",
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
        
        // Get All Items From Processing
        } else if (req.url === "/processing") {
            db.query(
                "SELECT * FROM processing",
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
                            res.end(JSON.stringify({ message: "Wrong username or password" }));
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
                            res.end(JSON.stringify({ message: "User has signed up successfully" }));
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
                );
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
                            res.end(JSON.stringify({ message: "Wrong username or password" }));
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
                            res.end(JSON.stringify({ message: "Admin has signed up successfully" }));
                        }
                    }
                );
            });

        // Add An Item To Available
        } else if (req.url === "/addtoavailable") {
            let data = "";
            req.on("data", (chunk) => {
                data += chunk;
            });

            req.on("end", () => {
                const body = JSON.parse(data);
                const itemid = body.itemid;
                const title = body.title;
                const author = body.author; 
                const cover = body.cover;
                const type = body.type;
                
                db.query(
                    "INSERT INTO available (itemid, title, author, cover, type) VALUES (?, ?, ?, ?, ?)",
                    [itemid, title, author, cover, type],
                    (error) => {
                        if (error) {
                            console.log(error);
                            res.writeHead(500, {"Content-Type": "application/json"});
                            res.end(JSON.stringify({error: error}));
                        } else {
                            res.writeHead(200, {"Content-Type": "application/json"});
                            res.end(JSON.stringify({ message: "Item has been added successfully to available" }));
                        }
                    }
                );
            });
        
        // Add An Item To Rented
        } else if (req.url === "/addtorented") {
            let data = "";
            req.on("data", (chunk) => {
                data += chunk;
            });

            req.on("end", () => {
                const body = JSON.parse(data);
                const rentedid = body.rentedid;
                const borrowerid = body.borrowerid;
                const name = body.name;
                const itemid = body.itemid;
                const title = body.title;
                const author = body.author; 
                const cover = body.cover;
                const type = body.type;
                
                db.query(
                    "INSERT INTO rented (rentedid, borrowerid, name, itemid, title, author, cover, type) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
                    [rentedid, borrowerid, name, itemid, title, author, cover, type],
                    (error) => {
                        if (error) {
                            console.log(error);
                            res.writeHead(500, {"Content-Type": "application/json"});
                            res.end(JSON.stringify({error: error}));
                        } else {
                            res.writeHead(200, {"Content-Type": "application/json"});
                            res.end(JSON.stringify({ message: "Item has been added successfully to rented" }));
                        }
                    }
                );
            });
        
        // Add An Item To Processing
        }  else if (req.url === "/addtoprocessing") {
            let data = "";
            req.on("data", (chunk) => {
                data += chunk;
            });

            req.on("end", () => {
                const body = JSON.parse(data);
                const processingid = body.processingid;
                const borrowerid = body.borrowerid;
                const name = body.name;
                const itemid = body.itemid;
                const title = body.title;
                const author = body.author; 
                const cover = body.cover;
                const type = body.type;
                
                db.query(
                    "INSERT INTO processing (processingid, borrowerid, name, itemid, title, author, cover, type) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
                    [processingid, borrowerid, name, itemid, title, author, cover, type],
                    (error) => {
                        if (error) {
                            console.log(error);
                            res.writeHead(500, {"Content-Type": "application/json"});
                            res.end(JSON.stringify({error: error}));
                        } else {
                            res.writeHead(200, {"Content-Type": "application/json"});
                            res.end(JSON.stringify({ message: "Item has been added successfully to rented" }));
                        }
                    }
                );
            });
        
        // Add A Fee To Balance
        } else if (req.url === "/addtobalance") {
            let data = "";
            req.on("data", (chunk) => {
                data += chunk;
            });

            req.on("end", () => {
                const body = JSON.parse(data);
                const feeid = body.feeid;
                const borrowerid = body.borrowerid;
                const name = body.name;
                const itemid = body.itemid;
                const title = body.title;
                const type = body.type;
                const lateamount = body.lateamount;
                const damagedamount = body.damagedamount;
                const productid = body.productid;
                
                db.query(
                    "INSERT INTO balance (feeid, borrowerid, name, itemid, title, type, lateamount, damagedamount, productid) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
                    [feeid, borrowerid, name, itemid, title, type, lateamount, damagedamount, productid],
                    (error) => {
                        if (error) {
                            console.log(error);
                            res.writeHead(500, {"Content-Type": "application/json"});
                            res.end(JSON.stringify({error: error}));
                        } else {
                            res.writeHead(200, {"Content-Type": "application/json"});
                            res.end(JSON.stringify({ message: "Fee have been added successfully to balance" }));
                        }
                    }
                );
            });
        
        // Get All Users Items From Rented
        } else if (req.url === "/rented") {
            let data = "";
            req.on("data", (chunk) => {
                data += chunk;
            });

            req.on("end", () => {
                const body = JSON.parse(data);
                const borrowerid = body.borrowerid;

                db.query(
                    "SELECT * FROM rented WHERE borrowerid = ?",
                    [borrowerid],
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
            });
        
        // Get All Users Fees From Balance 
        } else if (req.url === "/balance") {
            let data = "";
            req.on("data", (chunk) => {
                data += chunk;
            });

            req.on("end", () => {
                const body = JSON.parse(data);
                const borrowerid = body.borrowerid;

                db.query(
                    "SELECT * FROM balance WHERE borrowerid = ?",
                    [borrowerid],
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
            });
        } else if (req.url === "/webhook") {
            let data = "";
            req.on("data", (chunk) => {
                data += chunk;
            });

            req.on("end", () => {
                const signature = req.headers["stripe-signature"];

                try {
                    const event = stripe.webhooks.constructEvent(data, signature, endpointSecret);

                } catch {
                    res.writeHead(400, { 'Content-Type': 'text/plain' });
                    res.end(`Webhook Error: ${err.message}`);
                }
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
        
        // Delete An Item From Available
        } else if (pathSegments.length === 3 && pathSegments[1] === "available") {
            const itemid = pathSegments[2];

            db.query(
                "DELETE FROM available WHERE itemid = ?",
                [itemid],
                (error) => {
                    if (error) {
                        res.writeHead(500, {"Content-Type": "application/json"});
                        res.end(JSON.stringify({error: error}));
                    } else {
                        res.writeHead(200, {"Content-Type": "application/json"});
                        res.end(JSON.stringify({ message: "Item has been deleted successfully from available" }));
                    }
                }
            );
        
        // Delete An Item From Rented
        } else if (pathSegments.length === 3 && pathSegments[1] === "rented") {
            const rentedid = pathSegments[2];

            db.query(
                "DELETE FROM rented WHERE rentedid = ?",
                [rentedid],
                (error) => {
                    if (error) {
                        res.writeHead(500, {"Content-Type": "application/json"});
                        res.end(JSON.stringify({error: error}));
                    } else {
                        res.writeHead(200, {"Content-Type": "application/json"});
                        res.end(JSON.stringify({ message: "Item has been deleted successfully from rented" }));
                    }
                }
            );
        
        // Delete An Item From Processing
        } else if (pathSegments.length === 3 && pathSegments[1] === "processing") {
            const processingid = pathSegments[2];

            db.query(
                "DELETE FROM processing WHERE processingid = ?",
                [processingid],
                (error) => {
                    if (error) {
                        res.writeHead(500, {"Content-Type": "application/json"});
                        res.end(JSON.stringify({error: error}));
                    } else {
                        res.writeHead(200, {"Content-Type": "application/json"});
                        res.end(JSON.stringify({ message: "Item has been deleted successfully from processing" }));
                    }
                }
            );
        
        // Delete A Fee From Processing
        } else if (pathSegments.length === 3 && pathSegments[1] === "balance") {
            const feeid = pathSegments[2];

            db.query(
                "DELETE FROM balance WHERE feeid = ?",
                [feeid],
                (error) => {
                    if (error) {
                        res.writeHead(500, {"Content-Type": "application/json"});
                        res.end(JSON.stringify({error: error}));
                    } else {
                        res.writeHead(200, {"Content-Type": "application/json"});
                        res.end(JSON.stringify({ message: "Fee has been deleted successfully from processing" }));
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
                            res.end(JSON.stringify({ message: 'User has been updated successfully' }));
                        }
                    }
                );
            });
        
        // Update An Item In Available
        } else if (pathSegments.length === 3 && pathSegments[1] === "available") {
            const itemid = pathSegments[2];
            
            let data = "";
            req.on("data", (chunk) => {
                data += chunk;
            });

            req.on("end", () => {
                const body = JSON.parse(data);

                db.query(
                    "UPDATE available SET `title` = ?, `author` = ?, `cover` = ?, `type` = ? WHERE `itemid` = ?",
                    [body.title, body.author, body.cover, body.type, itemid],
                    (error) => {
                        if (error) {
                            res.writeHead(500, { 'Content-Type': 'application/json' });
                            res.end(JSON.stringify({ error: 'Internal Server Error' }));
                        } else {
                            res.writeHead(200, { 'Content-Type': 'application/json' });
                            res.end(JSON.stringify({ message: 'Item has been updated successfully from available' }));
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
const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});