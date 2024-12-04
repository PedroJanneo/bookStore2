# Projeto de API - Users e Books

Este projeto é uma API desenvolvida com Node.js, Express e PostgreSQL, focada em dois recursos principais: **Usuários** e **Livros**.

## Tecnologias utilizadas

- Node.js
- Express
- PostgreSQL
- bcryptjs (para criptografia de senhas)
- body-parser (para processamento de requisições)
- cors (para ligação do BackEnd com o FrontEnd)
- jwt (geração de token)


## Estrutura do Projeto

Este projeto segue a arquitetura **MVC** (Model-View-Controller) para organizar o código de forma mais modular e fácil de manter. A estrutura de diretórios é a seguinte:

```plaintext
projeto-api/
├── src/
│   ├── controllers/        # Lógica das rotas
│   ├── config/             # Configurações do servidor, banco de dados, etc.
│   ├── models/             # Modelos para interagir com o banco de dados
│   ├── routes/             # Rotas da API
│   ├── repositories/       # Lógica de interação com o banco de dados (CRUD)
│   ├── helpers/            # Funções auxiliares (ex: criptografia, validação)
│   └── app.ts              # Inicializa o servidor
└── package.json
```

## Endpoints

### **Usuários**

#### 1. Registrar Usuário
- **Endpoint**: `POST /api/users/register`
- **Descrição**: Cria um novo usuário com os dados fornecidos.
- **Body**:
  ```json
  {
    "name": "Nome do Usuário",
    "email": "email@dominio.com",
    "password": "senha123"
  }
  ```
- **Resposta**:
  - Status 201:
    ```json
    {
      "id": 1,
      "name": "Nome do Usuário",
      "email": "email@dominio.com"
    }
    ```
  - Status 400 (se faltar algum campo):
    ```json
    {
      "message": "Name, email, and password are required"
    }
    ```

---

### **Livros**

#### 1. Criar Livro
- **Endpoint**: `POST /api/books`
- **Descrição**: Cria um novo livro.
- **Body**:
  ```json
  {
    "title": "Título do Livro",
    "author": "Autor do Livro",
    "price": 19.99
  }
  ```
- **Resposta**:
  - Status 201:
    ```json
    {
      "id": 1,
      "title": "Título do Livro",
      "author": "Autor do Livro",
      "price": 19.99
    }
    ```

#### 2. Listar Livros
- **Endpoint**: `GET /api/books`
- **Descrição**: Retorna todos os livros cadastrados.
- **Resposta**:
  - Status 200:
    ```json
    [
      {
        "id": 1,
        "title": "Título do Livro",
        "author": "Autor do Livro",
        "price": 19.99
      },
      {
        "id": 2,
        "title": "Outro Livro",
        "author": "Outro Autor",
        "price": 29.99
      }
    ]
    ```

---

## Como rodar o projeto

1. Clone este repositório:
   ```bash
   git clone https://github.com/PedroJanneo/bookStore2
   cd projeto-api
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Inicie o servidor:
   ```bash
   npx ts-node src/app.ts
   ```

4. A API estará rodando em `http://localhost:3000`.

5. Para a interface de front-end:
   - Acesse os arquivos `index.html` e `login.html` para interagir com a API.

---
# Login para teste

email: saas4@gmail.com  
senha: 123


## Contribuições

Sinta-se à vontade para fazer um fork deste repositório e enviar pull requests com melhorias ou correções de bugs.

---

## Licença

Este projeto é licenciado sob a MIT License - veja o arquivo [LICENSE](LICENSE) para mais detalhes.

