const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "127.0.0.1",
  user: "breno",
  password: "breno123",
  database: "projeto_carioca",
  port: 3306
});

connection.connect((err) => {
  if (err) {
    console.error("Erro ao conectar ao MySQL:", err);
  } else {
    console.log("Conectado ao banco de dados MySQL!");
  }
});

module.exports = connection;
