const express = require('express');
const cors = require('cors');

const { dbConnection } = require('../database/config');

class Server {

    constructor() {
        this.app  = express();
        this.port = process.env.PORT;
        
        ///Otimizando o codigo abaixo de paths
        this.paths = {
            auth:       '/api/auth',
            usuarios:   '/api/usuarios',
            categorias:   '/api/categorias',
            produtos:   '/api/produtos',
            buscar:   '/api/buscar'

        };
        
        /*
        this.usuariosPath = '/api/usuarios';
        this.authPath     = '/api/auth';
        */

        // Conectar a base de datos
        this.conectarDB();

        // Middlewares
        this.middlewares();

        // Rutas de mi aplicación
        this.routes();
    }

    async conectarDB() {
        await dbConnection();
    }


    middlewares() {

        // CORS
        this.app.use( cors() );

        // Lectura y parseo del body
        this.app.use( express.json() );

        // Directorio Público
        this.app.use( express.static('public') );

    }

    routes() { /// Definido as ROUTES
        
        this.app.use( this.paths.auth, require('../routes/auth'));
        this.app.use( this.paths.usuarios, require('../routes/usuarios'));
        this.app.use( this.paths.categorias, require('../routes/categorias'));
        this.app.use( this.paths.produtos, require('../routes/produtos'));
        this.app.use( this.paths.buscar, require('../routes/buscar'));
        
        
        /*
        this.app.use( this.authPath, require('../routes/auth'));
        this.app.use( this.usuariosPath, require('../routes/usuarios'));
        this.app.use( this.usuariosPath, require('../routes/categorias'));
        */
    
    }

    listen() {
        this.app.listen( this.port, () => {
            console.log('Servidor corriendo en puerto', this.port );
        });
    }

}




module.exports = Server;
