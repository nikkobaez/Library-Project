const http = require('http');
const mysql = require("mysql2");
const url = require('url');

const db = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "password",
    database: "library",
});

const server = http.createServer((req, res) => {
    handleCors(req, res);

    if (req.method === "GET") {
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
    } else if (req.method === "POST") {
        if (req.url === "/userlogin") {
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
                            console.log(result[0])
                            res.writeHead(200, { "Content-Type": "application/json" });
                            res.end(JSON.stringify({ message: "Wrong username/password" }));
                        }
                    }
                );
            });
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
                            console.log(result[0])
                            res.writeHead(200, { "Content-Type": "application/json" });
                            res.end(JSON.stringify({ message: "Wrong username/password" }));
                        }
                    }
                );
            });
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
    } else if (req.method === "DELETE") {
        const reqURL = url.parse(req.url, true);
        const pathSegments = reqURL.pathname.split("/");

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
            )
        }
    }
});

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

const PORT = 3001;
server.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});