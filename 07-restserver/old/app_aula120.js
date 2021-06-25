///Importa as variaveis de entorno do dotenv
require('dotenv').config();
///Importa a classe de models server.js
//const Server = require( process.env.appmodels )
const Server = require( './models/server_aula120' );

///Estancia a classe de models server.js
const server = new Server();





///Subir o servidor
server.listen();