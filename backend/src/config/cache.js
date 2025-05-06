const Memcached = require('memcached');
const { promisify } = require('util');

const memcached = new Memcached('localhost:11211');
memcached.get = promisify(memcached.get);

async function getFromCache(key) {
  try {
    return await memcached.get(key);
  } catch (err) {
    console.error('Cache error:', err);
    return null;
  }
}

// Uso:
getFromCache('minha_chave').then(console.log);