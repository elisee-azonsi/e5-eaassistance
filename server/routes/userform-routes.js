const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userform-controller');
const authenticateToken = require('../middleware/auth-token');



router.get('/user-hform',authenticateToken , UserController.userForm);


module.exports = router;