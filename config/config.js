require('dotenv').config();

module.exports = {
    development: {
      username: 'root',
      password: process.env.SEQUELIZE_PASSWORD,
      database: "parfum_database",
      host: "127.0.0.1",
      dialect: "mysql",
      timezone: "Asia/Seoul"
    },
    test: {
      username: "root",
      password: process.env.SEQUELIZE_PASSWORD,
      database: "parfum_database_test",
      host: "127.0.0.1",
      dialect: "mysql",
      timezone: "Asia/Seoul"
    },
    production: {
      username: "root",
      password: process.env.SEQUELIZE_PASSWORD,
      database: "database_production",
      host: "127.0.0.1",
      dialect: "mysql",
      logging: false,
      timezone: "Asia/Seoul"
    }
}