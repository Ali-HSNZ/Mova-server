const Application = require('./app/server');
const DB_URL = 'mongodb://0.0.0.0:27017/Mova';
const PORT = 5000;
require('dotenv').config();
new Application(PORT, DB_URL);
