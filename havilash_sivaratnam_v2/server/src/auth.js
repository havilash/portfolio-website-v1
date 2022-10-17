require('dotenv').config();

const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors')

const database = require('./database/database');

const accessTokenExpirationTime = '300s'                // JWT Syntax
const refreshTokenExpirationTime = 'INTERVAL 7 DAY'     // SQL Syntax
const apiPath = '/auth';

const router = express.Router();
const conn = database.conn;

router.use(cors());
router.use(express.json());
router.use(express.urlencoded());

function insertRefreshToken(token) {
    const sql = `INSERT INTO auth (refresh_token, valid_until) VALUES ('${token}', NOW() + ${refreshTokenExpirationTime})`;
    conn.query(sql, (err, result) => {
        if (err) throw err;
        return result;
    });
}

function deleteOldRefreshTokens() {
    const sql = `DELETE FROM auth a WHERE a.valid_until < NOW();`;
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
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: accessTokenExpirationTime })
}

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) return res.sendStatus(401)

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
}

router.get('/user', authenticateToken, (req, res) => {
    conn.query(`SELECT * FROM users u WHERE u.id = '${req.user.id}'`, (err, result) => {
        if (err) return res.status(500).send(err);
        if (result.length == 0) return res.status(404).send('User not found');
        res.json(result);
    });
});

router.get('/users', authenticateToken, (req, res) => {
    conn.query("SELECT * FROM users", (err, result) => {
        if (err) return res.status(500).send(err);
        res.json(result);
    });
});

router.post('/signup', async (req, res) => {
    console.log(req)
    if (typeof req.body.username === 'undefined' || typeof req.body.password === 'undefined' || typeof req.body.email === 'undefined') 
        return res.status(409).send("Username/E-Mail/password not set");

    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const sql = `INSERT INTO users (username, email, password) VALUES ('${req.body.username}', '${req.body.email}', '${hashedPassword}')`;
    conn.query(sql, (err, result) => {
        if (err) return res.status(500).send(err);
        return res.status(201).send("User created");
    });
});

router.post('/login', (req, res) => {
    if (typeof req.body.username === 'undefined' || typeof req.body.password === 'undefined') 
        return res.status(409).send("Username/password not set");

    conn.query(`SELECT * FROM users u WHERE u.username = '${req.body.username}'`, async (err, result) => {
        if (err) res.status(500).send(err);
        
        if (result.length == 0)
            return res.status(404).send('User not found');
        var user = result[0];

        try {
            if (await bcrypt.compare(req.body.password, user.password)){

                // JWT
                payload = generatePayload(user);
                const accessToken = generateAccessToken(payload);
                const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET);
                insertRefreshToken(refreshToken);
                // refreshTokens.push(refreshToken);
                res.status(202).json({
                    message: 'Login succesful',
                    accessToken: accessToken,
                    refreshToken: refreshToken
                });

            }
            else 
                res.status(401).send('Login failed');
        } catch (e) {
            return res.status(500).send(e.toString());
        }
    });
});

router.delete('/logout', (req, res) => {
    if (typeof req.body.token === 'undefined') 
        return res.status(409).send("token not set");

    const sql = `DELETE FROM auth a WHERE a.refresh_token = '${req.body.token}'`;
    conn.query(sql, (err, result) => {
        if (err) res.status(500).send(err);
        return res.status(200).send('Logout successful')
    });
});

router.post('/token', (req, res) => {
    deleteOldRefreshTokens();

    if (typeof req.body.token === 'undefined') 
        return res.status(409).send("token not set");

    const refreshToken = req.body.token;
    if (refreshToken == null) return res.sendStatus(401);
    const sql = `SELECT * FROM auth a WHERE a.refresh_token = '${refreshToken}'`;
    conn.query(sql, (err, result) => {
        if (err) return res.status(500).send(err);
        if (result.length == 0) return res.sendStatus(403);
        
        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
            if (err) return res.sendStatus(403);
            const accessToken = generateAccessToken(generatePayload(user));
            res.json({ accessToken: accessToken });
        });
    });
});

module.exports.authenticateToken = authenticateToken;
module.exports.path = apiPath;
module.exports.router = router;