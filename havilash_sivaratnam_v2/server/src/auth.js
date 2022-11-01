require('dotenv').config();

const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors')

const database = require('./database/database');

const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET
const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET

const accessTokenExpirationTime = '300s'                // JWT Syntax
const refreshTokenExpirationTime = "INTERVAL '7 DAY'"     // PostgresSQL Syntax
const apiPath = '/auth';

const router = express.Router();
const conn = database.conn;

router.use(cors());
router.use(express.json());

function insertRefreshToken(token) {
    const sql = `INSERT INTO auth (refresh_token, valid_until) VALUES ('${token}', NOW() + ${refreshTokenExpirationTime})`;
    conn.query(sql, (err, result) => {
        if (err) throw err;
        return result.rows;
    });
}

function deleteOldRefreshTokens() {
    const sql = `DELETE FROM auth a WHERE a.valid_until < NOW();`;
    conn.query(sql, (err, result) => {
        if (err) throw err;
        return result.rows;
    });
}

function generatePayload(user){
    return {
        id: user.id,
        username: user.username
    }
}

function generateAccessToken(user) {
    return jwt.sign(user, accessTokenSecret, { expiresIn: accessTokenExpirationTime })
}

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) return res.send(401).json({message: "Unauthorized"})

    jwt.verify(token, accessTokenSecret, (err, user) => {
        if (err) return res.send(403).json({message: "Forbidden"});
        req.user = user;
        next();
    });
}

router.get('/test', (req, res) => {
    conn.query("SELECT * FROM users", (err, result) => {
        if (err) return res.status(500).json({ message: "Internal Server Error", ...err });
        res.json(result.rows);
    });
});

router.get('/user', authenticateToken, (req, res) => {
    conn.query(`SELECT * FROM users u WHERE u.id = '${req.user.id}'`, (err, result) => {
        if (err) return res.status(500).json({ message: "Internal Server Error", ...err });
        if (result.rows.length == 0) return res.status(404).json({message: 'User not found'});
        res.json(result.rows[0]);
    });
});

router.get('/users', authenticateToken, (req, res) => {
    conn.query("SELECT * FROM users", (err, result) => {
        if (err) return res.status(500).json({ message: "Internal Server Error", ...err });
        res.json(result.rows);
    });
});

router.post('/signup', async (req, res) => {
    if (typeof req.body.username === 'undefined' || typeof req.body.password === 'undefined' || typeof req.body.email === 'undefined') 
        return res.status(409).json({message: "Username/E-Mail/password not set"});

    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const sql = `INSERT INTO users (username, email, password) VALUES ('${req.body.username}', '${req.body.email}', '${hashedPassword}')`;
    conn.query(sql, (err, result) => {
        if (err?.code == "23505") return res.status(400).json({ message: "Username/E-Mail already exists", ...err });
        if (err) return res.status(500).json({ message: "Internal Server Error", ...err });
        return res.status(201).json({message: "User created"});
    });
});

router.post('/login', (req, res) => {
    if (typeof req.body.username === 'undefined' || typeof req.body.password === 'undefined') 
        return res.status(409).json({message: "Username/password not set"});

    conn.query(`SELECT * FROM users AS u WHERE u.username = '${req.body.username}' OR u.email = '${req.body.username}'`, async (err, result) => {
        if (err) res.status(500).json({ message: "Internal Server Error", ...err});
        
        if (result.rows.length == 0)
            return res.status(404).json({message:'Username wrong'});
        var user = result.rows[0];

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
                res.status(401).json({message:'Password wrong'});
        } catch (e) {
            return res.status(500).json({ message: "Internal Server Error", ...e });
        }
    });
});

router.delete('/logout', (req, res) => {
    if (typeof req.body.token === 'undefined') 
        return res.status(409).json({message:"token not set"});

    const sql = `DELETE FROM auth a WHERE a.refresh_token = '${req.body.token}'`;
    conn.query(sql, (err, result) => {
        if (err) res.status(500).json({ message: "Internal Server Error", ...err });
        return res.status(200).json({message: 'Logout successful'})
    });
});

router.post('/token', (req, res) => {
    deleteOldRefreshTokens();

    if (typeof req.body.token === 'undefined') 
        return res.status(409).json({json: "token not set"});

    const refreshToken = req.body.token;
    if (refreshToken == null) return res.send(401).json({message: "Unauthorized"});
    const sql = `SELECT * FROM auth a WHERE a.refresh_token = '${refreshToken}'`;
    conn.query(sql, (err, result) => {
        if (err) return res.status(500).json({ message: "Internal Server Error", ...err });
        if (result.length == 0) return res.send(403).json({message: "Forbidden"});
        
        jwt.verify(refreshToken, refreshTokenSecret, (err, user) => {
            if (err) return res.send(403).json({message: "Forbidden"});
            const accessToken = generateAccessToken(generatePayload(user));
            res.json({ accessToken: accessToken });
        });
    });
});

module.exports.authenticateToken = authenticateToken;
module.exports.path = apiPath;
module.exports.router = router;