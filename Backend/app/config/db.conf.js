const env = require('./env');

const Sequelize = require('sequelize');
const sequelize = new Sequelize(env.database, env.username, env.password, {
    host: env.host,
    dialect: env.dialect,
    dialectOptions: {
        multipleStatements: true
    },
    operatorsAliases: false, 
    pool: {
      max: env.pool.max,
      min: env.pool.min,
      acquire: env.pool.acquire,
      idle: env.pool.idle
    }
});

const db = {};//declaração do simulador do banco de dados
 
db.Sequelize = Sequelize;//injeta no objeto db a biblioteca sequelize
db.sequelize = sequelize;//injeta no objeto db a conexão do banco Mysql vinda do env.js

db.Pessoa = require('../models/Pessoa')(sequelize, Sequelize);
db.Conta = require('../models/Conta')(sequelize, Sequelize);

module.exports = db;