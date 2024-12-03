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
      window.location.href = 'index.html'; // Redireciona para a página principal após login
    } else {
      const error = await response.json();
      alert(error.message || 'Erro ao fazer login.');
    }
  });

  // Função para fazer login e obter o token JWT
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
    // Armazenar o token no localStorage
    localStorage.setItem('token', data.token);
    alert('Login bem-sucedido!');
    window.location.href = 'index.html';  // Redireciona para a página principal
  } else {
    const error = await response.json();
    alert(error.message || 'Erro ao fazer login.');
  }
});

  