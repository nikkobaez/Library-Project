const mysql = require("mysql");

// Connect To Database
const db = mysql.createConnection({
    user: "ina7exsoe5de1hlb",
    host: "exbodcemtop76rnz.cbetxkdyhwsb.us-east-1.rds.amazonaws.com",
    password: "ha1vub5bu778bte8",
    database: "r2whgaxmkc2snt2y",
});

module.exports = db;