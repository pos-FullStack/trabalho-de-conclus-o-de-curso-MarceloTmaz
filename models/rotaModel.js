const {db} = require("../bd/db_config");

const rota = {
  create: async (endereco, id) => {
    const [result] = await db.query(
      "INSERT INTO tb_rota (endereco, idtb_viagem) VALUES (?, ?)",
      [endereco, id]
    );
    return result;
  },

  find: async (id) => {
    const [rows] = await db.query(
      "SELECT * FROM tb_rota WHERE idtb_viagem = ?",
      [id]
    );
    return rows;
  },
  
  findUser: async (id) => {
    const [rows] = await db.query(
      "SELECT * FROM tb_rota WHERE idtb_usuario = ?",
      [id]
    );
    return rows;
  },

};

module.exports = rota;
