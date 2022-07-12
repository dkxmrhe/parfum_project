const express = require('express');
const { isNotLoggedIn, isLoggedIn } = require('./middlewares');
const router = express.Router();

router.use((req, res, next) => {
    res.locals.user = req.user;
    next();
});

router.get('/', (req, res) => {
    res.render('main');
});

router.get('/login', isNotLoggedIn, (req, res) => {
    res.render('login');
});

router.get('/join', isNotLoggedIn, (req, res) => {
    res.render('join');
});

module.exports = router;