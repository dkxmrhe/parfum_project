const express = require('express');
const router = express.Router();
const { isLoggedIn } = require('./middlewares');
const Parfum = require('../models/parfum');
const Post = require('../models/post');

router.post('/comment', isLoggedIn, async(req, res, next) => {
    const {content, usernick, parfumno } = req.body;
    console.log(req.body.parfumbrandname);
    try {
        await Post.create({
            user_nick: usernick,
            parfum_id: parfumno,
            content,
        });
        return res.send(`<script>window.location.href="/parfumRead?no=${parfumno}"</script>`);
    } catch (err) {
        console.error(err);
        return next(err);
    }
});

module.exports = router;