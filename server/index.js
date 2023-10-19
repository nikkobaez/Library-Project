const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();

app.use(express.json())
app.use(cors());

const db = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "password",
    database: "library",
});

app.post('/signup', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    db.query(
        "INSERT INTO users (username, password) VALUES (?, ?)",
        [username, password],
        (error, result) => {
            console.log(error);
        }
    );
});

app.post('/login', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    db.query(
        "SELECT * FROM users WHERE username = ? AND password = ?",
        [username, password],
        (error, result) => {
            if (error) {
                res.send({error: error})
            } 

            if (result.length > 0) {
                res.send(result)
            } else {
                res.send({message: "Wrong username/password"});
            }
        }
    );
});

app.listen(3001, () => {
    console.log("running server on port 3001");
});