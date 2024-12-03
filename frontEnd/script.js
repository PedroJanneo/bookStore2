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

// Função para login do usuário
document.getElementById('loginForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const email = document.getElementById('loginEmail').value;
  const password = document.getElementById('loginPassword').value;

  const response = await fetch('http://localhost:3000/api/users/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });

  if (response.ok) {
    const data = await response.json();
    sessionStorage.setItem('token', data.token); // Salva o token no armazenamento da sessão
    alert('Login bem-sucedido!');
    toggleSessionControls(true);
  } else {
    const error = await response.json();
    alert(error.message || 'Erro ao fazer login.');
  }
});

// Função para logout do usuário
document.getElementById('logoutButton').addEventListener('click', () => {
  sessionStorage.removeItem('token'); // Remove o token da sessão
  alert('Logout realizado com sucesso!');
  toggleSessionControls(false);
});

// Função para alternar controles de sessão
function toggleSessionControls(isLoggedIn) {
  document.getElementById('logoutButton').style.display = isLoggedIn ? 'block' : 'none';
  document.getElementById('loginForm').style.display = isLoggedIn ? 'none' : 'block';
  document.getElementById('registerForm').style.display = isLoggedIn ? 'none' : 'block';
}

// Função para carregar a lista de livros
async function loadBooks() {
  const token = sessionStorage.getItem('token'); // Obtém o token para autenticação
  const response = await fetch('http://localhost:3000/api/books', {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (response.ok) {
    const books = await response.json();
    const bookList = document.getElementById('bookList');
    bookList.innerHTML = '';

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
  const token = sessionStorage.getItem('token'); // Obtém o token para autenticação
  const response = await fetch('http://localhost:3000/api/users', {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (response.ok) {
    const users = await response.json();
    const userList = document.getElementById('userList');
    userList.innerHTML = '';

    users.forEach((user) => {
      const userDiv = document.createElement('div');
      userDiv.innerHTML = `<strong>${user.name}</strong> - ${user.email}`;
      userList.appendChild(userDiv);
    });
  } else {
    alert('Erro ao carregar os usuários.');
  }
}

// Inicializar controles com base na sessão
document.addEventListener('DOMContentLoaded', () => {
  const token = sessionStorage.getItem('token');
  toggleSessionControls(!!token);
  if (token) {
    loadBooks();
    loadUsers();
  }
});
