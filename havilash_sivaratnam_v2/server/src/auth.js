require('dotenv').config();

console.log(process.env.ACCESS_TOKEN_SECRET)

const accessTokenSecret = "ca63cfa60c48aac97fc2fc695c608e7aee86b2cf75bedf42c787ead1533a5666e8b7b9d8bfd05fd40eff6c345c33ef834631598a9c0ead8a37e92d453128b393";  // TODO
const refreshTokenSecret = "b800029bf0cf8ba48f68af3a6afbf074e3b59128cfcccb6f44fd23eea151ea8cd54507632a0e2ba7c28c06b7ab2fbe15da5534752bf7802d1fc2b3bdfb72d364";  // TODO


const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const database = require('./database/database');

const expirationTime = '30s'
const path = '/auth';

const router = express.Router();
const conn = database.conn;

let refreshTokens = []

router.use(express.json())

function insertRefreshToken(token){
    const sql = `INSERT INTO auth (refresh_token, valid_until) VALUES (${token}, NOW() + INTERVAL 7 DAY)`;
    conn.query(sql, (err, result) => {
        if (err) throw err;
        return result;
    });
}

function generatePayload(user){
    return {
        id: user.id,
        username: user.username
    }
}

function generateAccessToken(user) {
    return jwt.sign(user, accessTokenSecret, { expiresIn: '300s' })
}

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) return res.sendStatus(401)
    
    jwt.verify(token, accessTokenSecret, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
}

router.get('/users', authenticateToken, (req, res) => {
    conn.query("SELECT * FROM users", (err, result) => {
        if (err) throw err;
        res.json(result);
    });
});

router.post('/signup', async (req, res) => {
    if (typeof req.body.username === 'undefined' || typeof req.body.password === 'undefined') 
        return res.status(409).send("Username or password not set");

    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const sql = `INSERT INTO users (username, password) VALUES ('${req.body.username}', '${hashedPassword}')`;
    conn.query(sql, (err, result) => {
        if (err) return res.status(500).send(err);
        return res.status(201).send("User created");
    });
});

router.post('/login', (req, res) => {
    if (typeof req.body.username === 'undefined' || typeof req.body.password === 'undefined') 
        return res.status(409).send("Username or password not set");

    conn.query(`SELECT * FROM users u WHERE u.username = '${req.body.username}'`, async (err, result) => {
        if (err) throw err;
        
        if (result.length == 0)
            return res.status(400).send('User not found');
        var user = result[0];

        try {
            if (await bcrypt.compare(req.body.password, user.password)){

                // JWT
                payload = generatePayload(user);
                const accessToken = generateAccessToken(payload);
                const refreshToken = jwt.sign(payload, refreshTokenSecret);
                insertRefreshToken(refreshToken);
                // refreshTokens.push(refreshToken);
                res.status(202).json({
                    message: 'Login succesful',
                    accessToken: accessToken,
                    refreshToken: refreshToken
                });

            }
            else 
                res.status(402).send('Login failed');
        } catch (e) {
            return res.status(500).send(e.toString());
        }
    });
});

router.get('/logout', (req, res) => {
    if (typeof req.body.token === 'undefined') 
        return res.status(409).send("token not set");

    // refreshTokens = refreshTokens.filter(token => token !== req.body.token)
    const sql = `DELETE FROM auth a WHERE a.refresh_token = ${req.body.token}`;
    conn.query(sql, () => {

    });
    res.sendStatus(204);
});

router.post('/token', (req, res) => {
    if (typeof req.body.token === 'undefined') 
        return res.status(409).send("token not set");

    const refreshToken = req.body.token;
    if (refreshToken == null) return res.sendStatus(401);
    if (!refreshTokens.includes(refreshToken)) return res.sendStatus(403);
    jwt.verify(refreshToken, refreshTokenSecret, (err, user) => {
      if (err) return res.sendStatus(403);
      const accessToken = generateAccessToken(generatePayload(user));
      res.json({ accessToken: accessToken });
    })
});

module.exports.authenticateToken = authenticateToken;
module.exports.path = path;
module.exports.router = router;