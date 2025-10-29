// ===============================
// Seleção de elementos do DOM - USUÁRIOS
// ===============================
const registroForm = document.getElementById("registroForm");
const formEdicao = document.getElementById("formEdicao");
const tabelaUsuarios = document.getElementById("tabelaUsuarios");
const totalUsuarios = document.getElementById("totalUsuarios");
const btnDeletar = document.getElementById("btnDeletar");
const selectAll = document.getElementById("selectAll");

// ===============================
// Seleção de elementos do DOM - AÇÕES
// ===============================
const acoesForm = document.getElementById("acoesForm");
const tabelaAcoes = document.getElementById("tabelaAcoes");
const totalAcoes = document.getElementById("totalAcoes");

// ================================
// Seleção de elementos do DOM - Carteiras
// ================================
const carteiraForm = document.getElementById("carteiraForm");
const formEdicaoCarteira = document.getElementById("formEdicaoCarteira");
const tabelaCarteiras = document.getElementById("tabelaCarteiras");
const totalCarteiras = document.getElementById("totalCarteiras");
const btnDeletarCarteira = document.getElementById("btnDeletarCarteira");
const selectAllCarteiras = document.getElementById("selectAllCarteiras");

// ===============================
// USUÁRIOS - Função para carregar todos os usuários
// ===============================
async function carregarUsuarios() {
  try {
    const res = await fetch("http://localhost:3000/api/usuarios");
    const usuarios = await res.json();

    tabelaUsuarios.innerHTML = "";

    if (usuarios.length === 0) {
      tabelaUsuarios.innerHTML = `
        <tr>
          <td colspan="5" class="empty-state">
            Nenhum usuário cadastrado ainda. Use o formulário acima para adicionar.
          </td>
        </tr>
      `;
      totalUsuarios.textContent = "0 usuários";
      return;
    }

    usuarios.forEach(usuario => {
      tabelaUsuarios.innerHTML += `
        <tr>
          <td><input type="checkbox" data-id="${usuario.id_usuario}"></td>
          <td>${usuario.id_usuario}</td>
          <td>${usuario.nome}</td>
          <td>${usuario.email}</td>
          <td>${new Date(usuario.data_criacao).toLocaleString()}</td>
        </tr>
      `;
    });

    totalUsuarios.textContent = `${usuarios.length} usuário(s)`;
  } catch (error) {
    console.error("Erro ao carregar usuários:", error);
  }
}

// ===============================
// USUÁRIOS - Função para cadastrar novo usuário
// ===============================
if (registroForm) {
  registroForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    
    const nome = document.getElementById("nome").value.trim();
    const email = document.getElementById("email").value.trim();
    const senha = document.getElementById("senha").value;

    if (!nome || !email || !senha) {
      alert("Preencha todos os campos.");
      return;
    }

    try {
      const res = await fetch("http://localhost:3000/api/usuarios", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome, email, senha })
      });

      if (res.ok) {
        alert("Usuário cadastrado com sucesso!");
        registroForm.reset();
        carregarUsuarios();
      } else {
        const data = await res.json();
        alert(`Erro: ${data.erro}`);
      }
    } catch (error) {
      console.error("Erro ao cadastrar usuário:", error);
    }
  });
}

