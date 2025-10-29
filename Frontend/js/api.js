const BASE_URL = "http://localhost:3000";

// ===================== USUÁRIOS =====================

export async function getUsuarios() {
  const res = await fetch(`${BASE_URL}/usuarios`);
  return res.json();
}

export async function getUsuarioById(id) {
  const res = await fetch(`${BASE_URL}/usuarios/${id}`);
  return res.json();
}

export async function criarUsuario(usuario) {
  const res = await fetch(`${BASE_URL}/usuarios`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(usuario)
  });
  return res.json();
}

export async function atualizarUsuario(id, usuario) {
  const res = await fetch(`${BASE_URL}/usuarios/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(usuario)
  });
  return res.json();
}

export async function deletarUsuario(id) {
  const res = await fetch(`${BASE_URL}/usuarios/${id}`, {
    method: "DELETE"
  });
  return res.json();
}

// ===================== CARTEIRAS =====================
export async function getCarteiras() {
  const res = await fetch(`${BASE_URL}/carteiras`);
  return res.json();
}

export async function getCarteiraById(id) {
  const res = await fetch(`${BASE_URL}/carteiras/${id}`);
  return res.json();
}

export async function criarCarteira(carteira) {
  const res = await fetch(`${BASE_URL}/carteiras`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(carteira)
  });
  return res.json();
}

export async function atualizarCarteira(id, carteira) {
  const res = await fetch(`${BASE_URL}/carteiras/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(carteira)
  });
  return res.json();
}

export async function deletarCarteira(id) {
  const res = await fetch(`${BASE_URL}/carteiras/${id}`, {
    method: "DELETE"
  });
  return res.json();
}

// ===================== AÇÕES =====================

export async function getAcoes() {
  const res = await fetch(`${BASE_URL}/acoes`);
  return res.json();
}

export async function getAcaoById(id) {
  const res = await fetch(`${BASE_URL}/acoes/${id}`);
  return res.json();
}

export async function criarAcao(acao) {
  const res = await fetch(`${BASE_URL}/acoes`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(acao)
  });
  return res.json();
}

export async function atualizarAcao(id, acao) {
  const res = await fetch(`${BASE_URL}/acoes/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(acao)
  });
  return res.json();
}

export async function deletarAcao(id) {
  const res = await fetch(`${BASE_URL}/acoes/${id}`, {
    method: "DELETE"
  });
  return res.json();
}

// ===================== CARTEIRA_AÇÕES =====================

export async function getCarteiraAcoes() {
  const res = await fetch(`${BASE_URL}/carteira_acoes`);
  return res.json();
}

export async function adicionarAcaoCarteira(ca) {
  const res = await fetch(`${BASE_URL}/carteira_acoes`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(ca)
  });
  return res.json();
}

export async function atualizarAcaoCarteira(ca) {
  const res = await fetch(`${BASE_URL}/carteira_acoes`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(ca)
  });
  return res.json();
}

export async function removerAcaoCarteira(id_carteira, id_acao) {
  const res = await fetch(`${BASE_URL}/carteira_acoes`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id_carteira, id_acao })
  });
  return res.json();
}
