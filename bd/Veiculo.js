const { DataTypes } = require('sequelize');
const sequelize = require('./database');

const Veiculo = sequelize.define('tb_veiculo', {
  idtb_veiculo: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  modelo: DataTypes.STRING(45),
  placa: DataTypes.STRING(10),
  primario: DataTypes.INTEGER,
  idtb_usuario: DataTypes.INTEGER
}, {
  timestamps: false,
  freezeTableName: true
});

module.exports = Veiculo;
