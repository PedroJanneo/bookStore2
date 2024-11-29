import { Pool } from 'pg';

// Credenciais e informações de conexão
const connectionString = 'postgresql://postgres.qammupqhlgdbqbrrrrwp:g4HsDwhgXJGuL9tq@aws-0-us-west-1.pooler.supabase.com:6543/postgres';

// Configuração da conexão
const pool = new Pool({
  connectionString,
  ssl: {
    rejectUnauthorized: false, // Permite conexões SSL não autorizadas
  },
});

// Teste de conexão ao banco de dados
pool.connect()
  .then(() => {
    console.log('Conectado ao banco de dados com sucesso!');
  })
  .catch((err) => {
    console.error('Erro de conexão com o banco de dados:', err);
  });

export default pool;
