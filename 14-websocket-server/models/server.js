const express = require('express');
const cors = require('cors');
const { Socket } = require('dgram');
const { socketController } = require('../sockets/controller');



class Server {

    constructor() {
        this.app    = express();
        this.port   = process.env.PORT;
        this.server = require('http').createServer( this.app );/// importar o pacote npm socket io
        this.io     = require('socket.io')( this.server );/// A função io é para enviar todas informações das pessoas conectadas

        this.paths = {
            
            /*
            auth:       '/api/auth',
            buscar:     '/api/buscar',
            categorias: '/api/categorias',
            productos:  '/api/productos',
            usuarios:   '/api/usuarios',
            uploads:    '/api/uploads',
            */
        }


        // Conectar a base de datos
       // this.conectarDB();

        // Middlewares
        this.middlewares();

        // Rutas de mi aplicación
        this.routes();

        //Sockets
        this.sockets();
    }

    //async conectarDB() {
       // await dbConnection();
    //}


    middlewares() {

        // CORS
        this.app.use( cors() );

        // Lectura y parseo del body
        //this.app.use( express.json() );

        // Directorio Público
        this.app.use( express.static('public') );

        // Fileupload - Carga de archivos
        /*
        this.app.use( fileUpload({
            useTempFiles : true,
            tempFileDir : '/tmp/',
            createParentPath: true
        }));
        */

    }

    routes() {

        /*        
        this.app.use( this.paths.auth, require('../routes/auth'));
        this.app.use( this.paths.buscar, require('../routes/buscar'));
        this.app.use( this.paths.categorias, require('../routes/categorias'));
        this.app.use( this.paths.productos, require('../routes/productos'));
        this.app.use( this.paths.usuarios, require('../routes/usuarios'));
        this.app.use( this.paths.uploads, require('../routes/uploads'));
        */
       
    }

    sockets() {

        ///Socket lado do servidor para monitorar o cliente (conectado / desconectado)
        this.io.on("connection", socketController);
        
        /*(socket) => { ///Função socket removida e colada no arquivo controller.js > sockets
            /// Valida e Exibe no console se tem cliente conectado... função criada no arquivo socket-client dentro de public > js    
            ///A função socket.id é para exibir o identificador unicode cada cliente
            console.log('Cliente conectado', socket.id);  //scoket lado do cliente para exibir no console que está conectado

            
            socket.on( 'disconnect', () => {
                /// Valida e Exibe no console se o cliente desconectou... função criada no arquivo socket-client dentro de public > js
                ///A função socket.id é para exibir o identificador unicode cada cliente
                console.log('Cliente desconectado', socket.id);
            });        
        
            socket.on('enviar-mensaje', ( payload, callback ) => { ///Recebe aa mensagem enviada pelo lado do cliente
                console.log( payload );///Exibe payload no console

                
                const id = 123456;
                callback ( { id, fecha: new Date().getTime() }  );
                
                //this.io.emit('enviar-mensaje', 'Desde el server' );
                //this.io.emit('enviar-mensaje', payload );
        

            });            
        
        
        });*/
    }

    listen() {
        //this.app.listen( this.port, () => {
        this.server.listen( this.port, () => {/// chama o server do constructor
            console.log('Servidor corriendo en puerto', this.port );
        });
    }

}




module.exports = Server;
