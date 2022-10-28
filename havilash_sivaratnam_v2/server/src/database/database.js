const mysql = require('mysql');


// localhost
// const conn = mysql.createConnection({
//     host: "localhost",
//     user: "root",
//     password: "root",
//     database: "db_havilash_sivaratnam"
// });

const conn = mysql.createConnection({
    host: "172.29.4.61",
    user: "db_001396",
    password: "CZXJtTxFcnAZ",
    database: "inf_293_21g_m293user17"
});

conn.connect((err) => {
    if (err) throw err;
    console.log("[CONNECTED] Database connected");
});

module.exports.conn = conn;