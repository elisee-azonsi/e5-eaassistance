const express = require('express');
const router = express.Router();
const TextController = require('../controllers/form-controller');
const authenticateToken = require('../middleware/auth-token');

//  add text routes 
router.post('/add',authenticateToken, TextController.addText);

//  update text routes 
router.post('/update',authenticateToken, TextController.updateText);

//  delete text routes 
router.post('/delete',authenticateToken, TextController.deleteText);

// get texts routes
router.get('/getNotes', TextController.getNotes);




module.exports = router;