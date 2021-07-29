import express, { Application } from 'express'; ///Application desestruturado
import userRoutes from '../routes/usuario'///Importa todas as rotas em um unico objeto... não pode importar individualmente
///import * as userRoutes from '../routes/usuario' /// O Alias "* as userRoutes é quando precisa chamar individualmente 
import cors from 'cors'; ///Importação de cors para fazer o crossdamin de endereços distintos

///Importações próprias
import db from '../db/connection';

class Server {

    private app: Application;
    private port: string;
    private apiPaths =  { //Definir o caminho das rotas
            usuarios: '/api/usuarios'

    }

    
    
    
    constructor() {
        this.app = express ();
        this.port = process.env.PORT || '8081'; ///PAra não correr o risco de ser indefinido, pode ser definido um ou outro.



        ///Métodos iniciais 


        ///Chamar a conexão com a Base de dados
        this.dbConnection();

        ///Chamar os Middlwares para proteger a rotas 
        this.middlewares();


        ///Definir as rotas
        this.routes(); ///Chama função de rotas logo abaixo


    }



    ///Método para conectar a base de dados
    async dbConnection() {

        try {

            await db.authenticate();
            console.log('Databse online');///Se der certo exibe no console que a database está online

            
        } catch (error) {
            throw new Error( error );
            
        }
    }

    ///Criação dos middlewares para validar as routes 
    middlewares () {

        ///Configurar o CORS
        this.app.use( cors() );///Para aparecer os metodos das faunções importadas precisa chamar o método e dentro de parentes () colocar bigode e apertar : CTRL + ENTER
       
        //Lectura del body
        this.app.use ( express.json() ); ///Fazer o parcear do body enviado pela requisição

        //Capeta Pública
        this.app.use( express.static('public')); ///Define a pasta pulica qdo chamado pelo browser para exibir os arquivos HTML

    }


    ///Criaçaõ dos métodos routes

    routes() {

        this.app.use ( this.apiPaths.usuarios, userRoutes ) ///Pode colocar qualquer qtde de rotas para aplicação

    }


listen() {

this.app.listen( this.port, () => {
    console.log('Servidor corriendo en puerto: http://localhost:' + this.port );

})

}



}

export default Server; ///Forma de exportar em TypeScript.... Pode ser exportado colocando no inicio da classe a palavra "export"


