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
    res.render('login/login');
});

router.get('/join', isNotLoggedIn, (req, res) => {
    res.render('login/join');
});

router.get('/mypage', isLoggedIn, (req, res) => {
    res.render('login/mypage');
});

router.get('/qnalist', (req, res) => {
    res.render('board/qnalist');
});

router.get('/qnawrite', isLoggedIn, (req, res) => {
    if(!isLoggedIn) res.rendirect('login/login');
    else res.render('board/qnawrite');
});

router.get('/about/:brand', (req, res) => {
    res.render('brand/aboutsite/:brand');
});

router.get('/admin/aboutsitewrite', (req, res) => {
    res.render('brand/aboutsitewrite');
})
module.exports = router;