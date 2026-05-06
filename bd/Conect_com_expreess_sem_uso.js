const mysql = require("mysql2");
//npm install express mysql2 body-parser

// Configuração da conexão
const db = mysql.createConnection({
  host: "localhost",
  user: "root",      // coloque seu usuário do MySQL
  password: "12345678",      // coloque sua senha
  database: "rotas"
});

// Conectar ao banco
db.connect((err) => {
  if (err) {
    console.error("Erro ao conectar ao MySQL:", err);
    return;
  }
  console.log("Conectado ao MySQL!");
});

module.exports = db;
