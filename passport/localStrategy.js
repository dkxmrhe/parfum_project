const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

const User = require('../models/user');

module.exports = () => {
    passport.use(new LocalStrategy({
        usernameField: 'userid',
        passwordField: 'password',
    }, async (userid, password, done) => {
        try {
            const exUser = await User.findOne({ where: { userid }});
            if(exUser) {
                const result = await bcrypt.compare(password, exUser.password);
                if(result) {
                    done(null, exUser);
                } else {
                    done(null, false, { message: '비밀번호 불일치' });
                }
            } else {
                done(null, false, { message: '미가입 회원' });
            }
        } catch (err) {
            console.error(err);
            done(err);
        }
    }));
};
