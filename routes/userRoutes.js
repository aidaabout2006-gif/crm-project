const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// نمایش فرم‌ها
router.get('/register', (req, res) => {
    res.render('user/register');
});

router.get('/login', (req, res) => {
    res.render('user/login');
});

router.get('/forgetpassword', (req, res) => {
    res.render('user/forgetpassword');
});

// عملیات فرم‌ها
router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);
router.post('/forgetpassword ' , userController.forgetPassword); 



module.exports = router;
