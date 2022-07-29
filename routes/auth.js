const express = require('express');
const router = express.Router();
const passport = require('passport');
const bcrypt = require('bcrypt');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
const User = require('../models/user');

router.post('/join', isNotLoggedIn, async(req, res, next) => {
    const { userid, password, nick, name, email1, email2, phone, gender, birth, zipcode, address, detailaddress } = req.body;
    try {
        const exUser = await User.findOne({ where: { userid }});
        if(exUser) {
            return res.redirect('/join?error=exist');
        }
        const sumemail = email1 + '@' + email2;
        const hash = await bcrypt.hash(password, 12);
        await User.create({
            userid,
            password: hash,
            nick,
            name,
            email: sumemail,
            phone,
            gender,
            birth,
            zipcode,
            address,
            detailaddress,
        });
        return res.redirect('/');
    } catch(err) {
        console.error(err);
        return next(err);
    }
});

router.post('/login', isNotLoggedIn, (req, res, next) => {
    passport.authenticate('local', (authError, user, info) => {
        if(authError) {
            console.error(authError);
            return next(authError);
        }
        if(!user) {
            return res.redirect(`/?loginError=${info.message}`);
        }
        return req.login(user, (loginError) => {
            if(loginError) {
                console.error(loginError);
                return next(loginError);
            }
            return res.redirect('/');
        });
    }) (req, res, next);
});

router.post('/logout', isLoggedIn, (req, res, next) => {
    req.logout((err) => {
        if(err) return next(err);
    });
    res.redirect('/');
});

router.post('/change', isLoggedIn, async(req, res, next) => {
    const password = req.body.password;
    try{
        const hash = await bcrypt.hash(password, 12);
        await User.update({ password: hash }, {
            where: {
                userid: req.body.id,
            }
        });
        req.logout((err) => {
            if(err) return next(err);
        });
        return res.redirect(303, '/');
    } catch(err){
        console.error(err);
        return next(err);
    }
});

router.post('/out', isLoggedIn, async(req, res, next) => {
    try{
        await User.destroy({
        where: {
            userid: req.body.id,
        }
    });
    res.redirect(303, '/');
    } catch(err) {
        console.error(err); 
        return next(err);
    }
});

router.get('/kakao', passport.authenticate('kakao'));

router.get('/kakao/callback', passport.authenticate('kakao', {
    failureRedirect: '/',
}), (req, res) => {
    res.redirect('/');
});

router.get('/naver', passport.authenticate('naver'));

router.get('/naver/callback', passport.authenticate('naver', {
    failureRedirect: '/',
}), (req, res) => {
    res.redirect('/');
});

module.exports = router;