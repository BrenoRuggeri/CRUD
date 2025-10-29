const express = require("express");
const router = express.Router();
const db = require("../db");

// ===============================
// GET - todas as ações
// ===============================
router.get("/", (req, res) => {
  const sql = "SELECT * FROM Acao";
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ erro: "Erro ao consultar ações" });
    res.json(results);
  });
});

// ===============================
// GET - ação por código
// ===============================
router.get("/:codigo", (req, res) => {
  const { codigo } = req.params;
  const sql = "SELECT * FROM Acao WHERE codigo = ?";
  db.query(sql, [codigo], (err, results) => {
    if (err) return res.status(500).json({ erro: "Erro ao consultar ação" });
    if (results.length === 0) return res.status(404).json({ erro: "Ação não encontrada" });
    res.json(results[0]);
  });
});

// ===============================
// POST - criar nova ação
// ===============================
router.post("/", (req, res) => {
  const { codigo, nome, setor, preco_atual } = req.body;

  if (!codigo || !nome)
    return res.status(400).json({ erro: "Código e nome da empresa são obrigatórios." });

  const sql = "INSERT INTO Acao (codigo, nome, setor, preco_atual) VALUES (?, ?, ?, ?)";
  db.query(sql, [codigo, nome, setor || null, preco_atual || 0], (err, result) => {
    if (err) {
      if (err.code === "ER_DUP_ENTRY")
        return res.status(400).json({ erro: "Código da ação já existe." });
      return res.status(500).json({ erro: "Erro ao criar ação." });
    }

    res.status(201).json({
      id_acao: result.insertId,
      codigo,
      nome,
      setor,
      preco_atual
    });
  });
});

// ===============================
// PUT - atualizar ação por código
// ===============================
router.put("/:codigo", (req, res) => {
  const { codigo } = req.params;
  const { nome_empresa, setor, preco } = req.body;

  const sql = "UPDATE Acao SET nome = ?, setor = ?, preco_atual = ? WHERE codigo = ?";
  db.query(sql, [nome_empresa, setor, preco, codigo], (err, result) => {
    if (err) return res.status(500).json({ erro: "Erro ao atualizar ação." });
    if (result.affectedRows === 0)
      return res.status(404).json({ erro: "Ação não encontrada." });
    res.json({ mensagem: "Ação atualizada com sucesso." });
  });
});

// ===============================
// DELETE - excluir ação por ID
// ===============================
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM Acao WHERE id_acao = ?";
  db.query(sql, [id], (err, result) => {
    if (err) return res.status(500).json({ erro: "Erro ao deletar ação." });
    if (result.affectedRows === 0)
      return res.status(404).json({ erro: "Ação não encontrada." });
    res.json({ mensagem: "Ação deletada com sucesso." });
  });
});

module.exports = router;