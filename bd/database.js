/*
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('rotas', 'root', '12345678', {
  host: 'localhost',
  dialect: 'mysql',
  logging: false, // Mantém o console limpo, sem mostrar cada comando SQL executado
  pool: {
    max: 5,        // Número máximo de conexões no pool
    min: 0,        // Número mínimo de conexões
    acquire: 30000, // Tempo máximo (ms) para tentar conectar antes de dar erro
    idle: 10000    // Tempo máximo que uma conexão pode ficar ociosa
  }
});

module.exports = sequelize;

*/

const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('rotas', 'root', 'Mtc2004*', {
    host: 'localhost',
    dialect: 'mysql',
    logging: false,
    // Isso evita que o Sequelize tente testar a conexão ao ser importado
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});

module.exports = sequelize;