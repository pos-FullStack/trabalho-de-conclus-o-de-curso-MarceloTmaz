//npm install mysql2
/*
const mysql = require("mysql2/promise");

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "12345678",
  database: "rotas"
});

(async () => {
  try {
    const conn = await db.getConnection();
    console.log("Conectado ao MySQL!");
    conn.release();
  } catch (err) {
    console.error("Erro ao conectar:", err);
  }
})();

module.exports = db;

*/


const mysql = require("mysql2/promise");

// Criamos uma função para inicializar o banco antes de qualquer outra coisa
async function ensureDatabaseExists() {
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'Mtc2004*'
    });
    await connection.query('CREATE DATABASE IF NOT EXISTS `rotas`;');
    await connection.end();
}

// O Pool só deve ser exportado/utilizado após o banco existir
const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "Mtc2004*",
    database: "rotas",
    waitForConnections: true,
    connectionLimit: 10
});

module.exports = { db, ensureDatabaseExists };