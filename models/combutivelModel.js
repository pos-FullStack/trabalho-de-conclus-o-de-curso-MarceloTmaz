const {db} = require("../bd/db_config");

const combutivel = {
  create: async ( preco, Consumo_km, tipo_combutivel, eh_primario, idtb_veiculo) => {
    const [result] = await db.query(
      "INSERT INTO tb_combutivel (preco,consumo_km,tipo_combustivel,e_primario,idtb_veiculo) VALUES (?, ?, ?,?,?)",
      [ preco, Consumo_km, tipo_combutivel, eh_primario, idtb_veiculo]
    );
    return result;
  },

  findCar: async (id) => {
    const [rows] = await db.query(
      "SELECT * FROM tb_combutivel WHERE idtb_veiculo = ?",
      [id]
    );
    return rows;
  },

  findOne: async (id) => {
    const [rows] = await db.query(
      "SELECT * FROM tb_veiculo WHERE idtb_combutivel = ?",
      [id]
    );
    return rows;
  },

  update: async (preco, Consumo_km, tipo_combutivel,eh_primario,idtb_combutivel) => {
    const [result] = await db.query(
      "UPDATE tb_combutivel SET preco = ?, consumo_km = ?,tipo_combustivel = ?, e_primario = ?  WHERE idtb_combustivel = ?",
      [preco, Consumo_km, tipo_combutivel,eh_primario,idtb_combutivel]
    );
    return result;
  },

  delete: async (id) => {
    const [result] = await db.query(
      "DELETE FROM tb_combutivel WHERE idtb_combustivel = ?",
      [id]
    );
    return result;
  }
};

module.exports = combutivel;
