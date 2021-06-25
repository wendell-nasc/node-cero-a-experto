///Importa as variaveis de entorno do dotenv
require('dotenv').config();
///Importa a classe de models server.js
const Server = require('./models/server_aula105')

///Estancia a classe de models server.js
const server = new Server();

///Subir o servidor
server.listen();