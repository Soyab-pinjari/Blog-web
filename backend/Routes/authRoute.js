// POST /auth/register
// POST /auth/login
// POST /auth/logout
// POST /auth/forgot-password
// POST /auth/reset-password
// PUT  /auth/change-password

const express = require('express');
const {registration, login }= require('../Controller/authController');
const router = express.Router();


router.post('/register',registration);
router.post('/login',login);


module.exports = router;