
// Função para verificar se o usuário está logado
document.addEventListener('DOMContentLoaded', () => {
  const token = localStorage.getItem('token');
  const welcomeMessage = document.getElementById('welcomeMessage');

  if (token) {
    welcomeMessage.innerHTML = 'Bem-vindo(a), você está logado!';
  } else {
    welcomeMessage.innerHTML = 'Você não está logado!';
    window.location.href = 'login.html';  // Redireciona para login se não estiver logado
  }

  // Função de logout
  document.getElementById('logoutButton').addEventListener('click', () => {
    localStorage.removeItem('token');
    alert('Você foi desconectado!');
    window.location.href = 'login.html';  // Redireciona para login após o logout
  });
});

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

  if (response.ok) {
    const data = await response.json();
    alert(`Usuário registrado: ${data.name}`);
  } else {
    const error = await response.json();
    alert(error.message || 'Erro ao registrar o usuário.');
  }
});

// Função para abrir a página de login
document.getElementById('logoutButton').addEventListener('click', () => {
  window.location.href = 'login.html';  // Redireciona para a página de login
});

// Função para registrar uma transação

//  document.getElementById('transactionForm').addEventListener('submit', async (e) => {
//   e.preventDefault();
//   const userName = document.getElementById('userName').value;
//   const bookTitle = document.getElementById('bookTitle').value;
//   const amount = document.getElementById('amount').value;

//   try {
//     // Buscar o ID do usuário pelo nome
//     const userResponse = await fetch(`http://localhost:3000/api/users?name=${userName}`);
//     const user = await userResponse.json();

//     if (!user || user.length === 0) {
//       alert('Usuário não encontrado');
//       return;
//     }

//     // Buscar o ID do livro pelo título
//     const bookResponse = await fetch(`http://localhost:3000/api/books?title=${bookTitle}`);
//     const book = await bookResponse.json();

//     if (!book || book.length === 0) {
//       alert('Livro não encontrado');
//       return;
//     }

//     // Criar a transação
//     const transactionResponse = await fetch('http://localhost:3000/api/transactions', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({
//         userId: user[0].id,  // ID do usuário
//         bookId: book[0].id,   // ID do livro
//         amount,               // Quantidade
//       }),
//     });

//     if (!transactionResponse.ok) {
//       console.error('Erro ao registrar transação:', transactionResponse.statusText);
//       alert('Erro ao registrar transação');
//       return;
//     }

//     const transaction = await transactionResponse.json();
//     alert(`Transação registrada: ${transaction.userId} comprou ${amount} de ${transaction.bookId}`);
//   } catch (error) {
//     console.error('Erro:', error);
//     console.log(`${transaction.bookId} e ${transaction.userId}` )
//     alert('Ocorreu um erro ao registrar a transação');
//   }
// });




// Função para carregar a lista de livros
async function loadBooks() {
  const response = await fetch('http://localhost:3000/api/books');
  const bookList = document.getElementById('bookList');
  bookList.innerHTML = '';

  if (response.ok) {
    const books = await response.json();
    books.forEach((book) => {
      const bookDiv = document.createElement('div');
      bookDiv.innerHTML = `<strong>${book.title}</strong> - ${book.author} - R$ ${book.price}`;
      bookList.appendChild(bookDiv);
    });
  } else {
    alert('Erro ao carregar os livros.');
  }
}

// Função para carregar a lista de usuários
async function loadUsers() {
  const response = await fetch('http://localhost:3000/api/users');
  const userList = document.getElementById('userList');
  userList.innerHTML = '';

  if (response.ok) {
    const users = await response.json();
    users.forEach((user) => {
      const userDiv = document.createElement('div');
      userDiv.innerHTML = `<strong>${user.name}</strong> - ${user.email}`;
      userList.appendChild(userDiv);
    });
  } else {
    alert('Erro ao carregar os usuários.');
  }
}

// Função para registrar um novo livro
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

  if (response.ok) {
    const data = await response.json();
    alert(`Livro registrado: ${data.title}`);
    loadBooks();  // Recarrega a lista de livros após adicionar um novo
  } else {
    const error = await response.json();
    alert(error.message || 'Erro ao registrar o livro.');
  }
});


// Função para listar todas as transações
/* 
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

// Inicializa a página após o login
document.addEventListener('DOMContentLoaded', () => {
  loadBooks();
  loadUsers();
  // loadTransactions();  // Comentado para não carregar transações
});
