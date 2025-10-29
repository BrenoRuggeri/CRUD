# 🧾 Sistema CRUD de Usuários, Carteiras e Ações

Um sistema completo de **Cadastro, Leitura, Atualização e Exclusão (CRUD)** desenvolvido em **Node.js, Express e MySQL**.  
O objetivo deste projeto é permitir o gerenciamento de **usuários**, **carteiras de investimento** e **ações**, com integração entre as tabelas e interface web simples.

---

## 🚀 Funcionalidades

- 👤 **Usuários:** cadastro, listagem, atualização e exclusão  
- 💼 **Carteiras:** associadas a usuários, permitem registrar ativos  
- 📈 **Ações:** controle de ações cadastradas em cada carteira  
- 🔗 **Relacionamento completo entre as tabelas**  
- 🌐 **Frontend em HTML + CSS**, consumindo o backend em Node.js via API REST

---

## 🛠️ Tecnologias Utilizadas

- **Node.js**
- **Express.js**
- **MySQL**
- **CORS**
- **Nodemon**
- **HTML5 / CSS3**
- **JavaScript (Frontend)**
- **Insomnia / Postman** (para testes de rotas)

---

## ⚙️ Estrutura do Projeto

```
CRUD/
├── Backend/
│   ├── routes/
│   ├── server.js
│   ├── package.json
│   └── (outros arquivos de configuração)
│
├── Frontend/
│   ├── index.html
│   ├── styles.css
│   └── scripts.js
│
└── README.md
```

---

## 💽 Banco de Dados

O sistema utiliza um banco de dados **MySQL** com as seguintes tabelas principais:

- `Usuario`
- `Carteira`
- `Acao`
- `Carteira_Acao`

O relacionamento segue o modelo:  
> Um **Usuário** possui várias **Carteiras**, e cada **Carteira** pode conter várias **Ações**.

---

## 🧩 Instalação e Execução

### 1️⃣ Clonar o repositório
```bash
git clone https://github.com/BrenoRuggeri/CRUD.git
cd CRUD/Backend
```

### 2️⃣ Instalar dependências
```bash
npm install
```

### 3️⃣ Configurar o banco de dados
- Crie um banco no MySQL (por exemplo: `crud_db`)
- Atualize o arquivo de conexão (ex: `db.js` ou dentro do `server.js`) com suas credenciais:
  ```js
  const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'SENHA_DO_MYSQL',
    database: 'crud_db'
  });
  ```

### 4️⃣ Executar o servidor
```bash
npm start
```
> O servidor iniciará em: **http://localhost:3000**

---

## 🧠 Testes da API

Você pode testar as rotas usando o **Postman** ou **Insomnia**.  
Exemplos de endpoints:

| Método | Rota | Descrição |
|--------|------|-----------|
| `GET` | `/usuarios` | Lista todos os usuários |
| `POST` | `/usuarios` | Cria um novo usuário |
| `PUT` | `/usuarios/:id` | Atualiza um usuário |
| `DELETE` | `/usuarios/:id` | Remove um usuário |
| `GET` | `/carteiras` | Lista todas as carteiras |
| `POST` | `/acoes` | Cadastra uma nova ação |

---

## 🧑‍💻 Autores

**Breno Ruggeri**  
Estudante de Ciência da Computação na USCS   

🔗 [GitHub](https://github.com/BrenoRuggeri)

**Rhuan Jhonnatan**  
Estudante de Ciência da Computação na USCS   

🔗 [GitHub](https://github.com/RhuanJhonnatan)

**Miguel Bueno**  
Estudante de Ciência da Computação na USCS   

🔗 [GitHub](https://github.com/miguelito368)

---

## 📜 Licença

Este projeto está sob a licença **MIT** — sinta-se à vontade para usar e modificar.  
