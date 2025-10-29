const express = require("express");
const router = express.Router();
const db = require("../db");
const bcrypt = require("bcrypt");

// GET - todos os usuários
router.get("/", (req, res) => {
  const sql = "SELECT id_usuario, nome, email, data_criacao FROM Usuario";
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ erro: "Erro ao consultar o banco" });
    res.json(results);
  });
});

// GET - usuário por ID
router.get("/:id", (req, res) => {
  const { id } = req.params;
  const sql = "SELECT id_usuario, nome, email, data_criacao FROM Usuario WHERE id_usuario = ?";
  db.query(sql, [id], (err, results) => {
    if (err) return res.status(500).json({ erro: "Erro ao consultar o banco" });
    if (results.length === 0) return res.status(404).json({ erro: "Usuário não encontrado" });
    res.json(results[0]);
  });
});

// POST - criar usuário
router.post("/", async (req, res) => {
  const { nome, email, senha } = req.body;
  if (!nome || !email || !senha) return res.status(400).json({ erro: "Campos obrigatórios" });

  try {
    const hash = await bcrypt.hash(senha, 10);
    const sql = "INSERT INTO Usuario (nome, email, senha_hash) VALUES (?, ?, ?)";
    db.query(sql, [nome, email, hash], (err, result) => {
      if (err) {
        if (err.code === "ER_DUP_ENTRY") return res.status(400).json({ erro: "Email já cadastrado" });
        return res.status(500).json({ erro: "Erro ao inserir no banco" });
      }
      res.status(201).json({ id_usuario: result.insertId, nome, email });
    });
  } catch {
    res.status(500).json({ erro: "Erro ao criar hash da senha" });
  }
});

// PUT - atualizar usuário
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { nome, email, senha } = req.body;

  let sql, params;
  if (senha) {
    const hash = await bcrypt.hash(senha, 10);
    sql = "UPDATE Usuario SET nome = ?, email = ?, senha_hash = ? WHERE id_usuario = ?";
    params = [nome, email, hash, id];
  } else {
    sql = "UPDATE Usuario SET nome = ?, email = ? WHERE id_usuario = ?";
    params = [nome, email, id];
  }

  db.query(sql, params, (err, result) => {
    if (err) return res.status(500).json({ erro: "Erro ao atualizar usuário" });
    if (result.affectedRows === 0) return res.status(404).json({ erro: "Usuário não encontrado" });
    res.json({ mensagem: "Usuário atualizado com sucesso" });
  });
});

// DELETE - remover usuário
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM Usuario WHERE id_usuario = ?";
  db.query(sql, [id], (err, result) => {
    if (err) return res.status(500).json({ erro: "Erro ao deletar usuário" });
    if (result.affectedRows === 0) return res.status(404).json({ erro: "Usuário não encontrado" });
    res.json({ mensagem: "Usuário deletado com sucesso" });
  });
});

module.exports = router;
