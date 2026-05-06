const {db} = require("../bd/db_config");

const viagem = {
  create: async (origem, distancia,otimizacao, id) => {
    const [result] = await db.query(
      "INSERT INTO tb_viagem (origem,distancia,otimizacao,idtb_usuario) VALUES (?, ?, ?, ?)",
      [origem, distancia,otimizacao , id]
    );
    return result;
  },

  findOne: async (id) => {
    const [rows] = await db.query(
      "SELECT * FROM tb_viagem WHERE idtb_viagem = ?",
      [id]
    );
    return rows;
  },

  findCount:async(id)=>{
    const[rows ]=await db.query(
      "SELECT COUNT(*) FROM tb_viagem WHERE idtb_usuario =?",
      [id]
    );
    
    return rows;
  },
  /*
  findUser: async (id) => {
    const [rows] = await db.query(
      "SELECT * FROM tb_viagem WHERE idtb_usuario = ?",
      [id]
    );
    return rows;
    
  },
  */
 findUser: async (id) => {
    const [rows] = await db.query(
      "SELECT * FROM tb_viagem WHERE idtb_usuario = ? ORDER BY data DESC  LIMIT 20",
      [id]
    );
    return rows;
  }

};

module.exports = viagem;
