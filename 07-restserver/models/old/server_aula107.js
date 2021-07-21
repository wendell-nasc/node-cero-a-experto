const cors = require('cors')
const express = require('express');

class Server {

    constructor() {

 
        ///variaveis
        this.app = express();

        this.port = process.env.PORT;

        //this.usuariosPAth = '/api/usuarios'; /// Define o Path do diretorios routes
        this.usuariosPAth =  process.env.usuariosPAth; /// Usando o dotenv (.env)
   
        ///Dispara o método Middlewares
        this.middlewares();


        ///Dispara o método routes
        this.routes();

    }


    ///Middlewares, , é chamado do metodo  construtor
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