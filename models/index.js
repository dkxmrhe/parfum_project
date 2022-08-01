const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const User = require('./user');
const Board = require('./board');
const Brand = require('./brand');
const Parfum = require('./parfum');

const db = {};
const sequelize = new Sequelize(
  config.database, config.username, config.password, config,
);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.User = User;
db.Board = Board;
db.Brand = Brand;
db.Parfum = Parfum;

User.init(sequelize);
Board.init(sequelize);
Brand.init(sequelize);
Parfum.init(sequelize);

User.associate(db);
Board.associate(db);
Brand.associate(db);
Parfum.associate(db);

module.exports = db;
