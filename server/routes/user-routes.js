const express = require('express');
const router = express.Router();
const userController = require('../controllers/user-controller');
const authenticateToken = require('../middleware/auth-token');

//  user routes 
router.post('/register', userController.register);

router.post('/login',userController.login);


module.exports = router;