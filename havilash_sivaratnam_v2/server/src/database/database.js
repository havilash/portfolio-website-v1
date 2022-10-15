const mysql = require('mysql');



const conn = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "db_havilash_sivaratnam"
});

conn.connect((err) => {
    if (err) throw err;
    console.log("[CONNECTED] database connected");
});

module.exports.conn = conn;