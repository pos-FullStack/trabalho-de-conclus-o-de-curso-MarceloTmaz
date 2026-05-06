const { DataTypes } = require('sequelize');
const sequelize = require('./database');

const Rota = sequelize.define('tb_rota', {
  idtb_rota: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  endereco: DataTypes.STRING(255),
  idtb_viagem: DataTypes.INTEGER
}, {
  timestamps: false,
  freezeTableName: true
});

module.exports = Rota;
