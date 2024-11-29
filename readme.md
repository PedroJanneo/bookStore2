# Projeto de API - Users, Books e Transactions

Este projeto é uma API desenvolvida com Node.js, Express e PostgreSQL, focada em três recursos principais: **Usuários**, **Livros** e **Transações**.

## Tecnologias utilizadas

- Node.js
- Express
- PostgreSQL
- bcryptjs (para criptografia de senhas)
- dotenv (para variáveis de ambiente)
- body-parser (para processamento de requisições)

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

### **Transações**

#### 1. Criar Transação
- **Endpoint**: `POST /api/transactions`
- **Descrição**: Registra uma nova transação entre um usuário e um livro.
- **Body**:
  ```json
  {
    "userId": 1,
    "bookId": 1
  }
  ```
- **Resposta**:
  - Status 201:
    ```json
    {
      "transactionId": 1,
      "userId": 1,
      "bookId": 1,
      "transactionDate": "2024-11-29T12:00:00Z"
    }
    ```
  - Status 400 (se faltar algum campo):
    ```json
    {
      "message": "UserId and BookId are required"
    }
    ```

#### 2. Listar Transações
- **Endpoint**: `GET /api/transactions`
- **Descrição**: Retorna todas as transações registradas.
- **Resposta**:
  - Status 200:
    ```json
    [
      {
        "transactionId": 1,
        "userId": 1,
        "bookId": 1,
        "transactionDate": "2024-11-29T12:00:00Z"
      },
      {
        "transactionId": 2,
        "userId": 2,
        "bookId": 3,
        "transactionDate": "2024-11-30T12:00:00Z"
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

5. A API estará rodando em `http://localhost:3000`.

---

## Contribuições

Sinta-se à vontade para fazer um fork deste repositório e enviar pull requests com melhorias ou correções de bugs.

---

## Licença

Este projeto é licenciado sob a MIT License - veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

Com essa adição, o README agora inclui todas as informações sobre os recursos de transações, detalhando como criar e listar transações. Caso precise de mais ajustes ou funcionalidades, é só avisar! 🚀