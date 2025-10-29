// Importação das bibliotecas necessárias
const express = require("express");
const cors = require("cors");

// Biblioteca para criptografia de senhas
const bcrypt = require("bcrypt");

// Importação da conexão com o banco de dados
const db = require("./db");

// Criação do servidor Express
const app = express();

// Definição da porta do servidor
const port = 3000;

// Configurações do Express
app.use(express.json());

// Configuração do CORS
app.use(cors());

// Servir arquivos estáticos do front-end
const path = require("path");
app.use(express.static(path.join(__dirname, "../Frontend")));

// Rota principal (index.html)
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../Frontend", "index.html"));
});

// Rota para a página de registro
app.get("/registro", (req, res) => {
  res.sendFile(path.join(__dirname, "../Frontend", "registro.html"));
});

// Rota para a página de ações
app.get("/acoes", (req, res) => {
  res.sendFile(path.join(__dirname, "../Frontend", "acoes.html"));
});

// Rota para a página de carteira
app.get("/carteira", (req, res) => {
  res.sendFile(path.join(__dirname, "../Frontend", "carteira.html"));
});

// Importação das rotas da API
const usuariosRoutes = require("./routes/usuarios");
const carteirasRoutes = require("./routes/carteiras");
const acoesRoutes = require("./routes/acoes");

// Registro das rotas no servidor
app.use("/api/usuarios", usuariosRoutes);
app.use("/api/carteiras", carteirasRoutes);
app.use("/api/acoes", acoesRoutes);


// Iniciar o servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
