const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Parfum = require('../models/parfum');
const Brand = require('../models/brand');

router.post('/write', async(req, res) => {
    const { brandname, name } = req.body;
    try {
        const exName = await Parfum.findOne({
            where: { name }
        });
        if(exName) {
            return res.redirect('/write?error=exist');
        }
        await Parfum.create({
            brandname,
            name,
        });
        return res.redirect('/brandParfumWrite');
    } catch(err) {
        console.error(err);
        return next(err);
    }
});

module.exports = router;