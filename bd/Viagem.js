const { DataTypes } = require('sequelize');
const sequelize = require('./database');

const Viagem = sequelize.define('tb_viagem', {
  idtb_viagem: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  // Se você quer que 'data' seja preenchido automaticamente pelo Sequelize:
  data: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW // Preenche com a data/hora atual no INSERT
  },
  origem: DataTypes.STRING(255),
  distancia: DataTypes.FLOAT,
  otimizacao: DataTypes.INTEGER,
  idtb_usuario: DataTypes.INTEGER
}, {
  // Se o seu banco já tem colunas automáticas (ex: data_cadastro), use isso:
  timestamps: true,
  createdAt: 'data_cadastro', 
  updatedAt: false,
  freezeTableName: true
});

module.exports = Viagem;