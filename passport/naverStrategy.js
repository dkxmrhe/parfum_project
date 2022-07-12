const passport = require('passport');
const NaverStrategy = require('passport-naver').Strategy;

const User = require('../models/user');

module.exports = () => {
    passport.use(new NaverStrategy({
        clientID: process.env.NAVER_ID,
        clientSecret: process.env.NAVER_SECRET,
        callbackURL: '/auth/naver/callback',
    }, async(accessToken, refreshToekn, profile, done) => {
        try {
            const exUser = await User.findOne({
                where: { userid: profile.id, provider: 'naver' },
            });
            if(exUser) {
                done(null, exUser);
            } else {
                const newUser = await User.create({
                    userid: profile.id,
                    name: profile.name,
                    email: profile.email,
                    gender: profile.gender,
                    nick: profile.displayName,
                    provider: 'naver',
                    naver: profile._json,
                });
                done(null, newUser);
            }
        } catch(err) {
            console.error(err);
            done(err);
        }
    }));
}        