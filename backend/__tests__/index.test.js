const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../src/app'); // Certifique-se de que app.js apenas exporta o express()
const Lens = require('../src/models/Lens');

beforeAll(async () => {
  await mongoose.connect('mongodb://localhost:27017/gestao_equipamentos', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  // Limpa a coleção para evitar dados duplicados
  await Lens.deleteMany({});

  // Insere dados de teste com o campo 'name' e 'status'
  await Lens.create([
    { name: 'Canon 50mm', status: 'disponivel' },
    { name: 'Nikon 35mm', status: 'disponivel' },
  ]);
});

afterAll(async () => {
  await Lens.deleteMany(); // Limpa os dados após os testes
  await mongoose.connection.close(); // Fecha conexão com MongoDB
});

describe('GET /api/lenses', () => {
  test(
    'should return all lenses',
    async () => {
      const response = await request(app).get('/api/lenses');
      expect(response.statusCode).toBe(200);

      // Verifica se há ao menos os campos esperados
      expect(response.body).toEqual(
        expect.arrayContaining([
          expect.objectContaining({ status: 'disponivel' })
        ])
      );
    },
    10000 // timeout de 10 segundos
  );
});
