const { Client } = require('pg');

const client = new Client("postgres://db_001396_user:01TCuLzgrv66YjkS3ThgVLDl08orAMJS@dpg-cdgn3qaen0hj5eajnk30-a.frankfurt-postgres.render.com/db_001396?ssl=true");

client.connect((err) => {
    if (err) throw err;
    console.log("[CONNECTED] Database connected");
});


module.exports.conn = client;



// const mysql = require('mysql');


// // // // // localhost
// // const conn = mysql.createConnection({
// //     host: "localhost",
// //     user: "root",
// //     password: "root",
// //     database: "db_havilash_sivaratnam"
// // });

// const conn = mysql.createConnection({
//     host: "dpg-cdgn3qaen0hj5eajnk30-a",
//     user: "db_001396",
//     password: "CZXJtTxFcnAZ",
//     database: "inf_293_21g_m293user17"
// });

// conn.connect((err) => {
//     if (err) throw err;
//     console.log("[CONNECTED] Database connected");
// });

// module.exports.conn = conn;

// const path = require('path')
// const mysql = require('mysql');
// const { Client } = require('ssh2');
// const sshClient = new Client();
// const dbServer = {
//     host: "172.29.4.61",
//     port: 3306,

//     user: "db_001396",
//     password: "CZXJtTxFcnAZ",
//     database: "inf_293_21g_m293user17"
// }
// const tunnelConfig = {
//     host: "inf-293-21g-m293user17.iet-gibb.net",
//     port: 22,
//     username: "inf-293-21g-m293user17",
//     password: "SCEpmsU8DZeu",
//     privateKey: require('fs').readFileSync(path.resolve(__dirname, "../../id_rsa"))
// }

// const forwardConfig = {
//     srcHost: '127.0.0.1',
//     srcPort: 3306,
//     dstHost: dbServer.host,
//     dstPort: dbServer.port
// };
// const SSHConnection = new Promise((resolve, reject) => {
//     sshClient.on('ready', () => {
//         sshClient.forwardOut(
//             forwardConfig.srcHost,
//             forwardConfig.srcPort,
//             forwardConfig.dstHost,
//             forwardConfig.dstPort,
//             (err, stream) => {
//                 if (err) reject(err);
//                 const updatedDbServer = {
//                     ...dbServer,
//                     stream
//                 };
//                 const conn = mysql.createConnection(updatedDbServer);
//                 conn.connect((error) => {
//                     if (error) reject(error);
//                     console.log("[CONNECTED] Database connected");
//                     resolve(conn);
//                 });
//             }
//         );
//     }).connect(tunnelConfig);
// });


// module.exports.conn = SSHConnection;

