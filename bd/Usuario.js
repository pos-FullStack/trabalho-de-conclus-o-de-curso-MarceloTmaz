const { DataTypes } = require('sequelize');
const sequelize = require('./database');
const bcrypt = require('bcrypt'); // 1. Importe o bcrypt

const Usuario = sequelize.define('tb_usuario', {
  idtb_usuario: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  email: DataTypes.STRING(45),
  senha: DataTypes.STRING(255), 
  nome: DataTypes.STRING(45),
  telefone: DataTypes.STRING(20),
  data_cadastro: {
    type: DataTypes.DATE,
  },
  reset_token: DataTypes.STRING(64),
  reset_expires: DataTypes.DATE,
  email_verificado: DataTypes.TINYINT,
  email_token: DataTypes.STRING(255),
  imagem: DataTypes.STRING(255)
}, {
  timestamps: true,
  createdAt: 'data_cadastro',
  updatedAt: false,
  freezeTableName: true,
  
  hooks: {
    beforeSave: async (usuario) => {
      if (usuario.changed('senha')) {
        const salt = await bcrypt.genSalt(10);
        usuario.senha = await bcrypt.hash(usuario.senha, salt);
      }
    }
  }
});

module.exports = Usuario;
//npm install bcrypt