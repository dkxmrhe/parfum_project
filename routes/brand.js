const express = require('express');
const router = express.Router();
const Brand = require('../models/brand');

router.post('/write', async(req, res) => {
    try {
        
        return res.redirect('/brandParfumWrite');
    } catch(err) {
        console.error(err);
        return next(err);
    }
});

module.exports = router;