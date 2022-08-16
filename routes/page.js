const express = require('express');
const { isNotLoggedIn, isLoggedIn } = require('./middlewares');
const router = express.Router();
const Board = require('../models/board');
const Parfum = require('../models/parfum');
const Post = require('../models/post');
const sequelize = require('sequelize');
const { User } = require('../models');

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

router.get('/boardList', async(req, res) => {
    let boards = await Board.findAll({
        attributes: ['id', 'subject', 'author', [sequelize.fn("DATE_FORMAT", sequelize.col('created_At'),"%Y-%m-%d %H:%i:%s"), 'createdAt',], 'watch'],
        order: [['created_At', 'DESC']]
    });
    res.render('board/boardList', {boards: boards});
});

router.get('/boardWrite', isLoggedIn, (req, res) => {
    if(!isLoggedIn) res.rendirect('login/login');
    else res.render('board/boardWrite');
});

router.get('/boardRead', async(req, res) => {
    let id = req.query.id;
    let board = await Board.findAll({ where: {id : id}});
    let updwatch = await Board.increment({watch: 1}, {where: {id: id}})
                            .then((result) => {
                                console.log('watch up!');
                            }).catch((err) => {
                                console.error(err);
                            });
    res.render('board/boardRead', {board: board[0]}, updwatch);
});

router.get('/boardUpdate', isLoggedIn, async(req, res) => {
    let id = req.query.id;
    let board = await Board.findAll({where: {id: id}});
    res.render('board/boardUpdate', {board: board[0]});
});

router.get('/parfumRead', async(req, res) => {
    let brandname = req.query.brandname;
    let name = req.query.name;
    let parfumno = req.query.no;
    try {
        let parfums = await Parfum.findAll({
            where: {id: parfumno}
        });
        let posts = await Post.findAll({
            where: {parfum_id: parfumno},
            order: [['createdAt', 'ASC']]
        });
        res.render('parfum/parfumRead', {parfums: parfums[0], posts: posts});
    } catch(err) {
        console.error(err);
    }
});
router.get('/parfumSearch', async(req,res) => {
    let parfums = await Parfum.findAll({
        attributes: ['id','brandname','name','photo']
    });
    res.render('parfum/parfumList', {parfums: parfums});
});
router.get('/ParfumWrite', isLoggedIn, (req, res) => {
    res.render('parfum/parfumWrite');
});
module.exports = router;