// ===============================
// USUÁRIOS - Função para editar usuário
// ===============================
if (formEdicao) {
  formEdicao.addEventListener("submit", async (e) => {
    e.preventDefault();

    const id = document.getElementById("editId").value;
    const nome = document.getElementById("editNome").value.trim();
    const email = document.getElementById("editEmail").value.trim();
    const senha = document.getElementById("editSenha").value;

    if (!id || !nome || !email) {
      alert("ID, Nome e Email são obrigatórios.");
      return;
    }

    try {
      const res = await fetch(`http://localhost:3000/api/usuarios/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome, email, senha: senha || undefined })
      });

      if (res.ok) {
        alert("Usuário atualizado com sucesso!");
        formEdicao.reset();
        carregarUsuarios();
      } else {
        const data = await res.json();
        alert(`Erro: ${data.erro}`);
      }
    } catch (error) {
      console.error("Erro ao atualizar usuário:", error);
    }
  });
}

// ===============================
// USUÁRIOS - Função para deletar usuários selecionados
// ===============================
if (btnDeletar) {
  btnDeletar.addEventListener("click", async () => {
    const checkboxes = tabelaUsuarios.querySelectorAll('input[type="checkbox"]:checked');

    if (checkboxes.length === 0) {
      alert("Selecione pelo menos um usuário para deletar.");
      return;
    }

    if (!confirm("Tem certeza que deseja deletar os usuários selecionados?")) return;

    try {
      for (let checkbox of checkboxes) {
        const id = checkbox.getAttribute("data-id");
        await fetch(`http://localhost:3000/api/usuarios/${id}`, { method: "DELETE" });
      }
      alert("Usuários deletados com sucesso!");
      carregarUsuarios();
    } catch (error) {
      console.error("Erro ao deletar usuários:", error);
    }
  });
}

// ===============================
// USUÁRIOS - Selecionar ou desmarcar todos
// ===============================
if (selectAll) {
  selectAll.addEventListener("change", () => {
    const checkboxes = tabelaUsuarios.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach(cb => cb.checked = selectAll.checked);
  });
}

// ===============================
// AÇÕES - Função para carregar todas as ações
// ===============================
async function carregarAcoes() {
  try {
    const res = await fetch("http://localhost:3000/api/acoes");
    const acoes = await res.json();

    tabelaAcoes.innerHTML = "";

    if (acoes.length === 0) {
      tabelaAcoes.innerHTML = `
        <tr>
          <td colspan="6" class="empty-state">
            Nenhuma ação cadastrada ainda. Use o formulário acima para adicionar.
          </td>
        </tr>
      `;
      totalAcoes.textContent = "0 ações";
      return;
    }

    acoes.forEach(acao => {
      const precoFormatado = Number(acao.preco_atual).toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
      });

      tabelaAcoes.innerHTML += `
        <tr>
          <td>${acao.id_acao}</td>
          <td><strong>${acao.codigo}</strong></td>
          <td>${acao.nome}</td>
          <td>${acao.setor || '-'}</td>
          <td>${precoFormatado}</td>
          <td>
            <button class="btn-edit" onclick="editarAcao('${acao.codigo}')">Editar</button>
            <button class="btn-delete" onclick="deletarAcao(${acao.id_acao}, '${acao.codigo}')">Deletar</button>
          </td>
        </tr>
      `;
    });

    totalAcoes.textContent = `${acoes.length} ação(ões)`;
  } catch (error) {
    console.error("Erro ao carregar ações:", error);
    alert("Erro ao carregar ações. Verifique se o servidor está rodando.");
  }
}

// ===============================
// AÇÕES - Função para cadastrar nova ação
// ===============================
if (acoesForm) {
  acoesForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    
    const codigo = document.getElementById("codigo").value.trim().toUpperCase();
    const nome = document.getElementById("nome_empresa").value.trim();
    const setor = document.getElementById("setor").value.trim();
    const preco = document.getElementById("preco").value;

    if (!codigo || !nome || !preco) {
      alert("Código, Nome da Empresa e Preço são obrigatórios.");
      return;
    }

    try {
      const res = await fetch("http://localhost:3000/api/acoes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          codigo, 
          nome, 
          setor: setor || null, 
          preco_atual: parseFloat(preco) 
        })
      });

      if (res.ok) {
        alert("Ação cadastrada com sucesso!");
        acoesForm.reset();
        carregarAcoes();
      } else {
        const data = await res.json();
        alert(`Erro: ${data.erro}`);
      }
    } catch (error) {
      console.error("Erro ao cadastrar ação:", error);
      alert("Erro ao cadastrar ação. Verifique sua conexão.");
    }
  });
}

