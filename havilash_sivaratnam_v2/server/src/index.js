const express = require('express')
const auth = require('./auth');

const port = 3000;
const app = express();

app.use(auth.path, auth.router)

app.listen(port, () => {
    console.log(`[CONNECTED] Server listening to port ${port}`);
});
