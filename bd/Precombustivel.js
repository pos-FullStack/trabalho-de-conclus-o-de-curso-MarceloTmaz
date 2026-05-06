const { DataTypes } = require('sequelize');
const sequelize = require('./database');

const Precombutivel = sequelize.define('Precombutivel', {
  nome: {
    type: DataTypes.STRING(45),
    primaryKey: true,
  },
}, {
  tableName: 'tipo_combustivel', // Nome real da tabela no banco
  timestamps: false,
  freezeTableName: true
});

module.exports = Precombutivel;
