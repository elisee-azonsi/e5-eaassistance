const express = require('express');
const router = express.Router();
const userRoutes = require('./user-routes');
const useText = require('./text-routes');
const useForm = require('./userform-routes');
const useEmail = require('./helper-routes');
//const useProfile = require('./profile-route');


// put all routes here
router.use('/user', userRoutes);
router.use('/text', useText);
router.use('/hform', useForm);
router.use('/helper', useEmail);
//router.use('/profile', useProfile);


module.exports = router;