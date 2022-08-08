const express = require('express');
const { isNotLoggedIn, isLoggedIn } = require('./middlewares');
const router = express.Router();
const Board = require('../models/board');
const Parfum = require('../models/parfum');
const sequelize = require('sequelize');

router.use((req, res, next) => {
    res.locals.user = req.user;
    next();
});

router.get('/', (req, res) => {
    res.render('main');
});

router.get('/login', isNotLoggedIn, (req, res) => {
    res.render('login/login');
});

router.get('/join', isNotLoggedIn, (req, res) => {
    res.render('login/join');
});

router.get('/mypage', isLoggedIn, (req, res) => {
    res.render('login/mypage');
});

router.get('/qnalist', async(req, res) => {
    let boards = await Board.findAll({
        attributes: ['id', 'subject', 'author', [sequelize.fn("DATE_FORMAT", sequelize.col('created_At'),"%Y-%m-%d %H:%i:%s"), 'createdAt',], 'watch'],
        order: [['created_At', 'DESC']]
    });
    res.render('board/qnalist', {boards: boards});
});

router.get('/qnawrite', isLoggedIn, (req, res) => {
    if(!isLoggedIn) res.rendirect('login/login');
    else res.render('board/qnawrite');
});

router.get('/qnaread', async(req, res) => {
    let id = req.query.id;
    let board = await Board.findAll({ where: {id : id}});
    let updwatch = await Board.increment({watch: 1}, {where: {id: id}})
                            .then((result) => {
                                console.log('watch up!');
                            })
                            .catch((err) => {
                                console.error(err);
                            });
    res.render('board/qnaread', {board: board[0]}, updwatch);
});

router.get('/qnaupdate', isLoggedIn, async(req, res) => {
    let id = req.query.id;
    let board = await Board.findAll({where: {id: id}});
    res.render('board/qnaupdate', {board: board[0]});
});

router.get('/parfumread', async(req, res) => {
    let brandname = req.query.brandname;
    let name = req.query.name;
    let parfum = await Parfum.findAll({ where: {brandname: brandname, name: name}});
    res.render('brand/brandparfumRead', {parfum: parfum[0]});
});
router.get('/parfumsearch', async(req,res) => {
    let parfums = await Parfum.findAll({
        attributes: ['id','brandname','name','photo']
    });
    res.render('brand/brandParfumList', {parfums: parfums});
})
router.get('/brandParfumWrite', isLoggedIn, (req, res) => {
    res.render('brand/brandParfumWrite');
});
module.exports = router;