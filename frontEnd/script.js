// Função para registrar um novo usuário
document.getElementById('registerForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  const response = await fetch('http://localhost:3000/api/users/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, email, password }),
  });

  const data = await response.json();
  alert(`Usuário registrado: ${data.name}`);
});

// Função para adicionar um livro
document.getElementById('bookForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const title = document.getElementById('title').value;
  const author = document.getElementById('author').value;
  const price = document.getElementById('price').value;

  const response = await fetch('http://localhost:3000/api/books', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ title, author, price }),
  });

  const data = await response.json();
  alert(`Livro adicionado: ${data.title}`);
  loadBooks(); // Carrega a lista de livros novamente
});

// Função para listar todos os livros
async function loadBooks() {
  const response = await fetch('http://localhost:3000/api/books');
  const books = await response.json();

  const bookList = document.getElementById('bookList');
  bookList.innerHTML = '';

  books.forEach(book => {
    const bookDiv = document.createElement('div');
    bookDiv.innerHTML = `<strong>${book.title}</strong> - ${book.author} - R$ ${book.price}`;
    bookList.appendChild(bookDiv);
  });
}

// Função para listar todos os usuários
async function loadUsers() {
  const response = await fetch('http://localhost:3000/api/users');
  const users = await response.json();

  const userList = document.getElementById('userList');
  userList.innerHTML = '';

  users.forEach(user => {
    const userDiv = document.createElement('div');
    userDiv.innerHTML = `<strong>${user.name}</strong> - ${user.email}`;
    userList.appendChild(userDiv);
  });
}

/* 
// Função para registrar uma transação
document.getElementById('transactionForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const userName = document.getElementById('userName').value;
  const bookTitle = document.getElementById('bookTitle').value;
  const amount = document.getElementById('amount').value;

  // Buscar o ID do usuário pelo nome
  const userResponse = await fetch(`http://localhost:3000/api/users?name=${userName}`);
  const user = await userResponse.json();
  
  if (!user || user.length === 0) {
    alert('Usuário não encontrado');
    return;
  }

  // Buscar o ID do livro pelo título
  const bookResponse = await fetch(`http://localhost:3000/api/books?title=${bookTitle}`);
  const book = await bookResponse.json();
  
  if (!book || book.length === 0) {
    alert('Livro não encontrado');
    return;
  }

  // Criar a transação
  const transactionResponse = await fetch('http://localhost:3000/api/transactions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      userId: user[0].id,  // Assume que o nome é único
      bookId: book[0].id,   // Assume que o título é único
      amount,
    }),
  });

  const transaction = await transactionResponse.json();
  alert(`Transação registrada: ${transaction.userId} comprou ${amount} de ${transaction.bookId}`);
  loadTransactions();  // Carregar as transações novamente
});

// Função para listar todas as transações
async function loadTransactions() {
  const response = await fetch('http://localhost:3000/api/transactions');
  const transactions = await response.json();

  const transactionList = document.getElementById('transactionList');
  transactionList.innerHTML = '';

  transactions.forEach(transaction => {
    const transactionDiv = document.createElement('div');
    transactionDiv.innerHTML = `Usuário ID: ${transaction.userId} comprou ${transaction.amount} do Livro ID: ${transaction.bookId}`;
    transactionList.appendChild(transactionDiv);
  });
}
*/

// Carregar dados iniciais
loadBooks();
loadUsers();
// loadTransactions();  // Comentado pois não há transações no momento
