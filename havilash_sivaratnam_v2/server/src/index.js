const express = require('express')
const path = require('path');
const auth = require('./auth');

const apiPath = '/api';
const port = process.env.PORT || 5000;
const app = express();

app.use(apiPath + auth.path, auth.router)
app.use(express.static(path.join(__dirname, '../../client/build')));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, '../../client/build/index.html'));
});

app.get("*", (req, res) => {
  res.sendFile(
    path.join(__dirname, '../../client/build/index.html')
  );
});


app.listen(port, () => {
    console.log(`[CONNECTED] Server listening to port ${port}`);
});
