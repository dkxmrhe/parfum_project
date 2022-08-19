const express = require('express');
const multer = require('multer');
const sequelize = require('sequelize');
const path = require('path');
const fs = require('fs');
const Parfum = require('../models/parfum');
const Op = sequelize.Op;

const router = express.Router();

try {
    fs.readdirSync('uploads');
} catch (err) {
    console.error('uploads 폴더가 없어 uploads 폴더를 생성합니다.');
    fs.mkdirSync('uploads');
}
let storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, 'uploads/');
    },
    filename(req, file, cb) {
        cb(null, file.originalname);
    }
});

let upload = multer({storage: storage});

router.post('/write', upload.single('photo'), async(req, res, next) => {
    try{
            await Parfum.create({
                brandname: req.body.brandname,
                name: req.body.name,
                photo: req.file.filename,
                component: req.body.component,
            });
            res.redirect('/parfumWrite');
    } catch(err) {
        console.error(err);
        next(err);
    }
});

router.get('/search', async(req, res, next) => {
    let search = req.query.search;
    try {
        let parfums = await Parfum.findAll({
            where: {
                    [Op.or]: [
                        {name: {[Op.like]: `%${search}%`}},
                        {brandname: {[Op.like]: `%${search}%`}},
                    ],
            }
        });
        res.render('parfum/parfumList', {parfums: parfums});
    } catch(err) {
        console.error(err);
        next(err);
    }
});
module.exports = router;