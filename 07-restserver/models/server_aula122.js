const cors = require('cors')
const express = require('express');

//const { dbConnection } = require(process.env.appdatabase)
const { dbConnection } = require('../database/config_aula120')

class Server {

    constructor() {

 
        ///variaveis construtor
        this.app = express();
        this.port = process.env.PORT;
        //this.usuariosPAth = '/api/usuarios'; /// Define o Path do diretorios routes
        this.usuariosPAth =  process.env.usuariosPAth; /// Usando o dotenv (.env)
   

        ///Metodos para chamar as funções
        
        ///Conectar a base de datos
        this.conectarDB();

        ///Middlewares Dispara o método 
        this.middlewares();

        ///Routes Dispara o método 
        this.routes();

    }

    ///Base de Datos Mongoose é chamado do metodo  construtor... conecta database mongoose
    async conectarDB() {
        await dbConnection();



    }

    ///Middlewares  é chamado do metodo  construtor
    middlewares() { 
        
    //CORS
    this.app.use ( cors () );

    //Lecture y Parseo  del body ... informações recebidas e convertidas do front end
    this.app.use ( express.json() );
        
    //Rutas de mi aplicacion ... declada a pasta raiz public... chama o arquivo index.html
    this.app.use( express.static  ('public'));
    
    }       
    
    ///Rotas de mi aplicacion, , é chamado do metodo  construtor


    routes() {

        //Configura o arquivo do diretorio routes
        this.app.use( this.usuariosPAth, require( process.env.approutes ))// ) )

    }


                 
  
    ///Subir aplicação , é chamado do metodo  construtor
    listen() {

    /// Chamar porta com callback
    this.app.listen(this.port, () => {
        console.log(`Example app listening at http://localhost:`, this.port)
    });

    }




//Fim da Classe
}

module.exports = Server;