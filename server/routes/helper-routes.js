const express = require('express');
const router = express.Router();
const HelperController = require('../controllers/helper-controller');


router.post('/send-email', HelperController.sendEmail);

module.exports = router;
