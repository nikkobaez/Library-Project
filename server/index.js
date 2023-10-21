const http = require('http');
const mysql = require("mysql2");

const db = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "password",
    database: "library",
});

const server = http.createServer((req, res) => {
    handleCors(req, res);

    if (req.method === "POST") {
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
                const username = body.username;
                const password = body.password;
                
                db.query(
                    "INSERT INTO users (userid, firstname, lastname, username, password) VALUES (?, ?, ?, ?, ?)",
                    [userid, firstname, lastname, username, password],
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