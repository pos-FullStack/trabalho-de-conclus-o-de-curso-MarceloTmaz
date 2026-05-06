const Usuario = require('./Usuario');
const Veiculo = require('./Veiculo');
const Combustivel = require('./Combustivel');
const Viagem = require('./Viagem');
const Rota = require('./Rota');
const Precombustivel=require('./Precombustivel')
// Usuario → Veiculo
Usuario.hasMany(Veiculo, { foreignKey: 'idtb_usuario' });
Veiculo.belongsTo(Usuario, { foreignKey: 'idtb_usuario' });

// Veiculo → Combustivel
// 1. Veículo x Combustível (A que você pediu)
Veiculo.hasMany(Combustivel, { 
  foreignKey: 'idtb_veiculo', 
  onDelete: 'CASCADE', 
  hooks: true 
});
Combustivel.belongsTo(Veiculo, { foreignKey: 'idtb_veiculo' });

// Usuario → Viagem
Usuario.hasMany(Viagem, { foreignKey: 'idtb_usuario' });
Viagem.belongsTo(Usuario, { foreignKey: 'idtb_usuario' });

// Viagem → Rota
Viagem.hasMany(Rota, { foreignKey: 'idtb_viagem' });
Rota.belongsTo(Viagem, { foreignKey: 'idtb_viagem' });

module.exports = {
  Usuario,
  Veiculo,
  Combustivel,
  Viagem,
  Rota,
  Precombustivel  
};
