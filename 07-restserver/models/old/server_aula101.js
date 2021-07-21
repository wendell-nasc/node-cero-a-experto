const express = require('express');

class Server {

    constructor() {

 
        ///variaveis
        this.app = express();
        this.port = process.env.PORT;
         

        ///Dispara o método Middlewares
        this.middlewares();////'''


        ///chama o método routes para rotas da API... MAIS IMPORTANTE
        this.routes();

    }


    ///Middlewares, , é chamado do metodo  construtor
    middlewares() { 
        

    //Rutas de mi aplicacion ... declada a pasta raiz public... chama o arquivo index.html
    this.app.use( express.static  ('public'));
    
    }       
    
    ///Rotas de mi aplicacion, , é chamado do metodo  construtor


    routes() {

        this.app.get('/api',  (req, res) => { 
            res.send('Olá mundo !')
          });

         
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