// ===============================
// AÇÕES - Função para editar ação
// ===============================
async function editarAcao(codigo) {
  try {
    const res = await fetch(`http://localhost:3000/api/acoes/${codigo}`);
    if (!res.ok) {
      alert("Erro ao buscar dados da ação.");
      return;
    }

    const acao = await res.json();

    const novoCodigo = prompt("Código da Ação:", acao.codigo);
    if (novoCodigo === null) return;

    const novoNome = prompt("Nome da Empresa:", acao.nome);
    if (novoNome === null) return;

    const novoSetor = prompt("Setor:", acao.setor || "");
    if (novoSetor === null) return;

    const novoPreco = prompt("Preço Atual (R$):", acao.preco_atual);
    if (novoPreco === null) return;

    if (!novoCodigo.trim()) {
      alert("Código da ação não pode estar vazio.");
      return;
    }

    if (!novoNome.trim()) {
      alert("Nome da empresa não pode estar vazio.");
      return;
    }

    const precoNum = parseFloat(novoPreco);
    if (isNaN(precoNum) || precoNum < 0) {
      alert("Preço inválido.");
      return;
    }

    if (novoCodigo.trim().toUpperCase() !== codigo) {
      const resCreate = await fetch(`http://localhost:3000/api/acoes`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          codigo: novoCodigo.trim().toUpperCase(),
          nome: novoNome.trim(),
          setor: novoSetor.trim() || null,
          preco_atual: precoNum
        })
      });

      if (!resCreate.ok) {
        const data = await resCreate.json();
        alert(`Erro ao criar ação com novo código: ${data.erro}`);
        return;
      }

      await fetch(`http://localhost:3000/api/acoes/${acao.id_acao}`, {
        method: "DELETE"
      });

      alert("Ação atualizada com sucesso!");
      carregarAcoes();
    } else {
      const resUpdate = await fetch(`http://localhost:3000/api/acoes/${codigo}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nome_empresa: novoNome.trim(),
          setor: novoSetor.trim() || null,
          preco: precoNum
        })
      });

      if (resUpdate.ok) {
        alert("Ação atualizada com sucesso!");
        carregarAcoes();
      } else {
        const data = await resUpdate.json();
        alert(`Erro: ${data.erro}`);
      }
    }
  } catch (error) {
    console.error("Erro ao editar ação:", error);
    alert("Erro ao editar ação. Verifique sua conexão.");
  }
}

// ===============================
// AÇÕES - Função para deletar ação
// ===============================
async function deletarAcao(id, codigo) {
  if (!confirm(`Tem certeza que deseja deletar a ação ${codigo}?`)) {
    return;
  }

  try {
    const res = await fetch(`http://localhost:3000/api/acoes/${id}`, {
      method: "DELETE"
    });

    if (res.ok) {
      alert("Ação deletada com sucesso!");
      carregarAcoes();
    } else {
      const data = await res.json();
      alert(`Erro: ${data.erro}`);
    }
  } catch (error) {
    console.error("Erro ao deletar ação:", error);
    alert("Erro ao deletar ação. Verifique sua conexão.");
  }
}

// ===============================
// CARTEIRAS - Função para carregar todas as carteiras
// ===============================
async function carregarCarteiras() {
  if (!tabelaCarteiras) return; // Só executa se estiver na página de carteiras
  
  try {
    const res = await fetch("http://localhost:3000/api/carteiras");
    const carteiras = await res.json();

    tabelaCarteiras.innerHTML = "";

    if (carteiras.length === 0) {
      tabelaCarteiras.innerHTML = `
        <tr>
          <td colspan="6" class="empty-state">
            Nenhuma carteira cadastrada ainda. Use o formulário acima para adicionar.
          </td>
        </tr>
      `;
      totalCarteiras.textContent = "0 carteiras";
      return;
    }

    carteiras.forEach(carteira => {
      const dataFormatada = new Date(carteira.data_criacao).toLocaleString('pt-BR');
      
      tabelaCarteiras.innerHTML += `
        <tr>
          <td><input type="checkbox" data-id="${carteira.id_carteira}"></td>
          <td>${carteira.id_carteira}</td>
          <td>${carteira.id_usuario} - ${carteira.nome_usuario}</td>
          <td><strong>${carteira.nome}</strong></td>
          <td>${carteira.descricao || '-'}</td>
          <td>${dataFormatada}</td>
        </tr>
      `;
    });

    totalCarteiras.textContent = `${carteiras.length} carteira(s)`;
  } catch (error) {
    console.error("Erro ao carregar carteiras:", error);
    alert("Erro ao carregar carteiras. Verifique se o servidor está rodando.");
  }
}

