const Application = require('./app/server');
const DB_URL = 'mongodb://0.0.0.0/27017/Mova';
new Application(5000, DB_URL);
