const Memcached = require('memcached');

const memcachedAddress = process.env.MEMCACHED_URL || 'http://localhost:11211';

const cache = new Memcached(memcachedAddress, {
  retries: 5,
  retry: 5000,
  maxExpiration: 2592000, // Tempo máximo de expiração em segundos (30 dias)
});

cache.on('error', (err) => {
  console.error('Erro na conexão com o Memcached:', err);
});

module.exports = cache;