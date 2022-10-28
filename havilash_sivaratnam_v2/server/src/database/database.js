const mysql = require('mysql');


// localhost
// const conn = mysql.createConnection({
//     host: "localhost",
//     user: "root",
//     password: "root",
//     database: "db_havilash_sivaratnam"
// });

// const conn = mysql.createConnection({
//     host: "172.29.4.61",
//     user: "db_001396",
//     password: "CZXJtTxFcnAZ",
//     database: "inf_293_21g_m293user17"
// });

// conn.connect((err) => {
//     if (err) throw err;
//     console.log("[CONNECTED] Database connected");
// });



// const mysql = require('mysql2');
// const { Client } = require('ssh2');
// const sshClient = new Client();

// const dbServer = {
//     host: "172.29.4.61",
//     user: "db_001396",
//     password: "CZXJtTxFcnAZ",
//     database: "inf_293_21g_m293user17"
// }
// const tunnelConfig = {
//     host: "inf-293-21g-m293user17.iet-gibb.net",
//     username: "inf-293-21g-m293user17",
//     password: "CZXJtTxFcnAZ"
// }
// const forwardConfig = {
//     srcHost: '127.0.0.1',
//     srcPort: 3306,
//     dstHost: dbServer.host,
//     dstPort: 3306
// };
// var connection;
// const SSHConnection = new Promise((resolve, reject) => {
//     sshClient.on('ready', () => {
//         sshClient.forwardOut(
//         forwardConfig.srcHost,
//         forwardConfig.srcPort,
//         forwardConfig.dstHost,
//         forwardConfig.dstPort,
//         (err, stream) => {
//             if (err) reject(err);
//             const updatedDbServer = {
//                 ...dbServer,
//                 stream
//             };
//             connection =  mysql.createConnection(updatedDbServer);
//             connection.connect((error) => {
//             if (error) {
//                 reject(error);
//             }
//             resolve(connection);
//             });
//         });
//     }).connect(tunnelConfig);
// });

module.exports.conn = "connection";