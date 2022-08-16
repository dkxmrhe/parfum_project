const express = require('express');
const router = express.Router();
const Brand = require('../models/brand');

router.post('/brandCreate', async(req, res) => {
    let name = req.body.name;
    let country = req.body.country;
    try {
        let exBrand = await Brand.findOne({where: {name}});
        if(!exBrand){
            await Brand.create({
                name,
                country,
            });    
        }
        return res.redirect('/parfumWrite');
    } catch(err) {
        console.error(err);
        return next(err);
    }
});

module.exports = router;