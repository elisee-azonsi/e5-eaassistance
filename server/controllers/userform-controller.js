const connection = require('../models/config');
const express = require('express');
const authenticateToken = require('../middleware/auth-token');


const router = express.Router();

const userForm = async (req, res) => {

const { userId } = req.user;

const getUserQuery = `SELECT user_id, user_email from users 
                        where
                            user_id = ?;`;

connection.query(getUserQuery, [userId], (selectErr, result) => {
if (selectErr) {
console.error('Error getting user data:', selectErr);
return res.status(500).json({ error: 'Internal Server Error' });
}
//console.log('User registered successfully');
res.status(201).json({ result });
});


}

module.exports = {router, userForm};



