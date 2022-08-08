const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const Parfum = require('../models/parfum');

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
        res.redirect('/brandParfumWrite');
    } catch(err) {
        console.error(err);
        next(err);
    }
});

module.exports = router;