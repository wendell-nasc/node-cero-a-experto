const express = require('express');

class Server {

    constructor() {

 
        ///variaveis
        this.app = express();
        this.port = process.env.PORT;
         

        ///Dispara o método Middlewares
        this.middlewares();


        ///Dispara o método routes
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
           // res.send('Olá mundo !') //A funnção 'send' envia pro postman o header Content-Type  de texto (text/html; charset=utf-8)
            res.json({ // A A funnção 'json' envia pro postman o header Content-Type  de objeto JSON (application/json; charset=utf-8)
                msg: 'get API'
            });
          });


          this.app.put('/api',  (req, res) => { 
            // res.send('Olá mundo !') //A funnção 'send' envia pro postman o header Content-Type  de texto (text/html; charset=utf-8)
             res.status(400).json({ // A A funnção 'json' envia pro postman o header Content-Type  de objeto JSON (application/json; charset=utf-8)
                 msg: 'put API'
             });
           });

           this.app.post('/api',  (req, res) => { 
            // res.send('Olá mundo !') //A funnção 'send' envia pro postman o header Content-Type  de texto (text/html; charset=utf-8)
             res.status(201).json({ // status(201) para mandar os status das requisições
                 msg: 'post API - Claudiney é corno !!!!!'
             });
           });

           this.app.delete('/api',  (req, res) => { 
            // res.send('Olá mundo !') //A funnção 'send' envia pro postman o header Content-Type  de texto (text/html; charset=utf-8)
             res.json({ // A A funnção 'json' envia pro postman o header Content-Type  de objeto JSON (application/json; charset=utf-8)
                 msg: 'delete API'
             });
           });
 

           this.app.patch('/api',  (req, res) => { 
            // res.send('Olá mundo !') //A funnção 'send' envia pro postman o header Content-Type  de texto (text/html; charset=utf-8)
             res.json({ // A A funnção 'json' envia pro postman o header Content-Type  de objeto JSON (application/json; charset=utf-8)
                 msg: 'patch API - Claudiney é corno !!!!!'
             });
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