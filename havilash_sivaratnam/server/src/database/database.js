const { Client } = require('pg');

const dbUrl = "postgres://db_001396_user:01TCuLzgrv66YjkS3ThgVLDl08orAMJS@dpg-cdgn3qaen0hj5eajnk30-a.frankfurt-postgres.render.com/db_001396?ssl=true"

const client = new Client(dbUrl);

client.connect((err) => {
    if (err) return console.log("[NOT CONNECTED] Database not connected");
    console.log("[CONNECTED] Database connected");
});


module.exports.conn = client;