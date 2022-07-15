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

router.get('/mypage', isLoggedIn, (req, res) => {
    res.render('mypage');
});

router.get('/qnalist', (req, res) => {
    res.render('qnalist');
});

router.get('/qnawrite', isLoggedIn, (req, res) => {
    if(!isLoggedIn) res.rendirect('/login');
    else res.render('qnawrite');
});
module.exports = router;