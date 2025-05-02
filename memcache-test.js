const Memcached = require('memcached');
const memcached = new Memcached('127.0.0.1:11211');

memcached.set('teste-chave', 'valor de teste', 10, function (err) {
  if (err) {
    console.error('❌ Memcached não está acessível:', err.message);
  } else {
    console.log('✅ Memcached respondeu corretamente!');
  }
  memcached.end(); // fecha conexão
});
