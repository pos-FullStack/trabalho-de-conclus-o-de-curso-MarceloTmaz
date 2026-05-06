const {db} = require("../bd/db_config");

const veiculo = {
  create: async (modelo, placa,primario, id) => {
    const [result] = await db.query(
      "INSERT INTO tb_veiculo (modelo,placa,primario,idtb_usuario) VALUES (?, ?, ?, ?)",
      [modelo, placa, primario, id]
    );
    return result;
  },

  findCreate: async (modelo, placa, id) => {
    const [rows] = await db.query(
      "SELECT * FROM tb_veiculo WHERE idtb_usuario = ? AND modelo = ? AND placa = ?",
      [id, modelo, placa]
    );
    return rows;
  },

  findOne: async (id) => {
    const [rows] = await db.query(
      "SELECT * FROM tb_veiculo WHERE idtb_veiculo = ?",
      [id]
    );
    return rows;
  },
  
  findUser: async (id) => {
    const [rows] = await db.query(
      "SELECT * FROM tb_veiculo WHERE idtb_usuario = ?",
      [id]
    );
    return rows;
  },

  update: async (id, modelo,placa , ) => {
    const [result] = await db.query(
      "UPDATE tb_veiculo SET modelo = ?, placa = ?  WHERE idtb_veiculo = ?",
      [modelo, placa, id]
    );
    return result;
  },

  resetPrimarios: async (idUsuario) => {
    const [result] = await db.query(
      "UPDATE tb_veiculo SET primario = 0 WHERE idtb_usuario = ?",
      [idUsuario]
    );
    return result;
  },

    updatePrimario: async (id) => {
    const [result] = await db.query(
      "UPDATE tb_veiculo SET primario=1  WHERE idtb_veiculo = ?",
      [id]
    );
    return result;
  },

  delete: async (id) => {
    const [result] = await db.query(
      "DELETE FROM tb_veiculo WHERE idtb_veiculo = ?",
      [id]
    );
    return result;
  }
};

module.exports = veiculo;
