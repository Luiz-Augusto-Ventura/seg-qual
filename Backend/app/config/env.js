const env = {//responsável pela conexão com o banco de dados Mysql
    database: 'seg_qual',
    username: 'luiz',
    password: '12345678',
    host: 'localhost',
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
  };
   
  module.exports = env;
  