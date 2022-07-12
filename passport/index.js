const passport = require('passport');
const local = require('./localStrategy');
const kakao = require('./kakaoStrategy');
const naver = require('./naverStrategy');

const User = require('../models/user');

module.exports = () => {
    passport.serializeUser((user, done) => {
        done(null, user.userid);
    });
    
    passport.deserializeUser((userid, done) => {
        User.findOne({ where: { userid } })
            .then(user => done(null, user))
            .catch(err => done(err));
    });

    local();
    kakao();
    naver();
}