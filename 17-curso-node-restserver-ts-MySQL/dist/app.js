"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv")); ///IMPORTA O PACOTE DOTENV
const server_1 = __importDefault(require("./models/server"));
///configuração DOTENV
dotenv_1.default.config(); /// PAra usar a configuração de DOTENV
//export const nombre = 'Wendell';
//console.log (nombre );
const server = new server_1.default(); ///Estancia o servidor
server.listen(); ///Inicia o servidor estanciado para levantar
//# sourceMappingURL=app.js.map