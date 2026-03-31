const http = require('http');

console.log('Seeding items via internal HTTP module...');

const options = {
    hostname: 'localhost',
    port: 5000,
    path: '/api/items/seed',
    method: 'POST'
};

const req = http.request(options, (res) => {
    let data = '';
    res.on('data', (chunk) => data += chunk);
    res.on('end', () => console.log('Seed response:', data));
});

req.on('error', (error) => console.error('Seed error:', error.message));
req.end();
