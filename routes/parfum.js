const express = require('express');
const multer = require('multer');
const sequelize = require('sequelize');
const path = require('path');
const fs = require('fs');
const AWS = require('aws-sdk');
const multerS3 = require('multer-s3');
const Parfum = require('../models/parfum');
const Op = sequelize.Op;

const router = express.Router();

try {
    fs.readdirSync('uploads');
} catch (err) {
    console.error('uploads 폴더가 없어 uploads 폴더를 생성합니다.');
    fs.mkdirSync('uploads');
}

AWS.config.update({
    accessKeyId: process.env.S3_ACCESS_KEY_ID,
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
    region: 'ap-northeast-2',
});

let storage = multer({
    storage:multerS3({
        s3: new AWS.S3(),
        bucket: 'parfumlibrary',
        key(req, file, cb) {
            cb(null, `uploads/${file.originalname}`);
        },
    }),
    limits: { fileSize: 5 * 1024 * 1024 },
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