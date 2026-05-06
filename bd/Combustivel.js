const { DataTypes } = require('sequelize');
const sequelize = require('./database');
const Precombutivel = require('./Precombustivel'); // Importe o outro modelo

const Combutivel = sequelize.define('tb_combutivel', {
  idtb_combustivel: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  preco: DataTypes.FLOAT,
  consumo_km: DataTypes.FLOAT,
  e_primario: DataTypes.INTEGER,
  idtb_veiculo: DataTypes.INTEGER,
  // Definindo a coluna que receberá a FK
  tipo_combustivel: {
    type: DataTypes.STRING(45),
    references: {
      model: Precombutivel,
      key: 'nome'
    }
  }
}, {
  timestamps: false,
  freezeTableName: true
});

// Definindo a relação formalmente
Combutivel.belongsTo(Precombutivel, { foreignKey: 'tipo_combustivel', targetKey: 'nome' });

module.exports = Combutivel;