// ===============================
// CARTEIRAS - Função para cadastrar nova carteira
// ===============================
if (carteiraForm) {
  carteiraForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    
    // ✅ CORREÇÃO CRÍTICA: Usa os IDs corretos do HTML
    const idUsuario = document.getElementById("idUsuario").value.trim();
    const nomeCarteira = document.getElementById("nomeCarteira").value.trim();
    const descricaoCarteira = document.getElementById("descricaoCarteira").value.trim();

    if (!idUsuario || !nomeCarteira) {
      alert("ID do Usuário e Nome da Carteira são obrigatórios.");
      return;
    }

    try {
      const res = await fetch("http://localhost:3000/api/carteiras", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          id_usuario: parseInt(idUsuario), 
          nome: nomeCarteira, 
          descricao: descricaoCarteira || null
        })
      });

      if (res.ok) {
        alert("Carteira cadastrada com sucesso!");
        carteiraForm.reset();
        carregarCarteiras();
      } else {
        const data = await res.json();
        alert(`Erro: ${data.erro}`);
      }
    } catch (error) {
      console.error("Erro ao cadastrar carteira:", error);
      alert("Erro ao cadastrar carteira. Verifique sua conexão.");
    }
  });
}

// ===============================
// CARTEIRAS - Função para editar carteira
// ===============================
if (formEdicaoCarteira) {
  formEdicaoCarteira.addEventListener("submit", async (e) => {
    e.preventDefault();

    const idCarteira = document.getElementById("editIdCarteira").value;
    const nomeEdit = document.getElementById("editNome").value.trim();
    const descricaoEdit = document.getElementById("editDescricao").value.trim();

    if (!idCarteira || !nomeEdit) {
      alert("ID da Carteira e Nome são obrigatórios.");
      return;
    }

    try {
      const res = await fetch(`http://localhost:3000/api/carteiras/${idCarteira}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          nome: nomeEdit, 
          descricao: descricaoEdit || null 
        })
      });

      if (res.ok) {
        alert("Carteira atualizada com sucesso!");
        formEdicaoCarteira.reset();
        carregarCarteiras();
      } else {
        const data = await res.json();
        alert(`Erro: ${data.erro}`);
      }
    } catch (error) {
      console.error("Erro ao atualizar carteira:", error);
      alert("Erro ao atualizar carteira. Verifique sua conexão.");
    }
  });
}

// ===============================
// CARTEIRAS - Função para deletar carteiras selecionadas
// ===============================
if (btnDeletarCarteira) {
  btnDeletarCarteira.addEventListener("click", async () => {
    const checkboxes = tabelaCarteiras.querySelectorAll('input[type="checkbox"]:checked');

    if (checkboxes.length === 0) {
      alert("Selecione pelo menos uma carteira para deletar.");
      return;
    }

    if (!confirm("Tem certeza que deseja deletar as carteiras selecionadas?")) return;

    try {
      for (let checkbox of checkboxes) {
        const id = checkbox.getAttribute("data-id");
        await fetch(`http://localhost:3000/api/carteiras/${id}`, { method: "DELETE" });
      }
      alert("Carteiras deletadas com sucesso!");
      carregarCarteiras();
    } catch (error) {
      console.error("Erro ao deletar carteiras:", error);
      alert("Erro ao deletar carteiras. Verifique sua conexão.");
    }
  });
}

// ===============================
// CARTEIRAS - Selecionar ou desmarcar todos
// ===============================
if (selectAllCarteiras) {
  selectAllCarteiras.addEventListener("change", () => {
    const checkboxes = tabelaCarteiras.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach(cb => cb.checked = selectAllCarteiras.checked);
  });
}

// ===============================
// INICIALIZAÇÃO - Carrega dados ao abrir cada página
// ===============================
if (tabelaUsuarios) {
  carregarUsuarios();
}

if (tabelaAcoes) {
  carregarAcoes();
}

if (tabelaCarteiras) {
  carregarCarteiras();
}