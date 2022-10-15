const express = require('express')
const database = require('./database/database');

const port = 3000;

const app = express();
const conn = database.conn;

app.get('/users', (req, res) => {
    conn.query("SELECT * FROM users", function(err, result){
        if (err) throw err;
        res.send(result);
    })
});

app.listen(port, () => {
    console.log(`[CONNECTED] server listening to port ${port}`);
});
