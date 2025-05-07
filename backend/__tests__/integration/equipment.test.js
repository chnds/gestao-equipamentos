// Importa o supertest para simular requisições HTTP
const request = require('supertest');

// Importa o mongoose para gerenciar a conexão com o MongoDB
const mongoose = require('mongoose');

// Importa o MongoMemoryServer para criar um banco MongoDB em memória temporário
const { MongoMemoryServer } = require('mongodb-memory-server');

// Importa o app Express da sua aplicação
const app = require('../../app'); // ajuste o caminho conforme sua estrutura

// Importa o model Equipment, que será usado para popular e consultar o banco
const Equipment = require('../../models/equipmentModel');

let mongoServer; // Armazena a instância do banco em memória

// Roda antes de todos os testes — conecta ao Mongo em memória
beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create(); // inicia servidor
  const uri = mongoServer.getUri(); // pega a URI de conexão

  await mongoose.connect(uri); // conecta o mongoose
});

// Roda depois de cada teste — limpa os dados da coleção
afterEach(async () => {
  await Equipment.deleteMany(); // garante que o próximo teste começa limpo
});

// Roda uma vez depois de todos os testes — encerra conexões
afterAll(async () => {
  await mongoose.disconnect(); // desconecta o mongoose
  await mongoServer.stop();    // para o MongoDB em memória
});

// Início da suíte de testes para a rota GET /equipment
describe('GET /equipment', () => {
  it('deve retornar todos os equipamentos', async () => {
    // Insere manualmente dois documentos de equipamentos no banco de teste
    await Equipment.create([
      { name: 'Câmera Canon', type: 'Câmera' },
      { name: 'Microfone Rode', type: 'Áudio' },
    ]);

    // Faz uma requisição GET para a rota /equipment da API
    const res = await request(app).get('/equipment');

    // Verifica se o status HTTP retornado foi 200 (OK)
    expect(res.status).toBe(200);

    // Verifica se a resposta tem exatamente dois itens (os inseridos acima)
    expect(res.body).toHaveLength(2);

    // Verifica se o primeiro item retornado tem o nome correto
    expect(res.body[0]).toHaveProperty('name', 'Câmera Canon');
  });
});
