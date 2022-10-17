const express = require('express')
const auth = require('./auth');

const apiPath = '/api';
const port = 5000;
const app = express();

app.use(apiPath + auth.path, auth.router)

app.listen(port, () => {
    console.log(`[CONNECTED] Server listening to port ${port}`);
});
