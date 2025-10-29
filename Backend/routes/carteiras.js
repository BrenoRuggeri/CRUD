const express = require("express");
const router = express.Router();
const db = require("../db");

// GET - todas as carteiras
router.get("/", (req, res) => {
  const sql = `
    SELECT c.id_carteira, c.id_usuario, u.nome AS nome_usuario, c.nome, c.descricao, c.data_criacao
    FROM Carteira c
    JOIN Usuario u ON c.id_usuario = u.id_usuario
  `;
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ erro: "Erro ao consultar carteiras" });
    res.json(results);
  });
});

// GET - carteira por ID
router.get("/:id", (req, res) => {
  const { id } = req.params;
  const sql = `
    SELECT c.id_carteira, c.id_usuario, u.nome AS nome_usuario, c.nome, c.descricao, c.data_criacao
    FROM Carteira c
    JOIN Usuario u ON c.id_usuario = u.id_usuario
    WHERE c.id_carteira = ?
  `;
  db.query(sql, [id], (err, results) => {
    if (err) return res.status(500).json({ erro: "Erro ao consultar carteira" });
    if (results.length === 0) return res.status(404).json({ erro: "Carteira não encontrada" });
    res.json(results[0]);
  });
});

// POST - criar nova carteira
router.post("/", (req, res) => {
  const { id_usuario, nome, descricao } = req.body;
  if (!id_usuario || !nome) return res.status(400).json({ erro: "id_usuario e nome são obrigatórios" });

  const sql = "INSERT INTO Carteira (id_usuario, nome, descricao) VALUES (?, ?, ?)";
  db.query(sql, [id_usuario, nome, descricao || null], (err, result) => {
    if (err) return res.status(500).json({ erro: "Erro ao criar carteira" });
    res.status(201).json({ id_carteira: result.insertId, id_usuario, nome, descricao });
  });
});

// PUT - atualizar carteira
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { nome, descricao } = req.body;

  const sql = "UPDATE Carteira SET nome = ?, descricao = ? WHERE id_carteira = ?";
  db.query(sql, [nome, descricao, id], (err, result) => {
    if (err) return res.status(500).json({ erro: "Erro ao atualizar carteira" });
    if (result.affectedRows === 0) return res.status(404).json({ erro: "Carteira não encontrada" });
    res.json({ mensagem: "Carteira atualizada com sucesso" });
  });
});

// DELETE - excluir carteira
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM Carteira WHERE id_carteira = ?";
  db.query(sql, [id], (err, result) => {
    if (err) return res.status(500).json({ erro: "Erro ao deletar carteira" });
    if (result.affectedRows === 0) return res.status(404).json({ erro: "Carteira não encontrada" });
    res.json({ mensagem: "Carteira deletada com sucesso" });
  });
});

module.exports = router;
