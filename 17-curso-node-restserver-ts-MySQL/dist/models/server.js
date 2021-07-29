"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express")); ///Application desestruturado
const usuario_1 = __importDefault(require("../routes/usuario")); ///Importa todas as rotas em um unico objeto... não pode importar individualmente
///import * as userRoutes from '../routes/usuario' /// O Alias "* as userRoutes é quando precisa chamar individualmente 
const cors_1 = __importDefault(require("cors")); ///Importação de cors para fazer o crossdamin de endereços distintos
///Importações próprias
const connection_1 = __importDefault(require("../db/connection"));
class Server {
    constructor() {
        this.apiPaths = {
            usuarios: '/api/usuarios'
        };
        this.app = express_1.default();
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
    dbConnection() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield connection_1.default.authenticate();
                console.log('Databse online'); ///Se der certo exibe no console que a database está online
            }
            catch (error) {
                throw new Error(error);
            }
        });
    }
    ///Criação dos middlewares para validar as routes 
    middlewares() {
        ///Configurar o CORS
        this.app.use(cors_1.default()); ///Para aparecer os metodos das faunções importadas precisa chamar o método e dentro de parentes () colocar bigode e apertar : CTRL + ENTER
        //Lectura del body
        this.app.use(express_1.default.json()); ///Fazer o parcear do body enviado pela requisição
        //Capeta Pública
        this.app.use(express_1.default.static('public')); ///Define a pasta pulica qdo chamado pelo browser para exibir os arquivos HTML
    }
    ///Criaçaõ dos métodos routes
    routes() {
        this.app.use(this.apiPaths.usuarios, usuario_1.default); ///Pode colocar qualquer qtde de rotas para aplicação
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en puerto: http://localhost:' + this.port);
        });
    }
}
exports.default = Server; ///Forma de exportar em TypeScript.... Pode ser exportado colocando no inicio da classe a palavra "export"
//# sourceMappingURL=server.js.map