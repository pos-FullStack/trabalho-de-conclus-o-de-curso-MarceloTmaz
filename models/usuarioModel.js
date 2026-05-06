const {db}= require("../bd/db_config");

const Usuario = {
  create: async (nome, email, senha, telefone) => {
    const [result] = await db.query(
      "INSERT INTO tb_usuario (email, senha, nome, telefone) VALUES (?, ?, ?, ?)",
      [email, senha, nome, telefone]
    );
    return result;
  },
  createPhoto: async (nome, email, senha, telefone, foto) => {
    const [result] = await db.query(
      "INSERT INTO tb_usuario (email, senha, nome, telefone ,imagem) VALUES (?, ?, ?, ?, ?)",
      [email, senha, nome, telefone,foto]
    );
    return result;
  },

  findOne: async (email, senha) => {
    const [rows] = await db.query(
      "SELECT * FROM tb_usuario WHERE email = ? AND senha = ?",
      [email, senha]
    );
    return rows[0]; // já retorna só 1 usuário
  },

  update: async (id, senha, nome, telefone) => {
    const [result] = await db.query(
      "UPDATE tb_usuario SET senha = ?, nome = ?, telefone = ? WHERE idtb_usuario = ?",
      [senha, nome, telefone, id]
    );
    return result;
  },
  updateSemSenha: async (id, nome, telefone) => {
    const [result] = await db.query(
      "UPDATE tb_usuario SET nome = ?, telefone = ? WHERE idtb_usuario = ?",
      [nome, telefone, id]
    );
    return result;
  },

   updateFoto: async (id, senha, nome, telefone,foto) => {
    const [result] = await db.query(
      "UPDATE tb_usuario SET senha = ?, nome = ?, telefone = ?, imagem =?  WHERE idtb_usuario = ?",
      [senha, nome, telefone,foto, id]
    );
    return result;
  },
  updateFotoSemSenha: async (id, nome, telefone,foto) => {
    const [result] = await db.query(
      "UPDATE tb_usuario SET , nome = ?, telefone = ?, imagem =?  WHERE idtb_usuario = ?",
      [nome, telefone,foto, id]
    );
    return result;
  },
  updateSenha: async (email, senha) => {
    const [result] = await db.query(
      "UPDATE tb_usuario SET senha = ? WHERE email = ?",
      [senha , email]
    );
    return result;
  },
  delete: async (id) => {
    const [result] = await db.query(
      "DELETE FROM tb_usuario WHERE idtb_usuario = ?",
      [id]
    );
    return result;
  }
};

module.exports = Usuario;
